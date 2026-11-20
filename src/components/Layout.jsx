import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Crosshair from './Crosshair'
import Footer from './Footer'
import Header from './Header'
import Toast from './Toast'

export default function Layout() {
  const { pathname, hash } = useLocation()

  // Sayfa değişince en üste dön; "/#aurelia-dunyasi" gibi linklerde ilgili bölüme kaydır.
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="site">
      <Header overlay={pathname === '/'} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toast />
      <Crosshair />
    </div>
  )
}
