import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { categories } from '../data/products'
import { useStore } from '../store/store-context'
import Icon from './Icon'

export default function Header() {
  const { favorites, cartCount } = useStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const closeMenu = () => setMenuOpen(false)

  const submitSearch = (event) => {
    event.preventDefault()
    const term = query.trim()
    navigate(term ? `/koleksiyon?q=${encodeURIComponent(term)}` : '/koleksiyon')
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <>
      <div className="announcement">İstanbul içi ücretsiz teslimat <span>•</span> Özenle hazırlanmış her siparişte</div>
      <header className="header">
        <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={menuOpen}>
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>

        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Ana menü">
          <NavLink to="/koleksiyon" end onClick={closeMenu}>Tümü</NavLink>
          {categories.map((category) => (
            <NavLink key={category.slug} to={`/koleksiyon/${category.slug}`} onClick={closeMenu}>{category.name}</NavLink>
          ))}
        </nav>

        <Link className="brand" to="/" aria-label="Aurelia ana sayfa" onClick={closeMenu}>
          <span>AURELIA</span>
          <small>ISTANBUL</small>
        </Link>

        <div className="header-actions">
          <button className="icon-button" onClick={() => setSearchOpen(!searchOpen)} aria-label={searchOpen ? 'Aramayı kapat' : 'Ürün ara'} aria-expanded={searchOpen}>
            <Icon name={searchOpen ? 'close' : 'search'} />
          </button>
          <Link className="icon-button" to="/favoriler" aria-label={`Favoriler, ${favorites.length} ürün`}>
            <Icon name="heart" />
            {favorites.length > 0 && <span className="count-badge">{favorites.length}</span>}
          </Link>
          <Link className="icon-button" to="/sepet" aria-label={`Sepet, ${cartCount} ürün`}>
            <Icon name="bag" />
            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          </Link>
        </div>

        {searchOpen && (
          <form className="search-panel" onSubmit={submitSearch}>
            <label htmlFor="site-search">Mücevherinizi bulun</label>
            <input id="site-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Yüzük, kolye…" />
            <button type="submit">Ara</button>
          </form>
        )}
      </header>
    </>
  )
}
