import { useEffect, useRef, useState } from 'react'

function MobileReelScroller({ isActive, reels, activeIndex, onActiveIndexChange, renderReel }) {
  const [feedHeight, setFeedHeight] = useState(() => window.visualViewport?.height ?? window.innerHeight)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const gestureRef = useRef(null)

  useEffect(() => {
    const syncFeedHeight = () => {
      const height = window.visualViewport?.height ?? window.innerHeight
      document.documentElement.style.setProperty('--app-height', `${height}px`)
      setFeedHeight(height)
    }

    syncFeedHeight()
    window.addEventListener('resize', syncFeedHeight)
    window.visualViewport?.addEventListener('resize', syncFeedHeight)
    window.visualViewport?.addEventListener('scroll', syncFeedHeight)

    return () => {
      window.removeEventListener('resize', syncFeedHeight)
      window.visualViewport?.removeEventListener('resize', syncFeedHeight)
      window.visualViewport?.removeEventListener('scroll', syncFeedHeight)
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

    const maxDrag = feedHeight * 0.35
    setDragOffset(Math.max(-maxDrag, Math.min(maxDrag, deltaY)))
  }

  const finishGesture = (event) => {
    const gesture = gestureRef.current

    if (!gesture || gesture.pointerId !== event.pointerId) return

    const deltaY = event.clientY - gesture.startY
    const elapsed = Math.max(performance.now() - gesture.startTime, 1)
    const velocity = deltaY / elapsed
    const threshold = Math.max(80, feedHeight * 0.12)
    const shouldChange = Math.abs(deltaY) > threshold || Math.abs(velocity) > 0.45

    if (shouldChange) {
      onActiveIndexChange(clampIndex(activeIndex + (deltaY < 0 ? 1 : -1)))
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
          transform: `translate3d(0, ${-activeIndex * feedHeight + dragOffset}px, 0)`,
          transition: isDragging ? 'none' : 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {reels.map((reel, index) => renderReel(reel, index, 'mobile'))}
      </div>
    </section>
  )
}

export default MobileReelScroller
