import { useEffect, useState } from 'react'
import DesktopShell from './layouts/DesktopShell.jsx'
import MobileShell from './layouts/MobileShell.jsx'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false

    return window.matchMedia('(min-width: 1024px)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    const handleChange = (event) => {
      setIsDesktop(event.matches)
    }

    handleChange(mediaQuery)
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return isDesktop
}

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window === 'undefined') return 'reels'
    return window.location.pathname.startsWith('/reels') ? 'reels' : 'profile'
  })
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const handlePopstate = () => {
      setActiveTab(window.location.pathname.startsWith('/reels') ? 'reels' : 'profile')
    }

    window.addEventListener('popstate', handlePopstate)
    return () => window.removeEventListener('popstate', handlePopstate)
  }, [])

  return (
    <main className="fixed inset-0 overflow-hidden bg-black text-white">
      {isDesktop ? (
        <DesktopShell activeTab={activeTab} onTabChange={setActiveTab} />
      ) : (
        <MobileShell activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </main>
  )
}

export default App
