import { FileText, Heart, MessageCircle, Send } from 'lucide-react'

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

function ActionIcon({ type, active = false }) {
  const common = { 'aria-hidden': true, size: 24, strokeWidth: 2, absoluteStrokeWidth: true }

  if (type === 'heart') return <Heart {...common} fill={active ? 'currentColor' : 'none'} />
  if (type === 'comment') return <MessageCircle {...common} />
  if (type === 'share') return <Send {...common} />
  return <Heart {...common} />
}

export { ActionIcon, SocialIcon }
