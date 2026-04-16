*Organising the inside of a page.*

Note: All code can be found in the github repo [github.com/AdityaPrasad275/AtlasDB](https://github.com/AdityaPrasad275/AtlasDB).

# We can move pages now. Great. What goes inside them?

In the previous step, we built the machinery for handling database pages:

* `Page`
* `DiskManager`
* `BufferPoolManager`
* `LRUReplacer`

That solved one big problem:

**how do we move fixed-size blocks between disk and RAM safely?**

But that still leaves the next question:

**once a page is in memory, how do we actually store records inside it?**

Because a 4 KB page is just raw space.

If someone asks us to insert three records into that page, where exactly do they go?

How do we find record number 2 later?

How do we delete one record without shuffling the whole page every time?

How do we support variable-length records instead of pretending everything is a fixed-size struct?

That is the problem this step solves.

We are no longer talking about moving pages around.

Now we are talking about **organising the bytes inside one page**.

That brings us to `TablePage`, `RID`, and finally `Table`.

---

## The non-technical story

Imagine a single page is a suitcase.

You have 4 KB of space inside it.

Now suppose you want to pack variable-sized items into that suitcase:

* one item is 20 bytes
* one is 100 bytes
* one is 500 bytes

You could just start stuffing items from the front.

That works for inserts.

But then imagine someone says:

> Give me the third item you packed.

Now you have a problem.

If you never stored any metadata, the only way to find it is to walk through item 1, then item 2, then finally reach item 3.

That is not great.

So instead, you keep a small index card near the front of the suitcase.

For each item, the card says:

* where the item starts
* how large the item is

Now you can jump directly to the item you want.

That is the basic idea of a **slotted page**.

### One page, three regions

A `TablePage` is divided into three conceptual regions:

1. a **header** at the beginning
2. a **slot array** right after the header
3. the actual **record bytes** packed from the end of the page backwards

So the page grows inward from both sides:

* metadata grows from the front
* record data grows from the back

And the free space is the gap in the middle.

That layout gives us two really useful properties:

* we can append new metadata entries as more records arrive
* we can store variable-length record data without needing it to be tightly tied to slot position

This is a very common database trick because it is simple and effective.

---

## Why not just append records one after another?

Because appending raw records without an index creates bad tradeoffs.

### Option 1: no metadata

If we only keep raw record bytes, insertion is easy:

* find the end
* copy bytes there

But lookup becomes painful.

To find the `n`th record, we must scan all previous records first.

That turns random access into something much closer to linear walking.

### Option 2: keep per-record metadata

If we store a small slot entry per record, then each slot can tell us:

* the record offset
* the record size

Now record lookup is simple:

* use `slot_id`
* jump to the slot
* read offset and size
* jump straight to the data

That is why slotted pages exist.

They are not fancy.

They are just a clean way to support:

* variable-length records
* direct lookup
* cheap deletion markers
* page-local bookkeeping

---

# The technical part

Like the `database_pages` write-up, the goal here is not to dump every line of implementation.

The goal is to explain the moving parts cleanly enough that the header and `.cpp` files feel obvious.

We will go bottom-up:

1. `RID`
2. `Slot`
3. `TablePage`
4. `Table`

---

## `RID`

Once records live inside pages, we need a way to identify them.

A record is not identified just by page id.

One page can hold many records.

So we use a **Record ID**, or `RID`:

```cpp
struct RID {
    page_id_t page_id;
    slot_id_t slot_id;

    bool operator==(const RID& other) const {
        return page_id == other.page_id and slot_id == other.slot_id;
    }
};
```

This is the full address of a record:

* `page_id` tells us **which page**
* `slot_id` tells us **which slot within that page**

That is enough to uniquely locate a record inside a heap-file style table.

---

## `Slot`

A slot is the tiny metadata entry that makes the whole page layout work.

Here is the struct:

```cpp
struct Slot {
    int offset;
    int size;
    // we represent a deleted record by putting offset = -1
};
```

Each slot tells us:

* where the record starts inside the page
* how many bytes belong to that record

That means the slot array acts like a mini index for records within one page.

### Why store slots separately from record bytes?

Because records are variable length.

If record 0 is 30 bytes and record 1 is 300 bytes, their positions are not predictable from arithmetic alone.

But once the slot stores `(offset, size)`, lookup becomes trivial.

### Deletion as a tombstone

When a record is deleted, this implementation does not compact the page immediately.

Instead, it marks the slot as deleted by setting:

```cpp
offset = -1
```

That is a tombstone.

This is much simpler than shifting record bytes around every time we delete something.

The downside is that deletions do not immediately reclaim fragmented space.

That is a tradeoff we accept for now.

---

## `TablePage`

`TablePage` is where the slotted-page idea becomes concrete.

It defines how one 4 KB page is organised in memory.

Here is the class:

```cpp
class TablePage {
public:
    void init(page_id_t prev_page_id, page_id_t page_id);

    bool insertRecord(const char* data, int size);

    char* getRecord(slot_id_t slot_id, int& record_size);

    bool updateRecord(slot_id_t slot_id, const char* data, int size);

    bool deleteRecord(slot_id_t slot_id);

    page_id_t getNextPageId() { return _next_page_id; }
    void setNextPageId(page_id_t next_page_id) { _next_page_id = next_page_id; }

    page_id_t getPrevPageId() { return _prev_page_id; }
    void setPrevPageId(page_id_t prev_page_id ) { _prev_page_id = prev_page_id; }

    int getSlotCount() { return _slot_count; }

private:
    page_id_t _prev_page_id;
    page_id_t _next_page_id;
    page_id_t _page_id;

    int _free_space_pointer;
    int _slot_count;

    Slot* _getSlot(slot_id_t slot_id);
};
```

### What lives in the header?

The in-page header stores:

* `_prev_page_id`
* `_next_page_id`
* `_page_id`
* `_free_space_pointer`
* `_slot_count`

So the header is carrying both:

* **navigation metadata** for linking pages together
* **layout metadata** for understanding the inside of this page

### The physical layout

Conceptually, the page looks like this:

```text
+---------------------------------------------------------------+
| Header | Slot 0 | Slot 1 | Slot 2 | ... |     Free Space      |
+---------------------------------------------------------------+
|                    ... record bytes ...                       |
+---------------------------------------------------------------+
```

More precisely:

* the header starts at byte `0`
* slots begin immediately after `sizeof(TablePage)`
* record bytes are copied from the **end of the page backward**
* `_free_space_pointer` marks the current start of free space from the back side

At initialization:

* `_slot_count = 0`
* `_free_space_pointer = Page::PAGE_SIZE`
* `_next_page_id = Page::INVALID_PAGE_ID`

So an empty page begins with metadata at the front and all remaining space free.

### Why store record bytes from the end?

Because slots need room to grow too.

If both slots and records grew in the same direction, they would constantly collide in awkward ways.

Instead:

* slots grow forward from the front
* records grow backward from the end

The free space is whatever remains between them.

This is a very clean mental model:

```text
front -> [header][slots] .....free space..... [records] <- back
```

When the gap becomes too small, the page is full.

---

### `_getSlot(slot_id)`

This helper is the pointer-arithmetic core of the implementation.

```cpp
Slot* TablePage::_getSlot(slot_id_t slot_id) {
    auto header = reinterpret_cast<char*>(this);
    auto slot_start = reinterpret_cast<Slot*>(header + sizeof(TablePage));
    return slot_start + slot_id;
}
```

The important part is the cast to `char*`.

Why?

Because `char*` arithmetic moves in **bytes**.

If we added `1` to a `TablePage*`, we would jump by `sizeof(TablePage)`.

But here we want byte-level movement:

* first reach the start of the page
* then skip the header bytes
* then treat that location as the start of the slot array

From there, `slot_start + slot_id` works because pointer arithmetic on `Slot*` advances slot-by-slot.

This is exactly the kind of low-level code that is small, correct, and mildly annoying to read the first time.

---

### `insertRecord`

Insertion does four things:

1. compute how much space is currently available
2. check whether we have room for both:
   * the new record bytes
   * one new `Slot`
3. copy the record into free space near the end of the page
4. create a slot that points to it

The key check is:

```text
available_space = free_space_pointer - current_slots_end
```

If that available space is smaller than:

```text
record_size + sizeof(Slot)
```

then insertion fails.

Otherwise:

* `_free_space_pointer` moves backward by `size`
* the record bytes are copied there with `memcpy`
* the next slot is filled with `(offset, size)`
* `_slot_count` is incremented

That is the whole insert path.

No searching.

No compaction.

Just place the bytes and add a slot.

---

### `getRecord`

Lookup is straightforward:

1. validate the slot id
2. fetch the slot
3. reject tombstoned slots
4. return a pointer to `page_start + slot->offset`

This is exactly why the slot array exists.

Without slots, we would have to scan earlier records to find later ones.

With slots, record access becomes direct.

---

### `updateRecord`

Updates have two cases.

#### Case 1: new record is smaller or equal

If the new payload size is `<=` the old one, we can overwrite in place:

* `memcpy` the new bytes over the old location
* update `slot->size`

Simple.

#### Case 2: new record is larger

If the new payload is bigger, the current location may no longer fit.

In this implementation, `TablePage` tries a page-local relocation:

* check whether the page still has enough remaining free space
* if yes, allocate fresh space from the back
* copy the new bytes there
* update the slot to point at the new location

If even that fails, `TablePage::updateRecord` returns `false`.

And that is an important design decision:

**a page should not decide to allocate another page for itself.**

That responsibility belongs to `Table`, which knows about the whole page chain.

---

### `deleteRecord`

Deletion is intentionally cheap:

```cpp
slot->offset = -1;
```

That is all.

We are not compacting bytes.

We are not shifting later records forward.

We are not shrinking the slot array.

This keeps deletion simple, but it also means free space can become fragmented over time.

That is acceptable for now.

A future version could add page compaction or slot reuse.

---

## `Table`

`TablePage` explains how records live inside one page.

But users do not want to think in terms of individual pages.

They want a table-like abstraction:

* insert a record
* read a record
* update a record
* delete a record

That is what `Table` provides.

It acts as the layer above `TablePage` and coordinates with the `BufferPoolManager`.

Here is the interface:

```cpp
class Table {
private:
    BufferPoolManager* _bpm;
    page_id_t _first_page_id;
    page_id_t _last_page_id;

    void _updateRIDandUnpinPage(RID& rid, TablePage* tp, page_id_t page_id);
    TablePage* _fetchAndCast(page_id_t page_id);

public:
    Table(BufferPoolManager* bpm, page_id_t first_page_id = Page::INVALID_PAGE_ID);

    bool insertRecord(const char* data, int size, RID& rid);
    bool getRecord(const RID& rid, std::vector<char>& data);
    bool updateRecord(const char* data, int size, RID& rid);
    bool deleteRecord(const RID& rid);

    page_id_t getFirstPageId() { return _first_page_id; };
};
```

### What kind of structure is a `Table`?

Internally, this table is a **heap file** implemented as a doubly linked list of `TablePage`s.

Each page stores:

* `prev_page_id`
* `next_page_id`

So `Table` itself does not need a `vector<TablePage*>`.

It only needs:

* `_first_page_id`
* `_last_page_id`
* `_bpm`

That is enough to:

* find the start of the chain
* append to the end of the chain
* fetch pages through the buffer pool

---

### Constructor

The constructor supports two cases.

#### Case 1: creating a brand-new table

If `first_page_id == Page::INVALID_PAGE_ID`, then the table does not exist yet.

So we:

1. ask the buffer pool for a new page
2. cast that page data to `TablePage*`
3. initialize it
4. set `_first_page_id` and `_last_page_id`
5. unpin it as dirty

This creates a one-page table.

#### Case 2: reopening an existing table

If we already know `first_page_id`, then the table exists on disk.

In that case:

* `_first_page_id` is known immediately
* `_last_page_id` is not

So the constructor traverses the linked list using `next_page_id` until it finds the page whose `next_page_id == Page::INVALID_PAGE_ID`.

That final page becomes `_last_page_id`.

This is a nice example of why page-to-page links belong in the header.

They let the table reconstruct its own structure from storage alone.

---

### `_fetchAndCast`

This helper is small but conceptually important:

```cpp
TablePage* Table::_fetchAndCast(page_id_t page_id) {
    Page* page = _bpm->fetchPage(page_id);
    if (page == nullptr) {
        return nullptr;
    }
    return reinterpret_cast<TablePage*>(page->getData());
}
```

`BufferPoolManager` speaks in terms of generic `Page`s.

But record operations need to speak in terms of `TablePage`.

So this helper does two jobs:

* fetch the page through the buffer pool
* interpret its raw bytes as a `TablePage`

That reinterpretation is basically saying:

> These 4096 bytes are not just anonymous data.
>  
> For this page type, we know how to read them.

---

### `insertRecord`

Insertion is append-oriented.

The table always tries the current last page first.

The logic is:

1. fetch `_last_page_id`
2. try `TablePage::insertRecord`
3. if it succeeds:
   * populate the `RID`
   * unpin the page dirty
4. if it fails because the page is full:
   * allocate a new page through the buffer pool
   * link the old last page to the new page
   * initialize the new page
   * insert there instead
   * update `_last_page_id`

That means inserts are effectively:

* append to the last page until full
* then append a new page to the table

Simple and very heap-file-like.

---

### `getRecord`

Reading a record is a two-hop lookup:

1. use `rid.page_id` to fetch the right page
2. use `rid.slot_id` to fetch the right slot inside that page

Then the bytes are copied into a `std::vector<char>`.

This separation is useful:

* `RID` identifies the record globally within the table
* `Slot` identifies its physical location within one page

Together they bridge table-level logic and page-level layout.

---

### `updateRecord`

Update is where `TablePage` and `Table` collaborate.

First, `Table` asks the current page to handle the update locally:

```cpp
if (tp->updateRecord(rid.slot_id, data, size)) {
    _bpm->unpinPage(rid.page_id, true);
    return true;
}
```

If that succeeds, we are done.

If it fails, that usually means the larger version cannot fit in that page.

So `Table` takes over:

1. tombstone the old slot
2. unpin the old page dirty
3. insert the new record somewhere else in the table
4. update the caller's `RID`

That last part matters.

If the record moved to a different page or slot, its address changed.

So the caller's `RID` must change too.

This is one of the cleanest reasons to keep `RID` explicit in the API.

---

### `deleteRecord`

Deletion at the table level is just:

1. fetch page from `rid.page_id`
2. call `TablePage::deleteRecord(rid.slot_id)`
3. unpin dirty

So the table-level delete is simple because the page-level delete is simple.

That is a recurring theme in storage engines:

good local abstractions make upper layers much easier to write.

---

## A note on `memcpy`

The implementation uses `memcpy` for record movement.

That is normal here.

We are working with raw bytes inside a page, so copying bytes is exactly the job.

The real safety question is not "should we avoid `memcpy`?"

The real safety question is:

**have we validated offsets and sizes before calling it?**

In this implementation, correctness mainly depends on:

* checking free space before inserts
* checking slot bounds before reads and writes
* rejecting deleted slots
* maintaining `_free_space_pointer` correctly

So `memcpy` itself is not the suspicious part.

The suspicious part, as always in systems code, is bad bookkeeping.

---

## Where we are now

At this point, AtlasDB has something much more database-like than a raw page manager.

We now have:

* a fixed-size page abstraction
* a buffer pool that moves pages between disk and RAM
* a slotted page layout for variable-length records
* a heap-file style `Table` built as a linked list of pages
* CRUD operations expressed in terms of `RID`

That is a big step.

Because now pages are not just anonymous 4 KB blocks anymore.

They have internal structure.

And once pages have internal structure, higher layers can start pretending they are working with records instead of raw memory.

That is where databases start to feel real.

In the next blog we'll benchmark our database!
