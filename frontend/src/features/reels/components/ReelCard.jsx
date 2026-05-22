import ReelActions from './ReelActions.jsx'
import ReelContent from './ReelContent.jsx'
import ReelMeta from './ReelMeta.jsx'

function ReelCard({
  reel,
  index,
  total,
  layout = 'mobile',
  liked,
  commentOpen,
  shareCopied,
  onLike,
  onComment,
  onShare,
  onStopPointerDown,
}) {
  if (layout === 'desktop') {
    return (
      <section className="grid h-full w-full snap-start snap-always grid-cols-[minmax(8rem,1fr)_minmax(20rem,21.5rem)_minmax(6rem,0.85fr)] gap-2 px-4 py-4 xl:grid-cols-[minmax(9rem,1fr)_minmax(20rem,21.5rem)_minmax(6rem,0.85fr)]">
        <div className="flex min-h-0 items-end justify-end pb-6 pr-1">
          <ReelMeta reel={reel} />
        </div>

        <div className="flex min-h-0 items-center justify-center">
          <div className="h-[min(90vh,58rem)] w-[min(100%,21.5rem)] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.65)]">
            <ReelContent reel={reel} index={index} total={total} links={reel.links} />
          </div>
        </div>

        <div className="flex min-h-0 items-end justify-start pb-6 pl-1">
          <ReelActions
            liked={liked}
            commentOpen={commentOpen}
            shareCopied={shareCopied}
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
            onStopPointerDown={onStopPointerDown}
          />
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-full w-full flex-none overflow-hidden">
      <ReelContent reel={reel} index={index} total={total} links={reel.links} />

      <div className="absolute left-4 bottom-4 max-w-[72%] space-y-2 pb-[env(safe-area-inset-bottom)]">
        <ReelMeta reel={reel} />
      </div>

      <div className="absolute bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] right-4 z-20">
        <ReelActions
          liked={liked}
          commentOpen={commentOpen}
          shareCopied={shareCopied}
          onLike={onLike}
          onComment={onComment}
          onShare={onShare}
          onStopPointerDown={onStopPointerDown}
        />
      </div>
    </section>
  )
}

export default ReelCard
