import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { featureLink, navigation } from '../data/navigation'
import { useStore } from '../store/store-context'
import Icon from './Icon'

// overlay: ana sayfada menü videonun üstünde şeffaf durur; fare gelince ya da panel açılınca beyaza döner.
export default function Header({ overlay = false }) {
  const { favorites, cartCount } = useStore()
  const navigate = useNavigate()
  const headerRef = useRef(null)
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const activePanel = navigation.find((item) => item.id === openMenu && item.columns)
  const anythingOpen = Boolean(openMenu || mobileOpen || searchOpen)

  const closeAll = () => {
    setOpenMenu(null)
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

  const toggleMenu = (id) => {
    setSearchOpen(false)
    setOpenMenu((current) => (current === id ? null : id))
  }

  const toggleSearch = () => {
    setOpenMenu(null)
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
      <div className="announcement">İstanbul içi ücretsiz teslimat <span>•</span> Özenle hazırlanmış her siparişte</div>

      <header ref={headerRef} className={headerClass} onMouseLeave={() => setOpenMenu(null)}>
        <div className="header-top">
          <div className="header-left">
            <button className="icon-button menu-button" onClick={() => { setSearchOpen(false); setMobileOpen(!mobileOpen) }} aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={mobileOpen}>
              <Icon name={mobileOpen ? 'close' : 'menu'} />
            </button>
            <button className="search-toggle" onClick={toggleSearch} aria-expanded={searchOpen} aria-label={searchOpen ? 'Aramayı kapat' : 'Ürün ara'}>
              <Icon name={searchOpen ? 'close' : 'search'} />
              <span aria-hidden="true">{searchOpen ? 'Kapat' : 'Ara'}</span>
            </button>
          </div>

          <Link className="brand" to="/" aria-label="Aurelia ana sayfa" onClick={closeAll}>
            <span>AURELIA</span>
            <small>ISTANBUL</small>
          </Link>

          <div className="header-right">
            <Link className="icon-button" to="/favoriler" onClick={closeAll} aria-label={`Favoriler, ${favorites.length} ürün`}>
              <Icon name="heart" />
              {favorites.length > 0 && <span className="count-badge">{favorites.length}</span>}
            </Link>
            <Link className="icon-button" to="/sepet" onClick={closeAll} aria-label={`Sepet, ${cartCount} ürün`}>
              <Icon name="bag" />
              {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>

        <nav className="main-nav" aria-label="Ana menü">
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                {item.columns ? (
                  <button className="nav-item" onClick={() => toggleMenu(item.id)} aria-expanded={openMenu === item.id} aria-controls="mega-menu">
                    {item.label}
                  </button>
                ) : (
                  <NavLink className="nav-item" to={item.to} onClick={closeAll}>{item.label}</NavLink>
                )}
              </li>
            ))}
            <li className="nav-feature"><Link to={featureLink.to} onClick={closeAll}>{featureLink.label}</Link></li>
          </ul>
        </nav>

        {activePanel && (
          <div className="mega-menu" id="mega-menu">
            <div className="mega-inner">
              <div className="mega-columns">
                {activePanel.columns.map((column) => (
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
                {activePanel.tiles.map((tile) => (
                  <Link className="mega-tile" key={tile.label} to={tile.to} onClick={closeAll}>
                    <img src={tile.image} alt="" loading="lazy" />
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
