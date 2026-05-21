function ProfileScreen({ isActive }) {
  return (
    <section
      aria-hidden={!isActive}
      className={`fixed inset-0 bg-zinc-950 text-white transition-opacity duration-200 ${
        isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="flex h-full flex-col items-center justify-center gap-3 px-6 pb-20 text-center">
        <div className="h-20 w-20 rounded-full border border-white/15 bg-white/10" />
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="max-w-sm text-sm leading-6 text-white/70">
          This area is the profile shell. Next we can add stats, featured projects, and a grid.
        </p>
      </div>
    </section>
  )
}

export default ProfileScreen
