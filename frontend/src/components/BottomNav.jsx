import { Link, useLocation } from 'react-router-dom'
import reelIcon from '../icons/reel.png'
import profileIcon from '../icons/profile.png'

function BottomNav() {
  const { pathname } = useLocation()
  const isReelsActive = pathname === '/' || pathname.startsWith('/reels/')
  const isProfileActive = pathname === '/profile'

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3 text-sm font-medium">
        <Link
          to="/"
          aria-label="Reels"
          className={`flex flex-1 justify-center rounded-2xl px-4 py-2 transition-colors ${
            isReelsActive ? 'bg-zinc-700 text-white' : 'text-white/50 hover:bg-white/6 hover:text-white'
          }`}
        >
          <img src={reelIcon} alt="" className="h-7 w-7" />
        </Link>
        <Link
          to="/profile"
          aria-label="Profile"
          className={`flex flex-1 justify-center rounded-2xl px-4 py-2 transition-colors ${
            isProfileActive ? 'bg-zinc-700 text-white' : 'text-white/50 hover:bg-white/6 hover:text-white'
          }`}
        >
          <img src={profileIcon} alt="" className="h-7 w-7" />
        </Link>
      </div>
    </nav>
  )
}

export default BottomNav
