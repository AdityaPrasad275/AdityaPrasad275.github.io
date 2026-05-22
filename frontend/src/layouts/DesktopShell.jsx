import { ProfileScreen } from '../features/profile/index.js'
import { ReelFeed } from '../features/reels/index.js'
import SideNav from '../components/SideNav.jsx'

function DesktopShell({ activeTab, onTabChange }) {
  const isReels = activeTab === 'reels'

  return (
    <div className="grid h-full grid-cols-[5.25rem_minmax(0,1fr)] bg-black text-white">
      <SideNav activeTab={activeTab} onTabChange={onTabChange} />

      <main className="relative min-w-0 overflow-hidden bg-black">
        {isReels ? <ReelFeed isActive layout="desktop" /> : <ProfileScreen isActive layout="desktop" />}
      </main>
    </div>
  )
}

export default DesktopShell
