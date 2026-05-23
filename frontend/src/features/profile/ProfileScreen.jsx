import { useState } from 'react'
import ProfileHeader from './components/ProfileHeader.jsx'
import HighlightsBand from './components/HighlightsBand.jsx'
import PostsGrid from './components/PostsGrid.jsx'
import PostDetailModal from './components/PostDetailModal.jsx'
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
          <ProfileHeader identity={identity} socialProof={socialProof} />
          <HighlightsBand highlights={highlights} />
          <PostsGrid posts={posts} onSelectPost={setSelectedPostId} />
        </div>
      </div>

      {selectedPost && (
        <PostDetailModal post={selectedPost} onClose={() => setSelectedPostId(null)} />
      )}
    </section>
  )
}

export default ProfileScreen
