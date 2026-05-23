function ProfileHeader({ identity, socialProof }) {
  return (
    <header className="px-1 py-4 sm:px-4 lg:px-[12%] lg:py-8">
      <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-lg font-semibold tracking-[0.28em] text-white/90 sm:h-28 sm:w-28 lg:h-36 lg:w-36 lg:text-2xl">
            {identity.avatar.value}
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{identity.name}</h1>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/72 sm:gap-x-7 sm:text-base">
              {socialProof.map((item) => (
                <div key={item.label} className="whitespace-nowrap">
                  <span className="font-semibold text-white">{item.value}</span>{' '}
                  <span className="text-white/58">{item.label.toLowerCase()}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="hidden max-w-3xl text-sm leading-7 text-white/74 sm:block lg:text-base lg:leading-8">
            {identity.bio}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-white/74 sm:hidden">{identity.bio}</p>
    </header>
  )
}

export default ProfileHeader
