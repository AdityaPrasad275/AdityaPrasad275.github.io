import { useEffect, useRef, useState } from 'react'
import CommentSheet from './CommentSheet.jsx'
import ReelCard from './ReelCard.jsx'
import DesktopReelScroller from './DesktopReelScroller.jsx'
import MobileReelScroller from './MobileReelScroller.jsx'
import reels from '../data/reels.js'

const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL || window.location.origin

function getInitialReelIndex() {
  const currentPath = window.location.pathname
  const reelIndex = reels.findIndex((reel) => reel.canonicalUrl === currentPath)

  return reelIndex >= 0 ? reelIndex : 0
}

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

  let copied

  try {
    copied = document.execCommand('copy')
  } catch {
    copied = false
  }

  document.body.removeChild(textarea)
  return copied
}

function ReelFeed({ isActive, layout = 'mobile' }) {
  const [activeIndex, setActiveIndex] = useState(getInitialReelIndex)
  const [likedReels, setLikedReels] = useState({})
  const [openCommentsId, setOpenCommentsId] = useState(null)
  const [shareCopiedId, setShareCopiedId] = useState(null)
  const [endFeedMessageVisible, setEndFeedMessageVisible] = useState(false)
  const shareCopyTimerRef = useRef(null)
  const endFeedTimerRef = useRef(null)
  const landedOnHomeRef = useRef(window.location.pathname === '/')

  useEffect(() => {
    return () => {
      if (shareCopyTimerRef.current) window.clearTimeout(shareCopyTimerRef.current)
      if (endFeedTimerRef.current) window.clearTimeout(endFeedTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const activeReel = reels[activeIndex]

    if (!activeReel?.canonicalUrl) return
    if (landedOnHomeRef.current && activeIndex === 0) return

    window.history.replaceState(null, '', activeReel.canonicalUrl)
  }, [activeIndex])

  const clampIndex = (index) => Math.max(0, Math.min(reels.length - 1, index))

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

  const showEndFeedMessage = () => {
    if (endFeedTimerRef.current) window.clearTimeout(endFeedTimerRef.current)

    setEndFeedMessageVisible(true)
    endFeedTimerRef.current = window.setTimeout(() => {
      setEndFeedMessageVisible(false)
    }, 3000)
  }

  const openCommentsReel = reels.find((reel) => reel.id === openCommentsId)

  const renderReel = (reel, index, itemLayout) => (
    <ReelCard
      key={reel.id}
      reel={reel}
      index={index}
      total={reels.length}
      layout={itemLayout}
      liked={Boolean(likedReels[reel.id])}
      commentOpen={openCommentsId === reel.id}
      shareCopied={shareCopiedId === reel.id}
      onLike={() => toggleLike(reel.id)}
      onComment={() => openComments(reel.id)}
      onShare={() => handleShare(reel)}
      onStopPointerDown={(event) => event.stopPropagation()}
    />
  )

  return (
    <>
      {layout === 'desktop' ? (
        <DesktopReelScroller
          isActive={isActive}
          reels={reels}
          activeIndex={activeIndex}
          onActiveIndexChange={(nextIndex) => {
            setActiveIndex(clampIndex(nextIndex))
            setOpenCommentsId(null)
          }}
          renderReel={renderReel}
        />
      ) : (
        <MobileReelScroller
          isActive={isActive}
          reels={reels}
          activeIndex={activeIndex}
          onActiveIndexChange={(nextIndex) => {
            setActiveIndex(clampIndex(nextIndex))
            setOpenCommentsId(null)
          }}
          onAttemptNextBeyondEnd={showEndFeedMessage}
          renderReel={renderReel}
        />
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        <div className={`max-w-[92%] rounded-full border border-white/15 bg-black/85 px-4 py-2 text-center text-[0.78rem] font-medium uppercase tracking-[0.12em] text-white shadow-lg shadow-black/40 transition-all duration-200 ${
          endFeedMessageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          you have reached the end of instagram. self destructing in T-3 seconds
        </div>
      </div>

      {openCommentsReel ? (
        <CommentSheet
          layout={layout}
          reel={openCommentsReel}
          onClose={() => setOpenCommentsId(null)}
        />
      ) : null}
    </>
  )
}

export default ReelFeed
