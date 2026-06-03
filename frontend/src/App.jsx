import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DesktopShell from './layouts/DesktopShell.jsx'
import MobileShell from './layouts/MobileShell.jsx'
import { ProfileScreen } from './features/profile/index.js'
import { ReelFeed } from './features/reels/index.js'

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

function ReelsPage() {
  const isDesktop = useIsDesktop()

  return isDesktop ? (
    <DesktopShell>
      <ReelFeed isActive layout="desktop" />
    </DesktopShell>
  ) : (
    <MobileShell>
      <ReelFeed isActive layout="mobile" />
    </MobileShell>
  )
}

function ProfilePage() {
  const isDesktop = useIsDesktop()

  return isDesktop ? (
    <DesktopShell>
      <ProfileScreen isActive layout="desktop" />
    </DesktopShell>
  ) : (
    <MobileShell>
      <ProfileScreen isActive layout="mobile" />
    </MobileShell>
  )
}

function App() {
  return (
    <BrowserRouter>
      <main className="fixed inset-0 overflow-hidden bg-black text-white">
        <Routes>
          <Route path="/" element={<ReelsPage />} />
          <Route path="/reels" element={<Navigate to="/" replace />} />
          <Route path="/reels/:reelSlug" element={<ReelsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
