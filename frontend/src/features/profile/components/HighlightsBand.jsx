import { SocialIcon } from '../../../components/Icons'

function HighlightsBand({ highlights }) {
  return (
    <section className="lg:px-[12%]">
      <div className="flex gap-5 overflow-x-auto pb-2 sm:gap-6 lg:justify-center lg:overflow-visible">
        {highlights.map((highlight) => (
          <a
            key={highlight.id}
            href={highlight.href}
            className="group flex min-w-[4.75rem] flex-col items-center gap-2 text-center"
            aria-label={highlight.label}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/78 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-colors group-hover:bg-white/[0.1] group-hover:text-white sm:h-[4.5rem] sm:w-[4.5rem]">
              <SocialIcon type={highlight.icon} className="block h-7 w-7 fill-current" />
            </div>
            <span className="max-w-[5rem] truncate text-xs font-medium text-white/72">{highlight.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default HighlightsBand
