import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { featureLink, navigation } from '../data/navigation'
import { useStore } from '../store/store-context'
import FadeImage from './FadeImage'
import Icon from './Icon'

// overlay: ana sayfada menü videonun üstünde şeffaf durur; fare gelince ya da panel açılınca beyaza döner.
export default function Header({ overlay = false }) {
  const { favorites, cartCount } = useStore()
  const navigate = useNavigate()
  const headerRef = useRef(null)
  const hoverTimer = useRef(null)
  const [openMenu, setOpenMenu] = useState(null)
  // Panel kapanırken içeriği kaybolmasın diye son açılan paneli tutuyoruz (yumuşak kapanış için).
  const [panelId, setPanelId] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const panel = navigation.find((item) => item.id === panelId && item.columns)
  const anythingOpen = Boolean(openMenu || mobileOpen || searchOpen)

  // Kayan alt çubuk: fare hangi başlıktaysa oraya kayar; fare yoksa açık panelin ya da bulunulan kategorinin altında durur.
  const { pathname } = useLocation()
  const navListRef = useRef(null)
  const [hoverId, setHoverId] = useState(null)
  const [bar, setBar] = useState({ left: 0, width: 0, visible: false, slide: false })
  const routeId = navigation.find((item) => item.to && pathname.startsWith(item.to))?.id
  const barTarget = hoverId ?? openMenu ?? routeId ?? null

  useLayoutEffect(() => {
    const place = () => {
      const el = barTarget && navListRef.current?.querySelector(`[data-nav-id="${barTarget}"]`)
      // Çubuk görünmüyorken yeni yerine kaymadan yerleşir; görünürken başlıklar arasında kayar.
      setBar((prev) => (el ? { left: el.offsetLeft, width: el.offsetWidth, visible: true, slide: prev.visible } : { ...prev, visible: false }))
    }
    place()
    // Menünün genişliği değişirse (pencere boyutu, kaydırma çubuğunun belirmesi) çubuğu yeniden konumla.
    const observer = new ResizeObserver(place)
    if (navListRef.current) observer.observe(navListRef.current)
    return () => observer.disconnect()
  }, [barTarget])

  const clearHoverTimer = () => clearTimeout(hoverTimer.current)
  useEffect(() => () => clearTimeout(hoverTimer.current), [])

  const showMenu = (id) => {
    clearHoverTimer()
    setSearchOpen(false)
    setPanelId(id)
    setOpenMenu(id)
  }

  const hideMenu = () => {
    clearHoverTimer()
    setOpenMenu(null)
  }

  // Fare üzerine gelince: panel zaten açıksa hemen geçiş yap, değilse kısa bir an bekle.
  const hoverMenu = (id) => {
    clearHoverTimer()
    if (openMenu) showMenu(id)
    else hoverTimer.current = setTimeout(() => showMenu(id), 120)
  }

  const closeAll = () => {
    hideMenu()
    setMobileOpen(false)
    setSearchOpen(false)
  }

  // Esc tuşu ya da menünün dışına tıklama her şeyi kapatır.
  useEffect(() => {
    if (!anythingOpen) return
    const close = () => {
      setOpenMenu(null)
      setMobileOpen(false)
      setSearchOpen(false)
    }
    const onKeyDown = (event) => event.key === 'Escape' && close()
    const onPointerDown = (event) => !headerRef.current?.contains(event.target) && close()
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [anythingOpen])

  // Tıklama paneli yalnızca açar: fareyle açılmış panele alışkanlıkla tıklamak onu kapatmasın.
  // Kapatma: fare menüden çıkınca, Esc tuşu ya da menü dışına tıklama.

  const toggleSearch = () => {
    hideMenu()
    setMobileOpen(false)
    setSearchOpen((open) => !open)
  }

  const submitSearch = (event) => {
    event.preventDefault()
    const term = query.trim()
    navigate(term ? `/koleksiyon?q=${encodeURIComponent(term)}` : '/koleksiyon')
    closeAll()
    setQuery('')
  }

  const headerClass = ['header', anythingOpen && 'is-open'].filter(Boolean).join(' ')

  return (
    <div className={overlay ? 'masthead is-overlay' : 'masthead'}>
      <header ref={headerRef} className={headerClass} onMouseLeave={hideMenu}>
        <div className="header-top">
          <div className="header-left">
            <button className="icon-button menu-button" onClick={() => { setSearchOpen(false); setMobileOpen(!mobileOpen) }} aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={mobileOpen}>
              <Icon name={mobileOpen ? 'close' : 'menu'} size={24} />
            </button>
            <button className="search-toggle" onClick={toggleSearch} aria-expanded={searchOpen} aria-label={searchOpen ? 'Aramayı kapat' : 'Ürün ara'}>
              <Icon name={searchOpen ? 'close' : 'search'} size={24} />
              <span aria-hidden="true">{searchOpen ? 'Kapat' : 'Ara'}</span>
            </button>
          </div>

          <Link className="brand" to="/" aria-label="Aurelia ana sayfa" onClick={closeAll}>
            <span>AURELIA</span>
            <small>ISTANBUL</small>
          </Link>

          <div className="header-right">
            <Link className="icon-button" to="/favoriler" onClick={closeAll} aria-label={`Favoriler, ${favorites.length} ürün`}>
              <Icon name="heart" size={24} />
              {favorites.length > 0 && <span className="count-badge">{favorites.length}</span>}
            </Link>
            <Link className="icon-button" to="/sepet" onClick={closeAll} aria-label={`Sepet, ${cartCount} ürün`}>
              <Icon name="bag" size={24} />
              {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>

        <nav className="main-nav" aria-label="Ana menü">
          <ul ref={navListRef} onMouseLeave={() => setHoverId(null)}>
            {navigation.map((item) => (
              <li key={item.id}>
                {item.columns ? (
                  <button
                    className="nav-item"
                    data-nav-id={item.id}
                    onClick={() => showMenu(item.id)}
                    onMouseEnter={() => { setHoverId(item.id); hoverMenu(item.id) }}
                    onMouseLeave={() => !openMenu && clearHoverTimer()}
                    aria-expanded={openMenu === item.id}
                    aria-controls="mega-menu"
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink className="nav-item" data-nav-id={item.id} to={item.to} onClick={closeAll} onMouseEnter={() => { setHoverId(item.id); hideMenu() }}>{item.label}</NavLink>
                )}
              </li>
            ))}
            <li className="nav-feature">
              <Link className="nav-item nav-feature-link" data-nav-id="feature" to={featureLink.to} onClick={closeAll} onMouseEnter={() => { setHoverId('feature'); hideMenu() }}>{featureLink.label}</Link>
            </li>
            <li
              role="presentation"
              aria-hidden="true"
              className={`nav-bar${bar.visible ? ' is-visible' : ''}${bar.slide ? ' is-sliding' : ''}`}
              style={{ width: bar.width, transform: `translateX(${bar.left}px)` }}
            />
          </ul>
        </nav>

        {panel && (
          <div className={openMenu ? 'mega-menu is-visible' : 'mega-menu'} id="mega-menu" aria-hidden={!openMenu}>
            <div className="mega-inner">
              <div className="mega-columns">
                {panel.columns.map((column) => (
                  <div key={column.title}>
                    <h3>{column.title}</h3>
                    <ul>
                      {column.links.map((link) => (
                        <li key={link.label}><Link to={link.to} onClick={closeAll}>{link.label}</Link></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mega-tiles">
                {panel.tiles.map((tile) => (
                  <Link className="mega-tile" key={tile.label} to={tile.to} onClick={closeAll}>
                    <FadeImage src={tile.image} alt="" loading="lazy" />
                    <span>{tile.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Mobil menü">
            {navigation.map((item) =>
              item.columns ? (
                <details key={item.id}>
                  <summary>{item.label}</summary>
                  {item.columns.map((column) => (
                    <div key={column.title} className="mobile-nav-group">
                      <p>{column.title}</p>
                      {column.links.map((link) => <Link key={link.label} to={link.to} onClick={closeAll}>{link.label}</Link>)}
                    </div>
                  ))}
                </details>
              ) : (
                <Link key={item.id} className="mobile-nav-link" to={item.to} onClick={closeAll}>{item.label}</Link>
              ),
            )}
            <Link className="mobile-nav-link mobile-nav-feature" to={featureLink.to} onClick={closeAll}>{featureLink.label}</Link>
          </nav>
        )}

        {searchOpen && (
          <form className="search-panel" onSubmit={submitSearch}>
            <label htmlFor="site-search">Mücevherinizi bulun</label>
            <input id="site-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Yüzük, kolye…" />
            <button type="submit">Ara</button>
          </form>
        )}
      </header>
    </div>
  )
}
