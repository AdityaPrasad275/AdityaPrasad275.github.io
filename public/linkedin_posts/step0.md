A hashmap is not a database.

It gives you fast reads and writes.
But the moment the process dies, your data is gone.

That’s the first interesting lesson I ran into while building a database from scratch:
The hard part is not just storing key-value pairs in memory.
It’s making them survive crashes, restarts, and partial writes.

So in step 0, I built a tiny persistent key-value store and used it to explore:

- why persistence changes the problem
- what atomicity and durability actually mean
- why “write successful” doesn’t always mean “safely on disk”
- how a Write-Ahead Log (WAL) helps recover state after a crash
- where `fsync` fits into the picture

It’s a small project, but it made the database internals feel much more real to me.

Wrote it up here:
Medium: https://medium.com/@adityanprasad275/building-a-database-from-scratch-step-0-kv-store-d3282b554505
Portfolio: https://adityaprasad275.github.io/#/blog/database_step0

Curious what part of database internals people find most counterintuitive when starting out: durability, indexing, concurrency, or transactions?

