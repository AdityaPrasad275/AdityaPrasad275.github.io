function ReelMeta({ reel }) {
  const { content } = reel

  return (
    <div className="w-[15rem] shrink-0 space-y-3 text-white/82 xl:w-[16rem]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-xs font-semibold tracking-[0.26em] text-white/85">
          AP
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">Aditya Prasad</p>
        </div>
      </div>

      <p className="text-sm leading-6 text-white/78 break-words">{content.footerCaption ?? content.summary}</p>
    </div>
  )
}

export default ReelMeta
