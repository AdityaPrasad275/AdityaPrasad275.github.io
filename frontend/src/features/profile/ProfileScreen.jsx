
import ProfileHeader from './components/ProfileHeader.jsx'
import HighlightsBand from './components/HighlightsBand.jsx'
import PostsGrid from './components/PostsGrid.jsx'
import profile from './data/profile.js'
import reels from '../reels/data/reels.js'

function ProfileScreen({ isActive, layout = 'mobile' }) {
  const { identity, socialProof, highlights} = profile

  // only take from index 6 and on, since the first 6 reels are static intro/contact reels that don't have associated posts
  const posts = reels.slice(6).map((reel) => ({
    id: reel.id,
    title: reel.content.title,
    summary: reel.content.summary,
    link_to_reel: reel.canonicalUrl,
    grid: {
      background: reel.theme.background,
      thumbnailText: reel.content.footerCaption,
    },
  }))
  // on select of a post, navigate with client-side history so the app can switch views without a full reload
  const handleSelectPost = (postId) => {
    const post = posts.find((p) => p.id === postId)
    if (post) {
      window.history.pushState(null, '', post.link_to_reel)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }

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
          <ProfileHeader identity={identity} socialProof={socialProof} />
          <HighlightsBand highlights={highlights} />

          <div className="flex items-center gap-3 border-t border-white/10 pt-6 text-white/70">
            <span className="text-xs uppercase tracking-[0.3em]">Blog posts</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <PostsGrid posts={posts} onSelectPost={handleSelectPost} />
        </div>
      </div>

    </section>
  )
}

export default ProfileScreen
