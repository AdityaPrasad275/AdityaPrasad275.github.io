import { ActionIcon } from './ReelIcons.jsx'

function ReelActions({ liked, commentOpen, shareCopied, onLike, onComment, onShare, onStopPointerDown }) {
  return (
    <div className="flex flex-col items-center gap-2 text-white/90">
      <button
        type="button"
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm transition-colors active:scale-95 ${
          liked ? 'text-red-500' : 'text-white/90'
        }`}
        onPointerDown={onStopPointerDown}
        aria-label="Like"
        onClick={onLike}
      >
        <ActionIcon type="heart" active={liked} />
      </button>
      <button
        type="button"
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm transition-colors active:scale-95 ${
          commentOpen ? 'text-white' : 'text-white/90'
        }`}
        onPointerDown={onStopPointerDown}
        aria-label="Comment"
        onClick={onComment}
      >
        <ActionIcon type="comment" />
      </button>
      <button
        type="button"
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/20 text-white/90 backdrop-blur-sm transition-colors active:scale-95"
        onPointerDown={onStopPointerDown}
        aria-label="Share"
        onClick={onShare}
      >
        <ActionIcon type="share" />
        {shareCopied ? (
          <span className="absolute -left-16 top-1 text-[10px] font-medium uppercase tracking-[0.24em] text-emerald-300">
            Copied!
          </span>
        ) : null}
      </button>
    </div>
  )
}

export default ReelActions
