import { useState } from 'react'
import { SocialIcon } from '../../components/Icons'
import profile from './data/profile.js'

function ProfileScreen({ isActive, layout = 'mobile' }) {
  const { identity, socialProof, highlights, posts } = profile
  const [selectedPostId, setSelectedPostId] = useState(null)

  const selectedPost = selectedPostId ? posts.find((p) => p.id === selectedPostId) : null

  return (
    <section
      aria-hidden={!isActive}
      className={`bg-zinc-950 text-white transition-opacity duration-200 ${
        layout === 'mobile'
          ? `fixed inset-0 ${isActive ? 'opacity-100' : 'pointer-events-none opacity-0'}`
          : `relative h-full min-h-0 ${isActive ? 'opacity-100' : 'pointer-events-none opacity-0'}`
      }`}
    >
      <div className="h-full overflow-y-auto px-4 pb-24 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <header className="px-1 py-4 sm:px-4 lg:px-[12%] lg:py-8">
            <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-lg font-semibold tracking-[0.28em] text-white/90 sm:h-28 sm:w-28 lg:h-36 lg:w-36 lg:text-2xl">
                  {identity.avatar.value}
                </div>
              </div>

              <div className="min-w-0 space-y-4">
                <div className="space-y-3">
                  <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{identity.name}</h1>

                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/72 sm:gap-x-7 sm:text-base">
                    {socialProof.map((item) => (
                      <div key={item.label} className="whitespace-nowrap">
                        <span className="font-semibold text-white">{item.value}</span>{' '}
                        <span className="text-white/58">{item.label.toLowerCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="hidden max-w-3xl text-sm leading-7 text-white/74 sm:block lg:text-base lg:leading-8">
                  {identity.bio}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/74 sm:hidden">{identity.bio}</p>
          </header>

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

          <section className="pb-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {posts.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => setSelectedPostId(post.id)}
                  className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] text-left transition-opacity hover:opacity-80 active:scale-[0.98]"
                >
                  <div
                    className="flex aspect-square flex-col justify-end p-3 sm:p-4"
                    style={{ background: post.grid.background }}
                  >
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">{post.title}</h3>
                      <p className="text-[11px] leading-5 text-white/65 sm:text-xs">{post.grid.thumbnailText}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {selectedPost && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedPostId(null)}
        >
          <div
            className="mx-4 w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid lg:grid-cols-[3fr_2fr]">
              <div
                className="flex aspect-[4/3] flex-col justify-between p-6 sm:p-8"
                style={{ background: selectedPost.grid.background }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                    {selectedPost.grid.eyebrow}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPostId(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm text-white/70 hover:bg-white/20"
                  >
                    ✕
                  </button>
                </div>
                <div className="max-w-md space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{selectedPost.title}</h2>
                  <p className="text-sm leading-7 text-white/72 sm:text-base">{selectedPost.grid.thumbnailText}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <p className="text-sm leading-7 text-white/78">{selectedPost.summary}</p>
                {selectedPost.detail.format === 'carousel' && selectedPost.detail.slides && (
                  <div className="space-y-4">
                    {selectedPost.detail.slides.map((slide, i) => (
                      <div key={i}>
                        <h4 className="text-sm font-semibold text-white">{slide.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-white/60">{slide.body}</p>
                      </div>
                    ))}
                  </div>
                )}
                {selectedPost.detail.format === 'article' && selectedPost.detail.sections && (
                  <div className="space-y-4">
                    {selectedPost.detail.sections.map((section, i) => (
                      <div key={i}>
                        <h4 className="text-sm font-semibold text-white">{section.heading}</h4>
                        <p className="mt-1 text-sm leading-6 text-white/60">{section.body}</p>
                      </div>
                    ))}
                  </div>
                )}
                {selectedPost.detail.links && selectedPost.detail.links.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-3 pt-4">
                    {selectedPost.detail.links.map((link, i) => (
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
      )}
    </section>
  )
}

export default ProfileScreen
