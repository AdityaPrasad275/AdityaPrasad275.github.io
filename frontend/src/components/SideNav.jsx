import { Link, useLocation } from 'react-router-dom'
import reelIcon from '../icons/reel.png'
import profileIcon from '../icons/profile.png'

function SideNav() {
  const { pathname } = useLocation()
  const isReelsActive = pathname === '/' || pathname.startsWith('/reels/')
  const isProfileActive = pathname === '/profile'

  return (
    <aside className="flex h-full flex-col items-center justify-center border-r border-white/10 bg-zinc-950/95 px-2 py-5 backdrop-blur-xl">
      <div className="flex w-full flex-col items-stretch gap-2">
        <Link
          to="/"
          aria-label="Reels"
          className={`rounded-2xl px-2 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors ${
            isReelsActive ? 'bg-zinc-700 text-white' : 'text-white/58 hover:bg-white/6 hover:text-white'
          }`}
        >
          <img src={reelIcon} alt="" className="mx-auto h-6 w-6" />
        </Link>
        <Link
          to="/profile"
          aria-label="Profile"
          className={`rounded-2xl px-2 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors ${
            isProfileActive ? 'bg-zinc-700 text-white' : 'text-white/58 hover:bg-white/6 hover:text-white'
          }`}
        >
          <img src={profileIcon} alt="" className="mx-auto h-6 w-6" />
        </Link>
      </div>
    </aside>
  )
}

export default SideNav
