import BottomNav from '../components/BottomNav.jsx'
import { ProfileScreen } from '../features/profile/index.js'
import { ReelFeed } from '../features/reels/index.js'

function MobileShell({ activeTab, onTabChange }) {
  return (
    <>
      {activeTab === 'reels' ? <ReelFeed isActive layout="mobile" /> : <ProfileScreen isActive layout="mobile" />}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </>
  )
}

export default MobileShell
