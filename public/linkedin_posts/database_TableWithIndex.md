Building a B+ tree is not the same as having indexed queries.

That was the next thing AtlasDB forced me to confront.

At this point, I already had:

- a heap `Table`
- a standalone `BPlusTree`
- full-table scan support
- point lookup and ordered traversal in the index

But there was still a gap.

The heap knew how to fetch rows by `RID`.
The B+ tree knew how to map `key -> RID`.

What I still needed was the actual user-level path:

`key -> row`

That is what `TableWithIndex` became.

It is not a new storage engine.
It is the composition layer that connects:

- heap table: `RID -> row bytes`
- index: `key -> RID`
- query layer: `key -> row bytes`

In this step, I explored:

- why my original “heap vs B+ tree” benchmark was misleading
- what a fair indexed vs non-indexed query comparison actually looks like
- how insert/delete/update now have to keep heap and index in sync
- why updates get subtle when a row can move and its `RID` changes
- how range scans differ between heap order and index order

What I like about this step is that it feels less like implementing isolated data structures and more like building a real access path.

Without this layer, AtlasDB had storage primitives.
With it, AtlasDB can finally answer the question:

“find me the row for this key”

That shift is small in code size, but big in meaning.

Links:
Medium: https://medium.com/@adityanprasad275/building-a-database-from-scratch-tablewithindex-8d846bb4f74f
Portfolio: https://adityaprasad275.github.io/#/blog/database_TableWithIndex

If you’ve built database internals before, what integration bug do you think is easiest to miss early: stale index entries, moved rows after update, inconsistent delete handling, or mismatched scan semantics?
