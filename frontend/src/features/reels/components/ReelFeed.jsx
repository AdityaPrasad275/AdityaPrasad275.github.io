import { useEffect, useRef, useState } from 'react'
import CommentSheet from './CommentSheet.jsx'
import ReelCard from './ReelCard.jsx'
import DesktopReelScroller from './DesktopReelScroller.jsx'
import MobileReelScroller from './MobileReelScroller.jsx'
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

function ReelFeed({ isActive, layout = 'mobile' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [likedReels, setLikedReels] = useState({})
  const [openCommentsId, setOpenCommentsId] = useState(null)
  const [shareCopiedId, setShareCopiedId] = useState(null)
  const shareCopyTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (shareCopyTimerRef.current) window.clearTimeout(shareCopyTimerRef.current)
    }
  }, [])

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
          renderReel={renderReel}
        />
      )}

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
