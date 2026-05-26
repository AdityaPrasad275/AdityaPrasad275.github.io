import { SocialIcon } from '../../../components/Icons'

function HighlightsBand({ highlights }) {
  return (
    <section className="lg:px-[12%]">
      <div className="flex gap-5 overflow-x-auto pb-3 pt-2 sm:gap-6 sm:pb-3 lg:justify-center lg:overflow-visible">
        {highlights.map((highlight) => (
          <a
            key={highlight.id}
            href={highlight.href}
            className="group flex min-w-[4.75rem] flex-col items-center gap-2 text-center"
            aria-label={highlight.label}
          >
            <div className="rounded-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white/78 transition-all group-hover:bg-white/5 shadow-[0_0_0_2px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_0_2px_rgba(255,255,255,0.3)] sm:h-[3.75rem] sm:w-[3.75rem]">
                <SocialIcon type={highlight.icon} className="block h-7 w-7 fill-current" />
              </div>
            </div>
            <span className="max-w-[5rem] truncate text-xs font-medium text-white/72">{highlight.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default HighlightsBand
