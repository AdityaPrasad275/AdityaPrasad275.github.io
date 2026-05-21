import { useEffect, useRef, useState } from 'react'
import reels from '../data/reels.js'

function ReelFeed({ isActive }) {
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
    <section
      aria-hidden={!isActive}
      className={`fixed inset-0 overflow-hidden bg-black text-white touch-none select-none overscroll-none transition-opacity duration-200 ${
        isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
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

            <div className="relative z-10 flex h-full w-full flex-col justify-between p-4 pb-20">
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
    </section>
  )
}

export default ReelFeed
