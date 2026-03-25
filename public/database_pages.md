*Handling memory ourselves!*

Note: All code can be found in the github repo [github.com/AdityaPrasad275/AtlasDB](https://github.com/AdityaPrasad275/AtlasDB) , specifically in the branch `feature-pages`

# Hashmap, you gotta go

In **Step 0**, we built a tiny persistent database.

It had:

* a **write-ahead log** on disk
* a **hashmap** in memory

That gave us a surprisingly decent first version:

* writes were durable
* crashes were recoverable
* reads were fast

Nice.

But there was one very obvious problem.

The actual database state still lived inside a hashmap in RAM.

That is fine if your dataset is small.

It is not fine if your database is 100 GB and your machine has 8 GB of RAM.

Or 4 GB.

Or 1 GB.

At that point the hashmap has to go.

Not because hashmaps are bad.

They are great.

But because we need a database whose **working memory is bounded**, even when the data on disk is much larger.

So this step is about a different problem:

not "how do we store key-value data?"

but:

**how do we move data between disk and RAM in a controlled way?**

That brings us to pages, frames, and the buffer pool.

---

## The non-technical story

Forget tables for a second.

Forget rows.

Forget even key-value pairs.

For now, pretend the database is just a giant pile of paper.

### Disk is a huge stack of sheets

Imagine your disk contains a million sheets.

Each sheet is one **page**.

Together they represent your whole database.

Maybe 100 GB worth of it.

You cannot spread all of those sheets out on your desk at once.

You only have space for, say, 10 transparent folders on your desk.

Those folders are your **frames in RAM**.

At any point in time, you can only actively work with the sheets currently sitting in those folders.

So the real problem becomes:

> I need page `#132`.
>  
> Is it already on my desk?
> If not, which folder do I empty out?
> And if that sheet was modified, do I need to put it back carefully before replacing it?

That is basically the whole game.

### Who does what?

In this story:

* the giant stack of sheets is the **disk**
* the desk with a few folders is the **buffer pool in RAM**
* the person deciding what stays and what leaves is the **BufferPoolManager**
* the person physically moving sheets to and from storage is the **DiskManager**
* each individual sheet is a **Page**

And the important part is this:

we are building the infrastructure first.

At this stage, a page is mostly just a 4 KB blob of bytes.

We are not yet talking about how rows are laid out inside it.

That comes later.

Right now we are only solving:

**how do pages enter memory, leave memory, and get written back safely?**

---

## Why pages?

We could imagine loading arbitrary byte ranges from disk.

But databases usually do not think in terms of "give me bytes 21873 through 26101".

They think in terms of **fixed-size blocks**.

That fixed-size block is the page.

And 4 KB is a very common size.

Why 4 KB?

Because at the OS and storage level, I/O tends to happen in chunks anyway.

Disk is **dramatically slower** than RAM, so the system tries to batch and amortize work.

If our database also treats storage as fixed-size 4 KB pages, the whole design becomes simpler:

* page `0` lives at offset `0`
* page `1` lives at offset `4096`
* page `2` lives at offset `8192`

and in general:

```text
offset = page_id * PAGE_SIZE
```

Simple is good.

---

# The technical part

Like Step 0, the goal here is not to dump every implementation detail.

The goal is to explain the moving parts cleanly enough that the header files make sense.

We will go bottom-up:

1. `Page`
2. `DiskManager`
3. `BufferPoolManager`
4. `LRUReplacer`

---

## `Page`

A `Page` is the smallest unit the buffer pool works with.

At the most basic level, it contains:

* the actual **data bytes**
* a small amount of **metadata**

The data is just a 4 KB byte array.

The metadata is there so the buffer pool can reason about the page while it is in memory.

### What metadata do we need?

We keep things like:

* `page_id`
* `pin_count`
* `is_dirty`
* `lsn`

The first three matter immediately.

`lsn` becomes important later when recovery gets more serious.

### `pin_count`

This tracks how many active users currently hold the page.

If `pin_count > 0`, the page is considered **in use**.

That means the buffer pool is not allowed to evict it.

Otherwise we could throw out a page while some thread is still reading or writing it.

That would be bad.

### `is_dirty`

This tells us whether the page was modified in RAM after being read from disk.

If a page is dirty, then before reusing its frame we must first write its data back to disk.

If it is not dirty, we can just drop it from memory and reload it later if needed.

### Important clarification: what is actually stored on disk?

The `Page` object in memory contains both:

* the raw bytes
* the metadata the buffer manager cares about

But on disk, what we really persist here is the **page data block** itself.

Things like `pin_count` are runtime bookkeeping.

They help the buffer pool manage RAM.

They are not part of the database file format in the same way the 4 KB data region is.

Here is the class:

```cpp
#pragma once

#include <cstring>
#include "type.h"

class Page {
public:
    static constexpr int PAGE_SIZE = 4096;
    static constexpr int INVALID_PAGE_ID = -1;

    Page() { resetMemory(); }
    ~Page() = default;

    char *getData() { return _data; }
    page_id_t getPageId() { return _page_id; }
    int getPinCount() { return _pin_count; }
    bool isDirty() { return _is_dirty; }
    void setDirty(bool is_dirty = true) { _is_dirty = is_dirty; }

    void pin() { _pin_count++; }
    void unpin() { if (_pin_count > 0) _pin_count--; }

    void resetMemory() {
        std::memset(_data, 0, PAGE_SIZE);
        _page_id = INVALID_PAGE_ID;
        _pin_count = 0;
        _is_dirty = false;
        _lsn = 0;
    }

    friend class BufferPoolManager;

private:
    char _data[PAGE_SIZE];

    page_id_t _page_id;
    int _pin_count;
    bool _is_dirty;
    lsn_t _lsn;
};
```

There is no fancy `.cpp` file here because there does not need to be one.

`Page` is mostly just a container.

Which is exactly what we want.

---

## `DiskManager`

Once we have a page abstraction, we need something that can move page-sized chunks between RAM and the database file.

That is the `DiskManager`.

Its job is intentionally boring:

* read page `X` from disk
* write page `X` to disk

That is it.

### How does it locate a page?

The database file, `atlas.db`, is treated as a contiguous sequence of fixed-size pages.

So page lookup is just offset arithmetic:

```text
page_id -> page_id * PAGE_SIZE
```

If we want page `5`, we seek to:

```text
5 * 4096 = 20480
```

Then we read or write exactly 4096 bytes.

That means `DiskManager` does not care what is *inside* a page.

It only cares about moving a page-sized block correctly.

That separation is important.

The lower layers should stay dumb.

Dumb layers are easier to trust.

Here is the interface:

```cpp
#pragma once

#include <string>
#include "type.h"

class DiskManager {
public:
    DiskManager(const std::string &fileName);
    ~DiskManager();

    void writePage(page_id_t page_id, const char *data);
    void readPage(page_id_t page_id, char *data);

    void shutDown();

private:
    int _fd;
};
```

The actual implementation is mostly systems-programming detail:

* file descriptors
* open/close
* seek
* read/write
* error handling

Not conceptually hard.

Just a bit annoying.

---

## `BufferPoolManager`

Now we get to the main character.

The `BufferPoolManager` is the piece that makes limited RAM feel larger than it really is.

It manages:

* which pages are currently resident in memory
* which frame each page occupies
* which pages are safe to evict
* when dirty pages need to be flushed back to disk

This is the actual "brain" of the storage layer.

### Frames vs pages

This distinction matters.

A **page** is a unit of data identified by `page_id`.

A **frame** is a slot in RAM that can currently hold one page.

So:

* `page_id` answers: which logical page on disk?
* `frame_id` answers: which slot in memory?

The buffer pool owns a fixed number of frames.

Each frame contains one `Page` object.

If the pool size is `10`, then at most 10 pages can be in RAM at once.

### What state does it need?

To manage all of this, we keep a few core structures.

#### 1. The frame array

This is the actual buffer pool.

An array of `Page` objects.

Each index is a frame.

#### 2. The page table

We often know the `page_id` we want.

But the buffer pool stores pages in frames.

So we need a fast mapping:

```text
page_id -> frame_id
```

Yes, ironically, a hashmap comes back here.

Not as the database itself.

Just as a tiny metadata structure to help manage memory.

That is a much more reasonable use of a hashmap.

#### 3. The free frame list

At startup, all frames are empty.

So the easiest possible victim is simply an unused frame.

We keep a list of those.

#### 4. The replacement policy

Eventually all frames are occupied.

Now when a new page must be loaded, the buffer pool needs to decide:

**which current frame should be reused?**

That decision is delegated to an `LRUReplacer`.

We will get to that in a minute.

#### 5. `next_page_id`

When creating a brand new page, we need a fresh logical page id.

That is what `next_page_id` is for.

It points at the next unused location in the file.

### Why `pin_count` and `is_dirty` suddenly matter

This is where the page metadata becomes operational.

If a page is pinned, it is currently in use.

So even if it is the coldest page in the entire system, we are not allowed to evict it.

If a page is dirty, it has newer contents in RAM than on disk.

So before reusing its frame, we must flush it.

That gives us the two key safety checks:

* pinned pages cannot be evicted
* dirty pages must be written back before eviction

Without those two rules, the whole thing falls apart.

### Core methods

The buffer pool API ends up being surprisingly intuitive.

#### `fetchPage(page_id)`

This means:

> I want page `X`.

The manager does roughly this:

1. Check if page `X` is already in RAM.
2. If yes, return it and increment `pin_count`.
3. If not, find a usable frame.
4. If the chosen frame holds a dirty page, flush it first.
5. Read page `X` from disk into that frame.
6. Update the page table.
7. Pin and return the page.

That is the heart of the whole system.

#### `newPage(page_id)`

This means:

> Give me a brand-new empty page.

We still need a frame for it, just like `fetchPage`.

But instead of reading existing bytes from disk, we allocate a fresh logical page id and hand back a zeroed-out page in memory.

Eventually that page will be flushed to disk.

#### `unpinPage(page_id, is_dirty)`

This means:

> I am done using this page for now.

So we decrement `pin_count`.

And if the caller modified the page, we mark it dirty.

This step is extremely important because if pages never get unpinned, the buffer pool eventually has nothing left it is allowed to evict.

Then everything jams.

#### `flushPage(page_id)` and `flushAllPages()`

These force modified in-memory data back to disk.

Sometimes we flush one page.

Sometimes we flush everything.

Either way, the point is to synchronize RAM state with persistent storage.

#### `deletePage(page_id)`

This removes a page from the in-memory structures.

In this stage of the project, page deletion is still fairly primitive.

The important idea is just that the buffer pool can stop tracking that page and free the corresponding frame if appropriate.

#### `_findVictim(frame_id)`

This is an internal helper.

Its job is to answer:

> which frame can I use right now?

It first tries the free list.

If there are no unused frames left, it asks the replacement policy for an evictable one.

That gives us this interface:

```cpp
#include <unordered_map>
#include <list>
#include <mutex>

#include "DiskManager.h"
#include "Page.h"
#include "type.h"
#include "LRUReplacer.h"

class BufferPoolManager {
public:
    BufferPoolManager(size_t pool_size, DiskManager *disk_manager);
    ~BufferPoolManager();

    Page *fetchPage(page_id_t page_id);

    bool unpinPage(page_id_t page_id, bool is_dirty);

    Page *newPage(page_id_t &page_id);

    bool deletePage(page_id_t page_id);

    bool flushPage(page_id_t page_id);

    void flushAllPages();

private:
    size_t _pool_size;
    Page *_frames;

    DiskManager *_disk_manager;

    std::unordered_map<page_id_t, frame_id_t> _page_table;

    LRUReplacer *_replacer;
    std::list<frame_id_t> _free_frames_list;

    std::mutex _latch;

    page_id_t _next_page_id;

    bool _findVictim(frame_id_t *frame_id);
};
```

There is a lot going on here, but it is all in service of one idea:

we have many more pages on disk than frames in memory,

so the buffer manager decides which few pages get to be "hot" right now.

---

## `LRUReplacer`

Eventually the free list runs out.

Now the buffer pool has to evict something.

But what?

One common answer is **LRU**:

**Least Recently Used**.

The idea is simple:

if a page has not been touched for the longest time, it is a decent candidate for eviction.

Not always optimal.

But simple, intuitive, and good enough for this stage.

### How it works

We keep:

* a doubly linked list
* a hashmap from `frame_id` to the corresponding list node

This gives us:

* `O(1)` insert into the list
* `O(1)` removal from the list
* `O(1)` lookup of a frame's position

The convention is:

* front = hottest / most recently available for replacement bookkeeping
* back = coldest / best victim candidate

### Pinning and unpinning

This part is easy to miss.

The replacer only tracks frames that are **evictable**.

If a page is pinned, that frame must not appear in the replacer.

So:

* when a page becomes pinned, remove its frame from LRU
* when a page becomes unpinned and its pin count drops to zero, add its frame back

Then when the buffer pool needs space, it asks for a victim and gets the coldest frame from the back.

Here is the interface:

```cpp
#include <list>
#include <unordered_map>
#include <mutex>

#include "type.h"

class LRUReplacer {
private:
    std::list<frame_id_t> _lru_list;
    std::unordered_map<frame_id_t, list_iterator> _lru_map;

    std::mutex _latch;

public:
    LRUReplacer();
    ~LRUReplacer();

    void unpin(frame_id_t frame_id);

    void pin(frame_id_t frame_id);

    bool victim(frame_id_t *frame_id);

    int size();
};
```

So yes.

Something from interview prep finally showed up in a real system.

Annoying, but fair.

---

## What we actually achieved in this step

In Step 0, the interesting idea was:

**make writes durable**

In this step, the interesting idea is:

**make memory usage bounded**

We no longer need the whole database in RAM.

Instead:

* disk holds the full dataset
* RAM holds only a small working set of pages
* `BufferPoolManager` moves pages in and out
* `DiskManager` does the raw I/O
* `LRUReplacer` decides what can leave

That is a real architectural shift.

We are no longer just building a durable hashmap.

We are starting to build an actual storage engine.

---

## What is still missing?

Quite a lot, actually.

Right now a page is still basically just:

```text
4096 bytes of mystery
```

We know how to move pages around.

We do **not** yet have a clean structure for storing records inside those pages.

That is the next step.

We will turn these blank 4 KB containers into **table pages** with an actual record layout.

That is where heap files and slotted pages enter the picture.

But not yet.

For now, this step was about replacing the "entire database in a hashmap" model with something that can scale beyond RAM.

And that is the point where the project starts feeling much more like a database.
