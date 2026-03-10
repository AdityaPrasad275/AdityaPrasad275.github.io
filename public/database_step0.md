
*A tiny persistent key–value store*

## The fairly non-technical story

### Overview

First we build a simple **key–value store**. It should support three basic operations:

1. Set a value for a key
   `INSERT key value`

2. Retrieve a value
   `GET key`

3. Delete a key
   `DELETE key`

Nothing fancy yet.

---

### Hashmap!

Technically, all of these objectives are solved by a simple **hashmap**.

Initialize a hashmap and you're done.

* insert → `O(1)`
* get → `O(1)`
* delete → `O(1)`

Perfect.

Except… if you close the program, **all the data disappears**. Which completely defeats the point of a database.

So we actually need two components:

1. **Data in memory (RAM)**
   fast reads and writes

2. **Persistence on disk**
   so data survives program restarts

---

### Persistence

When dealing with persistence, we care about two main goals:

1. **Atomicity**
2. **Durability**

Atomicity means an operation either **fully happens or doesn't happen at all**.

In memory this is rarely a problem. If you insert `(key, value)` into a hashmap, it either succeeds or throws an error.

But writing to disk is different. There are many things that can go wrong:

* power failure
* OS crash
* disk failure
* partial writes

We don't want a situation where we try to write:

```
INSERT alice hi
```

but the program crashes halfway and later we see something like:

```
alice → "h"
```

That would be… bad.

---

### What actually happens when we write to a file?

Writing to disk isn't just one step. The data travels through several layers:

```
Program
     ↓
libc / system call
     ↓
Kernel Page Cache (RAM)
     ↓
Filesystem
     ↓
Block layer
     ↓
Disk controller cache
     ↓
Actual disk / SSD
```

You don’t need to memorize these layers. The important idea is:

**a lot of caching happens before data actually reaches the disk.**

The OS decides:

* what stays in memory
* when writes actually hit the disk

And even the **disk itself has its own cache**.

This means a storage device might say “write successful” while the data is still sitting in some cache somewhere.

Power goes out.

Data disappears.

Oops.

---

### Enter `fsync`

Thankfully, there is a system call called `fsync`.

When we call `fsync(fd)` we tell the OS:

> flush everything related to this file to the disk.

This forces the OS to push cached data down to the storage device.

Now, we can only be **as durable as the hardware allows**. If the disk itself lies about flushing data (which unfortunately happens), there isn’t much we can do.

But `fsync` still gives us a strong durability guarantee at the OS level.

To protect even further against partial writes, we could later add things like:

* record lengths
* checksums

We won’t do that yet.

---

### Ok cool, but is this fast?

Suppose we store key-value pairs directly in a file like this:

```
key,value
1,hi
2,bye
```

Now we want to run:

```
INSERT 3 why
```

To do this correctly we must:

1. scan the entire file
2. check if the key already exists
3. append the new record

That means **insert becomes O(n)**.

And **get becomes O(n)** too.

Not great.

---

### WAL — Write Ahead Log

There’s a smarter approach.

Instead of storing the *state* of the database, we store the **operations** that happened.

Example log file:

```
INSERT name Alice
INSERT age 25
INSERT city New York
INSERT age 26
DELETE city
DELETE job
```

Each operation is simply **appended to the end of the file**.

This is very efficient because **appending is cheap**.

When the program starts, we:

1. read the entire log
2. replay every command
3. rebuild the in-memory hashmap

This is called a **Write Ahead Log (WAL)**.

The rule becomes:

```
1. Write operation to log
2. fsync
3. update in-memory state
```

If the system crashes, we just **replay the log** when the program restarts.

And boom.

We now have a **persistent key–value store**.

Not amazing yet, but a solid starting point.

---

# The technical part

We're implementing this in **C++**.

We'll create a class called `Database`.
Boring name, but it gets the job done.

### db.h

```cpp
#pragma once

#include <string>
#include <unordered_map>

class Database {
public:
    Database(const std::string logFile);
    ~Database();

    void insert(const std::string &key, const std::string &value);
    std::string get(const std::string &key);
    void deleteKey(const std::string &key);

private:
    std::string _logFile;
    int _fd; // file descriptor

    std::unordered_map<std::string, std::string> _in_memory_store;

    void _replayLog();
    void _appendLog(const std::string& record);
};
```

The public API is simple:

* `insert`
* `get`
* `delete`

Internally we keep:

* a **file descriptor** for the log file
* an **in-memory hashmap** for fast lookups

`_replayLog()` rebuilds the hashmap when the program starts.

`_appendLog()` writes operations to disk safely.

---

### Constructor

```cpp
Database::Database(const std::string logFile)
: _logFile(logFile), _fd(-1)
{
    _fd = open(_logFile.c_str(),
               O_RDWR | O_APPEND | O_CREAT | O_CLOEXEC,
               0644);

    // O_RDWR   -> read and write
    // O_APPEND -> writes always go to end of file
    // O_CREAT  -> create file if it doesn't exist
    // O_CLOEXEC -> don't leak fd into child processes

    if (_fd == -1) {
        throw std::runtime_error(
            "Failed to open logfile: " +
            std::string(strerror(errno))
        );
    }

    _replayLog();
}
```

This:

1. opens the log file
2. verifies it worked
3. rebuilds the in-memory state

---

### Ensuring writes are actually written

```cpp
void Database::_appendLog(const std::string& record)
{
    const char* data = record.c_str();
    size_t remaining = record.size();

    while (remaining > 0) {
        ssize_t written = write(_fd, data, remaining);

        if (written == -1)
            throw std::runtime_error(
                "write failed: " +
                std::string(strerror(errno))
            );

        data += written;
        remaining -= written;
    }

    if (fsync(_fd) == -1)
        throw std::runtime_error(
            "fsync failed: " +
            std::string(strerror(errno))
        );
}
```

Why the loop?

Because **`write()` does not guarantee the full buffer is written in one call**.

Things that can interrupt writes:

* signals
* kernel buffer limits
* partial writes

So we keep writing until everything is written.

Then we call `fsync` to force the data onto disk.

This gives us a strong durability guarantee.

(Again, assuming the storage device behaves.)

---

### Insert / Get / Delete

Now we just wrap everything nicely.

### Insert

```cpp
void Database::insert(const std::string& key,
                      const std::string& value)
{
    std::string record =
        "INSERT " + key + " " + value + "\n";

    // problem: value could contain spaces
    // even worse: value could contain "\n"
    // man this tuff

    _appendLog(record);

    _in_memory_store[key] = value;

    std::cout << "If no error appeared, it worked!\n";
}
```

### Get

```cpp
std::string Database::get(const std::string& key)
{
    if (_in_memory_store.count(key))
        return _in_memory_store[key];

    return "";
}
```

### Delete

```cpp
void Database::deleteKey(const std::string &key)
{
    std::string record = "DELETE " + key + "\n";

    _appendLog(record);

    _in_memory_store.erase(key);

    std::cout << "If no error appeared, it worked!\n";
}
```

Not the most elegant success signal, but it works.

If something goes wrong, an exception will be thrown.

If nothing explodes, we're good.

---

# And that's Step 0

We now have a **persistent key–value store** with:

* O(1) reads using a hashmap
* durable writes using `fsync`
* crash recovery using a write-ahead log

Of course, this is still extremely primitive.

Problems we still have:

* the log grows forever
* replay gets slower over time
* we don't verify log integrity
* no indexing beyond the hashmap

In the next step we'll start fixing these issues by adding:

* record lengths
* checksums
* and eventually **B+-tree indexing**.

This is where things start getting interesting.
