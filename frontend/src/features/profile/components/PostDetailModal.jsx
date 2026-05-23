function PostDetailModal({ post, onClose }) {
  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid lg:grid-cols-[3fr_2fr]">
          <div
            className="flex aspect-[4/3] flex-col justify-between p-6 sm:p-8"
            style={{ background: post.grid.background }}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                {post.grid.eyebrow}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm text-white/70 hover:bg-white/20"
              >
                ✕
              </button>
            </div>
            <div className="max-w-md space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{post.title}</h2>
              <p className="text-sm leading-7 text-white/72 sm:text-base">{post.grid.thumbnailText}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <p className="text-sm leading-7 text-white/78">{post.summary}</p>
            {post.detail.format === 'carousel' && post.detail.slides && (
              <div className="space-y-4">
                {post.detail.slides.map((slide, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-semibold text-white">{slide.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-white/60">{slide.body}</p>
                  </div>
                ))}
              </div>
            )}
            {post.detail.format === 'article' && post.detail.sections && (
              <div className="space-y-4">
                {post.detail.sections.map((section, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-semibold text-white">{section.heading}</h4>
                    <p className="mt-1 text-sm leading-6 text-white/60">{section.body}</p>
                  </div>
                ))}
              </div>
            )}
            {post.detail.links && post.detail.links.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-3 pt-4">
                {post.detail.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetailModal
