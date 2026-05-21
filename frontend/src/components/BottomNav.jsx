function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-3 text-sm font-medium">
        <button
          type="button"
          className={activeTab === 'reels' ? 'text-white' : 'text-white/50'}
          onClick={() => onTabChange('reels')}
        >
          Reels
        </button>
        <button
          type="button"
          className={activeTab === 'profile' ? 'text-white' : 'text-white/50'}
          onClick={() => onTabChange('profile')}
        >
          Profile
        </button>
      </div>
    </nav>
  )
}

export default BottomNav
