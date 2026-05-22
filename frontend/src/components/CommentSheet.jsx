function getInitials(name = '') {
  const words = name.trim().split(/\s+/).filter(Boolean)

  if (words.length >= 2) {
    return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase()
  }

  return name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || '?'
}

function CommentSheet({ reel, onClose }) {
  const comments = reel?.engagement?.comments ?? []

  return (
    <div className="fixed inset-0 z-30 bg-black/55" onClick={onClose}>
      <div
        className="absolute inset-x-0 bottom-0 z-10 max-h-[72vh] w-full rounded-t-[1.75rem] border border-white/10 bg-zinc-950/96 px-4 pb-[calc(env(safe-area-inset-bottom)+5rem)] pt-4 shadow-2xl backdrop-blur"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/18" />
        <h3 className="pb-4 text-center text-xs uppercase tracking-[0.34em] text-white/45">Comments</h3>

        <div className="space-y-3 overflow-y-auto pr-1 pb-20" style={{ maxHeight: 'calc(72vh - 7rem)' }}>
          {comments.map((comment, index) => (
            <article
              key={`${comment.name}-${index}`}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold text-white/80">
                  {getInitials(comment.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-sm font-semibold text-white">{comment.name}</p>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-white/88">{comment.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommentSheet
