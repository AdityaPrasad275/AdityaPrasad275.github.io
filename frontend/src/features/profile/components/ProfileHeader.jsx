import profilePic from '../../../icons/profile-pic.webp'

function ProfileHeader({ identity, socialProof }) {
  return (
    <header className="px-1 py-4 sm:px-4 lg:px-[12%] lg:py-8">
      <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-10">
        <div className="flex justify-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-white/8 text-lg font-semibold tracking-[0.28em] text-white/90 shadow-[0_0_0_2px_rgba(255,255,255,0.15)] sm:h-32 sm:w-32 sm:shadow-[0_0_0_2.5px_rgba(255,255,255,0.15)] lg:h-40 lg:w-40 lg:text-2xl lg:shadow-[0_0_0_3px_rgba(255,255,255,0.15)]">
            <img
              src={profilePic}
              alt={identity.name}
              className="h-full w-full object-cover"
              width="640"
              height="640"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
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
