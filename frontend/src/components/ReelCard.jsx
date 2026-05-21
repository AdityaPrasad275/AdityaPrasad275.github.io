import { ActionIcon, SocialIcon } from './ReelIcons.jsx'

function ReelCard({
  reel,
  index,
  total,
  liked,
  commentOpen,
  shareCopied,
  onLike,
  onComment,
  onShare,
  onStopPointerDown,
}) {
  return (
    <section className="relative flex h-full w-full flex-none overflow-hidden" style={{ background: reel.background }}>
      <div className="absolute inset-0 bg-black/28" />
      <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${reel.accent}22` }} />

      <div className="relative z-10 flex h-full w-full flex-col p-4 pb-24">
        <header className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
          <span style={{ color: reel.accent }}>{reel.question}</span>
          <span>
            {index + 1} / {total}
          </span>
        </header>

        <div className="flex flex-1 items-center">
          <div className="max-w-[28rem] space-y-4">
            <p className="text-xs uppercase tracking-[0.36em] text-white/55">{reel.kicker}</p>
            <h2 className="text-4xl font-semibold leading-[0.95] sm:text-5xl">{reel.title}</h2>
            <p className="max-w-[26rem] text-base leading-7 text-white/88 sm:text-lg">{reel.summary}</p>

            {Array.isArray(reel.points) && reel.points.length > 0 ? (
              <div className="space-y-2 pt-2">
                {reel.points.map((point) => (
                  <p key={point} className="text-sm leading-6 text-white/82">
                    {point}
                  </p>
                ))}
              </div>
            ) : null}

            {reel.linkPrompt ? (
              <p className="pt-3 text-sm font-medium uppercase tracking-[0.24em] text-white/55">{reel.linkPrompt}</p>
            ) : null}

            {Array.isArray(reel.links) && reel.links.length > 0 ? (
              <div className="flex flex-wrap gap-3 pt-2">
                {reel.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className="inline-flex h-8 w-8 items-center justify-center"
                    style={{ color: reel.accent }}
                    aria-label={link.label}
                    title={link.label}
                    onPointerDown={onStopPointerDown}
                  >
                    <SocialIcon type={link.icon} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pb-[env(safe-area-inset-bottom)] pt-6">
          <div className="max-w-[72%] space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-xs font-semibold tracking-[0.26em] text-white/85">
                AP
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-white">Aditya Prasad</p>
              </div>
            </div>

            <p className="text-sm leading-6 text-white/80">{reel.footerCaption ?? reel.summary}</p>
          </div>

          <div className="flex flex-col items-center gap-3 text-white/90">
            <button
              type="button"
              className={`inline-flex h-8 w-8 items-center justify-center transition-colors ${
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
              className={`inline-flex h-8 w-8 items-center justify-center transition-colors ${
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
              className="relative inline-flex h-8 w-8 items-center justify-center text-white/90"
              onPointerDown={onStopPointerDown}
              aria-label="Share"
              onClick={onShare}
            >
              <ActionIcon type="share" />
              {shareCopied ? (
                <span className="absolute -right-9 top-1 text-[10px] font-medium uppercase tracking-[0.24em] text-emerald-300">
                  Copied
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReelCard
