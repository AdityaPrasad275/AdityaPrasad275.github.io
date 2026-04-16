The most useful part of benchmarking AtlasDB was not just getting a big speedup number.

It was making sure the comparison matched a real query path.

For this post, the comparison is:

- non-indexed path: `key -> scan heap rows until match -> row`
- indexed path: `key -> B+ tree -> RID -> heap row`

That is the database tradeoff I wanted to measure.

And once the benchmark was set up that way, the result became very clear:

- heap-only inserts are cheaper
- indexed inserts are slower because they maintain extra structure
- scan-based point queries get dramatically worse as data grows
- B+ tree point lookups stay fast
- range queries benefit even more because the tree can seek and then walk linked leaves in order

What I like about this benchmark is that the result is not “indexes are magic.”

It is much more concrete than that:

you pay more on writes so you can avoid doing terrible read-path work later.

That is the database tradeoff in one sentence.

This post is also a good reminder that benchmarking is part of system design.

The most useful benchmarks are the ones that line up cleanly with the thing users actually ask the database to do.

Links:
Medium: https://medium.com/@adityanprasad275/benchmarking-atlasdb-heap-scan-vs-b-tree-index-6db61ed47c59

Portfolio: https://adityaprasad275.github.io/#/blog/database_btree_vs_heap_benchmark

If you work on systems, what benchmark mistake do you think is most common early on: unfair baselines, unrealistic workloads, hiding maintenance costs, or over-reading headline speedups?
