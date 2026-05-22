import { useEffect, useRef } from 'react'

function DesktopReelScroller({ isActive, reels, activeIndex, onActiveIndexChange, renderReel }) {
  const scrollerRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleScroll = () => {
    if (rafRef.current) return

    rafRef.current = window.requestAnimationFrame(() => {
      const scroller = scrollerRef.current
      rafRef.current = null

      if (!scroller) return

      const pageHeight = scroller.clientHeight || 1
      const nextIndex = Math.max(0, Math.min(reels.length - 1, Math.round(scroller.scrollTop / pageHeight)))

      if (nextIndex !== activeIndex) {
        onActiveIndexChange(nextIndex)
      }
    })
  }

  return (
    <section
      aria-hidden={!isActive}
      className={`relative h-full min-h-0 overflow-hidden bg-black text-white transition-opacity duration-200 ${
        isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        ref={scrollerRef}
        className="h-full overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'y mandatory' }}
        onScroll={handleScroll}
      >
        {reels.map((reel, index) => renderReel(reel, index, 'desktop'))}
      </div>
    </section>
  )
}

export default DesktopReelScroller
