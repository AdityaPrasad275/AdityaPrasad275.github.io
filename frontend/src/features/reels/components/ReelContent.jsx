import { SocialIcon } from './ReelIcons.jsx'

function ReelContent({ reel, index, total, links }) {
  const { content, theme } = reel

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: theme.background }}>
      <div className="absolute inset-0 bg-black/28" />
      <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${theme.accent}22` }} />

      <div className="relative z-10 flex h-full w-full flex-col p-4">
        <header className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
          <span style={{ color: theme.accent }}>{content.question}</span>
          <span>
            {index + 1} / {total}
          </span>
        </header>

        <div className="flex flex-1 items-center">
          <div className="max-w-[22rem] space-y-4">
            <p className="text-xs uppercase tracking-[0.36em] text-white/55">{content.kicker}</p>
            <h2 className="text-2xl font-semibold leading-[0.95] sm:text-5xl">{content.title}</h2>
            <p className="max-w-[22rem] text-base leading-7 text-white/88 sm:text-lg">{content.summary}</p>

            {Array.isArray(content.points) && content.points.length > 0 ? (
              <div className="space-y-2 pt-2">
                {content.points.map((point) => (
                  <p key={point} className="text-sm leading-6 text-white/82">
                    {point}
                  </p>
                ))}
              </div>
            ) : null}

            {content.linkPrompt ? (
              <p className="pt-3 text-sm font-medium uppercase tracking-[0.24em] text-white/55">{content.linkPrompt}</p>
            ) : null}

            {Array.isArray(links) && links.length > 0 ? (
              <div className="flex flex-wrap gap-3 pt-2">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className="inline-flex h-8 w-8 items-center justify-center"
                    style={{ color: theme.accent }}
                    aria-label={link.label}
                    title={link.label}
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    <SocialIcon type={link.icon} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReelContent
