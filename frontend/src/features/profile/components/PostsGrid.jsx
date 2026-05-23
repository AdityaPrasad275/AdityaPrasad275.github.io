function PostsGrid({ posts, onSelectPost }) {
  return (
    <section className="pb-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {posts.map((post) => (
          <button
            key={post.id}
            type="button"
            onClick={() => onSelectPost(post.id)}
            className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] text-left transition-opacity hover:opacity-80 active:scale-[0.98]"
          >
            <div
              className="flex aspect-square flex-col justify-end p-3 sm:p-4"
              style={{ background: post.grid.background }}
            >
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">{post.title}</h3>
                <p className="text-[11px] leading-5 text-white/65 sm:text-xs">{post.grid.thumbnailText}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default PostsGrid
