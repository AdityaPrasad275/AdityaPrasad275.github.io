import { useEffect, useRef, useState } from 'react'
import CommentSheet from './CommentSheet.jsx'
import ReelCard from './ReelCard.jsx'
import reels from '../data/reels.js'

const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL || window.location.origin

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      // fall through to the legacy copy path
    }
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.readOnly = true
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()

  let copied = false

  try {
    copied = document.execCommand('copy')
  } catch {
    copied = false
  }

  document.body.removeChild(textarea)
  return copied
}

function ReelFeed({ isActive }) {
  const [appHeight, setAppHeight] = useState(() =>
    window.visualViewport?.height ?? window.innerHeight,
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [likedReels, setLikedReels] = useState({})
  const [openCommentsId, setOpenCommentsId] = useState(null)
  const [shareCopiedId, setShareCopiedId] = useState(null)
  const gestureRef = useRef(null)
  const shareCopyTimerRef = useRef(null)

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

  useEffect(() => {
    return () => {
      if (shareCopyTimerRef.current) window.clearTimeout(shareCopyTimerRef.current)
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
      setOpenCommentsId(null)
    }

    setIsDragging(false)
    setDragOffset(0)
    gestureRef.current = null

    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const stopPointerDown = (event) => {
    event.stopPropagation()
  }

  const toggleLike = (reelId) => {
    setLikedReels((current) => ({
      ...current,
      [reelId]: !current[reelId],
    }))
  }

  const openComments = (reelId) => {
    setOpenCommentsId((current) => (current === reelId ? null : reelId))
  }

  const handleShare = async (reel) => {
    const shareUrl = new URL(reel.canonicalUrl ?? '/', WEBSITE_URL).href
    const copied = await copyText(shareUrl)

    if (copied) {
      setShareCopiedId(reel.id)

      if (shareCopyTimerRef.current) window.clearTimeout(shareCopyTimerRef.current)

      shareCopyTimerRef.current = window.setTimeout(() => {
        setShareCopiedId(null)
      }, 1400)
    }
  }

  const openCommentsReel = reels.find((reel) => reel.id === openCommentsId)

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
          <ReelCard
            key={reel.id}
            reel={reel}
            index={index}
            total={reels.length}
            liked={Boolean(likedReels[reel.id])}
            commentOpen={openCommentsId === reel.id}
            shareCopied={shareCopiedId === reel.id}
            onLike={() => toggleLike(reel.id)}
            onComment={() => openComments(reel.id)}
            onShare={() => handleShare(reel)}
            onStopPointerDown={stopPointerDown}
          />
        ))}
      </div>

      {openCommentsReel ? <CommentSheet reel={openCommentsReel} onClose={() => setOpenCommentsId(null)} /> : null}
    </section>
  )
}

export default ReelFeed
