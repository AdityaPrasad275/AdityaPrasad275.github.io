function PostsGrid({ posts, onSelectPost }) {
  return (
    <section className="sm:mx-0 -mx-4 sm:px-0">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {posts.map((post) => (
          <button
            key={post.id}
            type="button"
            onClick={() => onSelectPost(post.id)}
            className="overflow-hidden border border-white/10 bg-white/[0.03] text-left transition-opacity hover:opacity-80 active:scale-[0.98]"
          >
            <div
              className="flex aspect-square flex-col justify-between"
              style={{ background: post.grid.background }}
            >
              <div className="flex min-h-0 flex-1 items-center justify-center px-3 text-center">
                <p className="text-base font-semibold text-white sm:text-lg">{post.title}</p>
              </div>
              <p className="self-start px-3 pb-3 text-[11px] leading-5 text-white/65 sm:text-xs">
                {post.grid.thumbnailText}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default PostsGrid
