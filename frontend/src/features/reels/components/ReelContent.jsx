
function ReelContent({ reel, layout = 'desktop' }) {
  const { content, theme } = reel
  const isMobile = layout === 'mobile'

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: theme.background }}>
      <div className="absolute inset-0 bg-black/28" />
      <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${theme.accent}22` }} />

      <div
        className={`relative z-10 flex h-full w-full flex-col ${
          isMobile
            ? 'px-4 pb-[calc(env(safe-area-inset-bottom)+var(--reel-bottom-nav,4.75rem)+var(--reel-footer-space,10.5rem))] pt-[calc(env(safe-area-inset-top)+1rem)]'
            : 'p-4'
        }`}
      >
        <header className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
          <span style={{ color: theme.accent }}>{content.question}</span>
        </header>

        <div className={`flex min-h-0 flex-1 items-center ${isMobile ? 'justify-center py-3' : ''}`}>
          <div
            className={
              isMobile
                ? 'flex aspect-[3/4] max-h-full w-full max-w-[21rem] flex-col justify-center space-y-3 overflow-hidden'
                : 'max-w-[22rem] space-y-4'
            }
          >
            <p className={`${isMobile ? 'text-[0.65rem]' : 'text-xs'} uppercase tracking-[0.36em] text-white/55`}>
              {content.kicker}
            </p>
            <h2 className={`${isMobile ? 'text-[clamp(2.1rem,12vw,3.75rem)]' : 'text-5xl sm:text-3xl'} font-semibold leading-[0.95]`}>
              {content.title}
            </h2>
            <p className={`${isMobile ? 'text-sm leading-6' : 'text-base leading-7 sm:text-lg'} max-w-[22rem] text-white/88`}>
              {content.summary}
            </p>

            {Array.isArray(content.points) && content.points.length > 0 ? (
              <div className={`${isMobile ? 'space-y-1 pt-1' : 'space-y-2 pt-2'}`}>
                {content.points.map((point) => (
                  <p key={point} className={`${isMobile ? 'text-xs leading-5' : 'text-sm leading-6'} text-white/82`}>
                    {point}
                  </p>
                ))}
              </div>
            ) : null}

            {content.link && (
              <a
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Read the full post
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReelContent
