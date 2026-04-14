A database that fits in memory is easy.

The interesting problems start when it doesn’t.

In Step 0, I had a tiny persistent database with:

- a write-ahead log on disk
- a hashmap in memory

That worked well for small data.
But it breaks the moment your database is much larger than RAM.

So the next question was:

How do you work with 100 GB of data on disk when you only have a small amount of memory available?

That is where pages and buffer pools come in.

In this step, I explored:

- why databases use fixed-size pages instead of arbitrary byte ranges
- how disk pages map into memory frames
- what a `BufferPoolManager` actually does
- why `pin_count` and `is_dirty` are essential for safe eviction
- how LRU helps decide what leaves memory when the pool is full

What I like about this layer is that it makes databases feel much more physical.

Disk becomes a huge stack of pages.
RAM becomes a small workspace.
And the whole job is deciding what gets brought in, what stays, and what must be written back before it leaves.

Wrote it up here:
Medium: https://medium.com/@adityanprasad275/building-a-database-from-scratch-pages-503130d77f56 
Portfolio: https://adityaprasad275.github.io/#/blog/database_pages

If you’ve worked on storage systems, what replacement policy or buffer-pool design tradeoff do you think is most worth understanding early: LRU, clock, dirty-page flushing, or pinning semantics?
