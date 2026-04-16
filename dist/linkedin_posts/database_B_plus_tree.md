A database can store rows correctly and still be painfully slow.

That is what hit me next while building AtlasDB.

By this point, I already had:

- persistent storage
- pages and a buffer pool
- slotted pages for records
- a heap table that could store and retrieve rows by `RID`

But there was still a major problem.

If someone asked for:

`key = 42`

the heap table had no idea where that row lived.
It had to scan.

That is the real reason indexes matter.

This step was about building a B+ tree so the database can map:

`key -> RID`

and then use the heap to fetch:

`RID -> row bytes`

In this post, I explored:

- why heap storage alone makes key lookups `O(n)`
- why B+ trees are a good fit for databases
- how internal nodes act as routing structure
- how leaf nodes store the actual `(key, RID)` entries
- why linked leaves make ordered scans and range queries natural
- why insert and delete get tricky once splits, merges, and rebalancing show up

What I like about B+ trees is that they solve two database problems at once.

They make point lookups fast.
And they preserve sorted order for range scans.

That combination is what makes them feel like a database structure, not just a generic tree.

This part of the build also made something very clear to me:

storing data is one problem.
finding it efficiently is a completely different one.

Links:
Medium : https://medium.com/@adityanprasad275/building-a-database-from-scratch-b-tree-3554c4c4ed23
Portfolio: https://adityaprasad275.github.io/#/blog/database_b_plus_tree

If you’ve implemented indexes before, what part do you think teaches the most: page layout, split propagation, delete rebalancing, or iterators over linked leaves?
