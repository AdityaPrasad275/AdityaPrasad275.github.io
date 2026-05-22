function SideNav({ activeTab, onTabChange }) {
  return (
    <aside className="flex h-full flex-col items-center border-r border-white/10 bg-zinc-950/95 px-2 py-5 backdrop-blur-xl">
      <div className="flex w-full flex-col items-stretch gap-2">
        <button
          type="button"
          className={`rounded-2xl px-2 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors ${
            activeTab === 'reels' ? 'bg-white text-black' : 'text-white/58 hover:bg-white/6 hover:text-white'
          }`}
          onClick={() => onTabChange('reels')}
        >
          Reels
        </button>
        <button
          type="button"
          className={`rounded-2xl px-2 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors ${
            activeTab === 'profile' ? 'bg-white text-black' : 'text-white/58 hover:bg-white/6 hover:text-white'
          }`}
          onClick={() => onTabChange('profile')}
        >
          Profile
        </button>
      </div>
    </aside>
  )
}

export default SideNav
