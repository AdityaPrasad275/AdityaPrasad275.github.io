Moving pages around is only half the problem.

Once a page is in memory, the real question is:

How do you actually pack records inside it?

In the previous step, I built the storage machinery:

- `Page`
- `DiskManager`
- `BufferPoolManager`
- `LRUReplacer`

That solved page movement between disk and RAM.
But a 4 KB page is still just raw space until you decide how records live inside it.

So this step was about the inside of a page:

- how to store variable-length records
- how to find a record later without scanning everything before it
- how to delete records without constantly shuffling bytes around
- how `RID` and slot metadata make records addressable
- why slotted pages are such a practical design

What I like about this layer is that it feels deceptively simple.

You split the page into a header, a slot array, and record bytes.
Metadata grows from the front.
Record data grows from the back.
Free space lives in the middle.

That one layout gives you direct lookup, variable-length storage, and cheap tombstone-based deletes.

Wrote it up here:
Medium: https://medium.com/@adityanprasad275/building-database-from-scratch-tables-dd5c93f1e851
Portfolio: https://adityaprasad275.github.io/#/blog/database_storing_records

If you’ve built storage engines before, what do you think is the most important tradeoff to understand early in page layout design: fragmentation, tombstones, compaction, or record indirection?
