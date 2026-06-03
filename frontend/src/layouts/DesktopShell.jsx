import SideNav from '../components/SideNav.jsx'

function DesktopShell({ children }) {
  return (
    <div className="grid h-full grid-cols-[5.25rem_minmax(0,1fr)] bg-black text-white">
      <SideNav />

      <main className="relative min-w-0 overflow-hidden bg-black">
        {children}
      </main>
    </div>
  )
}

export default DesktopShell
