import { useState } from 'react'
import BottomNav from './components/BottomNav.jsx'
import ProfileScreen from './components/ProfileScreen.jsx'
import ReelFeed from './components/ReelFeed.jsx'

function App() {
  const [activeTab, setActiveTab] = useState('reels')

  return (
    <main className="fixed inset-0 overflow-hidden bg-black text-white">
      {activeTab === 'reels' ? <ReelFeed isActive /> : <ProfileScreen isActive />}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  )
}

export default App
