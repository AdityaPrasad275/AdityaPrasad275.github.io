import { FileText } from 'lucide-react'
import { Heart, MessageCircle, Send } from 'lucide-react'
import gmailIcon from '../icons/icons8-gmail.svg'
import linkedinIcon from '../icons/icons8-linkedin.svg'
import resumeIcon from '../icons/resume-svgrepo-com.svg'

function SocialIcon({ type, className = 'block h-6 w-6 fill-current' }) {
  if (type === 'mail') {
    return <img src={gmailIcon} alt="Mail" className={className} />
  }

  if (type === 'resume') {
    return <img src={resumeIcon} alt="Resume" className={className} />
  }

  if (type === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 7 8.7c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.5 9.5 0 0 1 5.2 0c2-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1.1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.8 1 .8 2v2.6c0 .3.2.6.8.5A10 10 0 0 0 12 2Z" />
      </svg>
    )
  }

  if (type === 'linkedin') {
    return <img src={linkedinIcon} alt="LinkedIn" className={className} />
  }

  return <FileText aria-hidden="true" className={className} strokeWidth={1.9} />
}

function ActionIcon({ type, active = false }) {
  const common = { 'aria-hidden': true, size: 30, strokeWidth: 2, absoluteStrokeWidth: true }

  if (type === 'heart') return <Heart {...common} fill={active ? 'currentColor' : 'none'} />
  if (type === 'comment') return <MessageCircle {...common} />
  if (type === 'share') return <Send {...common} />
  return <Heart {...common} />
}


export {SocialIcon, ActionIcon}

