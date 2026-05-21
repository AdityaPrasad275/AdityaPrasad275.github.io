import { useEffect, useRef, useState } from 'react'
import {
  FileText,
  Heart,
  Mail,
  MessageCircle,
  Send,
} from 'lucide-react'
import reels from '../data/reels.js'

function SocialIcon({ type }) {
  const common = { 'aria-hidden': true, size: 24, strokeWidth: 1.9, absoluteStrokeWidth: true }

  if (type === 'mail') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-[24px] w-[24px] fill-current">
        <path d="M4 6h16v12H4V6Zm8 6.1L5.9 7.5H18.1L12 12.1Zm-1 1.5L5.5 9.5v6.9h13V9.5L13 13.6a1.7 1.7 0 0 1-2 0Z" />
      </svg>
    )
  }
  if (type === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-[24px] w-[24px] fill-current">
        <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 7 8.7c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.5 9.5 0 0 1 5.2 0c2-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1.1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.8 1 .8 2v2.6c0 .3.2.6.8.5A10 10 0 0 0 12 2Z" />
      </svg>
    )
  }
  if (type === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-[24px] w-[24px] fill-current">
        <path d="M5.1 8.9h3.1V19H5.1V8.9Zm1.5-4.8a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Zm3.6 4.8h3v1.4h.1c.4-.8 1.5-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.9V19H17v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6v5h-3.1V8.9Z" />
      </svg>
    )
  }
  if (type === 'twitter') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-[24px] w-[24px] fill-current">
        <path d="M14 10.6 20.4 3h-1.5l-5.6 6.6L8.9 3H3.8l6.7 9.8L3.8 21h1.5l5.9-7 4.8 7h5.1L14 10.6Zm-2.1 2.5-.7-1L5.8 4.2h2.4l4.4 6.4.7 1 5.7 8.3h-2.4l-4.7-6.8Z" />
      </svg>
    )
  }
  return <FileText {...common} />
}

function ActionIcon({ type }) {
  const common = { 'aria-hidden': true, size: 24, strokeWidth: 2, absoluteStrokeWidth: true }

  if (type === 'heart') return <Heart {...common} />
  if (type === 'comment') return <MessageCircle {...common} />
  if (type === 'share') return <Send {...common} />
  return <Heart {...common} />
}

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

  const stopPointerDown = (event) => {
    event.stopPropagation()
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
            <div className="absolute inset-0 bg-black/28" />
            <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${reel.accent}22` }} />

            <div className="relative z-10 flex h-full w-full flex-col p-4 pb-20">
              <header className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                <span style={{ color: reel.accent }}>{reel.question}</span>
                <span>
                  {index + 1} / {reels.length}
                </span>
              </header>

              <div className="flex flex-1 items-center">
                <div className="max-w-[28rem] space-y-4">
                  <p className="text-xs uppercase tracking-[0.36em] text-white/55">{reel.kicker}</p>
                  <h2 className="text-4xl font-semibold leading-[0.95] sm:text-5xl">{reel.title}</h2>
                  <p className="max-w-[26rem] text-base leading-7 text-white/88 sm:text-lg">{reel.summary}</p>

                  {Array.isArray(reel.points) && reel.points.length > 0 ? (
                    <div className="space-y-2 pt-2">
                      {reel.points.map((point) => (
                        <p key={point} className="text-sm leading-6 text-white/82">
                          {point}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {reel.linkPrompt ? (
                    <p className="pt-3 text-sm font-medium uppercase tracking-[0.24em] text-white/55">
                      {reel.linkPrompt}
                    </p>
                  ) : null}

                  {Array.isArray(reel.links) && reel.links.length > 0 ? (
                    <div className="flex flex-wrap gap-3 pt-2">
                      {reel.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noreferrer' : undefined}
                          className="inline-flex h-8 w-8 items-center justify-center"
                          style={{ color: reel.accent }}
                          aria-label={link.label}
                          title={link.label}
                          onPointerDown={stopPointerDown}
                        >
                          <SocialIcon type={link.icon} />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-auto flex items-end justify-between gap-4 pb-[env(safe-area-inset-bottom)] pt-6">
                <div className="max-w-[72%] space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-xs font-semibold tracking-[0.26em] text-white/85">
                      AP
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold text-white">Aditya Prasad</p>
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-white/80">{reel.footerCaption ?? reel.summary}</p>
                </div>

                <div className="flex flex-col items-center gap-3 text-white/90">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center"
                    onPointerDown={stopPointerDown}
                    aria-label="Like"
                  >
                    <ActionIcon type="heart" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center"
                    onPointerDown={stopPointerDown}
                    aria-label="Comment"
                  >
                    <ActionIcon type="comment" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center"
                    onPointerDown={stopPointerDown}
                    aria-label="Share"
                  >
                    <ActionIcon type="share" />
                  </button>
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
