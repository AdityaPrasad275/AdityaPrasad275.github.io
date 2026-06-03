import BottomNav from '../components/BottomNav.jsx'

function MobileShell({ children }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  )
}

export default MobileShell
