import { useEffect, useRef, useState } from 'react'

const reels = [
  {
    id: 1,
    name: 'Avery Stone',
    role: 'Frontend Engineer',
    caption: 'Building motion-first interfaces that feel native on mobile.',
    likes: '1.2k',
    comments: '84',
    background: 'linear-gradient(160deg, #0f172a 0%, #7c3aed 45%, #ec4899 100%)',
  },
  {
    id: 2,
    name: 'Avery Stone',
    role: 'Design Systems',
    caption: 'Designing clean systems for apps, tools, and brand moments.',
    likes: '980',
    comments: '41',
    background: 'linear-gradient(160deg, #022c22 0%, #059669 45%, #22c55e 100%)',
  },
  {
    id: 3,
    name: 'Avery Stone',
    role: 'Product Builder',
    caption: 'Shipping portfolio experiences as if they were real social apps.',
    likes: '1.8k',
    comments: '127',
    background: 'linear-gradient(160deg, #111827 0%, #0ea5e9 45%, #f97316 100%)',
  },
]

function App() {
  const [appHeight, setAppHeight] = useState(() =>
    window.visualViewport?.height ?? window.innerHeight,
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const gestureRef = useRef(null)

  useEffect(() => {
    const syncAppHeight = () => {
      const height = window.visualViewport?.height ?? window.innerHeight
      document.documentElement.style.setProperty('--app-height', `${height}px`)
      setAppHeight(height)
    }

    syncAppHeight()

    window.addEventListener('resize', syncAppHeight)
    window.visualViewport?.addEventListener('resize', syncAppHeight)
    window.visualViewport?.addEventListener('scroll', syncAppHeight)

    return () => {
      window.removeEventListener('resize', syncAppHeight)
      window.visualViewport?.removeEventListener('resize', syncAppHeight)
      window.visualViewport?.removeEventListener('scroll', syncAppHeight)
    }
  }, [])

  const clampIndex = (index) => Math.max(0, Math.min(reels.length - 1, index))

  const handlePointerDown = (event) => {
    if (event.button !== 0) return

    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTime: performance.now(),
    }

    setIsDragging(true)
    setDragOffset(0)

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    const gesture = gestureRef.current

    if (!gesture || gesture.pointerId !== event.pointerId) return

    const deltaY = event.clientY - gesture.startY
    const deltaX = event.clientX - gesture.startX

    if (Math.abs(deltaX) > Math.abs(deltaY)) return

    const maxDrag = appHeight * 0.35
    setDragOffset(Math.max(-maxDrag, Math.min(maxDrag, deltaY)))
  }

  const finishGesture = (event) => {
    const gesture = gestureRef.current

    if (!gesture || gesture.pointerId !== event.pointerId) return

    const deltaY = event.clientY - gesture.startY
    const elapsed = Math.max(performance.now() - gesture.startTime, 1)
    const velocity = deltaY / elapsed
    const threshold = Math.max(80, appHeight * 0.12)
    const shouldChange = Math.abs(deltaY) > threshold || Math.abs(velocity) > 0.45

    if (shouldChange) {
      setActiveIndex((current) => clampIndex(current + (deltaY < 0 ? 1 : -1)))
    }

    setIsDragging(false)
    setDragOffset(0)
    gestureRef.current = null

    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <main
      className="fixed inset-0 overflow-hidden bg-black text-white touch-none select-none overscroll-none"
      style={{ height: 'var(--app-height)' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishGesture}
      onPointerCancel={finishGesture}
    >
      <div
        className="h-full w-full"
        style={{
          transform: `translate3d(0, ${-activeIndex * appHeight + dragOffset}px, 0)`,
          transition: isDragging ? 'none' : 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {reels.map((reel, index) => (
          <section
            key={reel.id}
            className="relative flex h-full w-full flex-none overflow-hidden"
            style={{ background: reel.background }}
          >
            <div className="absolute inset-0 bg-black/20" />

            <div className="relative z-10 flex h-full w-full flex-col justify-between p-4">
              <header className="flex items-center justify-between text-sm font-medium">
                <span>@averyportfolio</span>
                <span>
                  {index + 1} / {reels.length}
                </span>
              </header>

              <div className="flex items-end justify-between gap-4">
                <div className="max-w-[75%] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full border border-white/40 bg-white/15 backdrop-blur" />
                    <div>
                      <p className="text-lg font-semibold leading-tight">{reel.name}</p>
                      <p className="text-sm text-white/80">{reel.role}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-white/90">{reel.caption}</p>
                </div>

                <div className="flex flex-col items-center gap-4 text-sm font-semibold">
                  <button className="rounded-full bg-white/15 px-3 py-2 backdrop-blur">♥ {reel.likes}</button>
                  <button className="rounded-full bg-white/15 px-3 py-2 backdrop-blur">💬 {reel.comments}</button>
                  <button className="rounded-full bg-white/15 px-3 py-2 backdrop-blur">↗</button>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

export default App
