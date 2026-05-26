import reelIcon from '../icons/reel.png'
import profileIcon from '../icons/profile.png'

function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3 text-sm font-medium">
        <button
          type="button"
          aria-label="Reels"
          className={`flex flex-1 justify-center rounded-2xl px-4 py-2 transition-colors ${
            activeTab === 'reels' ? 'bg-zinc-700 text-white' : 'text-white/50 hover:bg-white/6 hover:text-white'
          }`}
          onClick={() => onTabChange('reels')}
        >
          <img src={reelIcon} alt="" className="h-7 w-7" />
        </button>
        <button
          type="button"
          aria-label="Profile"
          className={`flex flex-1 justify-center rounded-2xl px-4 py-2 transition-colors ${
            activeTab === 'profile' ? 'bg-zinc-700 text-white' : 'text-white/50 hover:bg-white/6 hover:text-white'
          }`}
          onClick={() => onTabChange('profile')}
        >
          <img src={profileIcon} alt="" className="h-7 w-7" />
        </button>
      </div>
    </nav>
  )
}

export default BottomNav
