import { useState } from 'react'
import './App.css'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

const collections = [
  { name: 'Yüzükler', image: '/jewelry/ring.jpg' },
  { name: 'Kolyeler', image: '/jewelry/necklace.jpg' },
  { name: 'Küpe', image: '/jewelry/earrings.jpg' },
]

const products = [
  { id: 1, name: 'Işıltı Pırlanta Yüzük', category: 'Yüzükler', price: '₺48.500', image: '/jewelry/ring.jpg' },
  { id: 2, name: 'Zarif Pırlanta Kolye', category: 'Kolyeler', price: '₺36.900', image: '/jewelry/necklaceProduct.jpg' },
  { id: 3, name: 'Altın Halka Küpe', category: 'Küpe', price: '₺18.750', image: '/jewelry/earrings.jpg' },
  { id: 4, name: 'Eterno Bileklik', category: 'Bileklikler', price: '₺22.400', image: '/jewelry/bracelet.jpg' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [email, setEmail] = useState('')

  const toggleFavorite = (id) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const submitNewsletter = (event) => {
    event.preventDefault()
    if (email.trim()) setEmail('')
  }

  return (
    <div className="site">
      <div className="announcement">İstanbul içi ücretsiz teslimat</div>

      <header className="header">
        <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menüyü aç">
          <Icon name="menu" />
        </button>

        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Ana menü">
          <a href="#koleksiyonlar">Yeni Gelenler</a>
          <a href="#urunler">Yüzükler</a>
          <a href="#urunler">Kolyeler</a>
          <a href="#hikaye">Mücevher Rehberi</a>
        </nav>

        <a className="brand" href="#" aria-label="Aurelia ana sayfa">
          <span>AURELIA</span>
          <small>ISTANBUL</small>
        </a>

        <div className="header-actions">
          <button className="icon-button" aria-label="Ara"><Icon name="search" /></button>
          <button className="icon-button account-button" aria-label="Hesabım"><Icon name="user" /></button>
          <button className="icon-button" aria-label="Favoriler"><Icon name="heart" />{favorites.length > 0 && <span className="action-dot">{favorites.length}</span>}</button>
          <button className="icon-button" aria-label="Sepet"><Icon name="bag" /><span className="bag-count">{cartCount}</span></button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">YENİ KOLEKSİYON</p>
            <h1>Işığın en özel hali</h1>
            <p>Zamanın ötesine geçen tasarımlarla, hikâyenizi ışıltıyla anlatın.</p>
            <a className="hero-button" href="#urunler">Koleksiyonu Keşfet</a>
          </div>
        </section>

        <section className="collections section" id="koleksiyonlar">
          <div className="section-heading">
            <p className="eyebrow">KATEGORİLER</p>
            <h2>Öne Çıkan Koleksiyonlar</h2>
          </div>
          <div className="collection-grid">
            {collections.map((collection) => (
              <a className="collection-card" href="#urunler" key={collection.name}>
                <div className="collection-image">
                  <img src={collection.image} alt={collection.name} />
                </div>
                <h3>{collection.name}</h3>
                <span>Keşfet</span>
              </a>
            ))}
          </div>
        </section>

        <section className="products-section section" id="urunler">
          <div className="section-heading">
            <p className="eyebrow">AURELIA SEÇKİLERİ</p>
            <h2>Gözde Tasarımlar</h2>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <button
                    className={favorites.includes(product.id) ? 'favorite active' : 'favorite'}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label={`${product.name} favorilere ekle`}
                  >
                    <Icon name="heart" size={18} />
                  </button>
                  <button className="quick-add" onClick={() => setCartCount((count) => count + 1)}>Sepete Ekle</button>
                </div>
                <p className="product-category">{product.category}</p>
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="story" id="hikaye">
          <div className="story-image">
            <img src="/jewelry/story.jpg" alt="Aurelia mücevher ustası" />
          </div>
          <div className="story-content">
            <p className="eyebrow">USTALIĞIN İZİ</p>
            <h2>Nesilden nesile aktarılan bir sanat</h2>
            <p>Her parçamız; seçilmiş taşlar, ustaların elleri ve kusursuz işçilikle hayat buluyor. Bizim için mücevher sadece bir aksesuar değil, sizinle birlikte anlam kazanan bir miras.</p>
            <a className="text-link" href="#footer">Hikâyemizi keşfedin</a>
          </div>
        </section>

        <section className="newsletter">
          <p className="eyebrow">AURELIA DÜNYASI</p>
          <h2>Yeni koleksiyonlardan haberdar olun</h2>
          <form onSubmit={submitNewsletter}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="E-posta adresiniz"
              aria-label="E-posta adresiniz"
              required
            />
            <button type="submit">Üye Ol</button>
          </form>
        </section>
      </main>

      <footer className="footer" id="footer">
        <div className="footer-brand">
          <a className="brand footer-logo" href="#">
            <span>AURELIA</span>
            <small>ISTANBUL</small>
          </a>
          <p>Zarafetin kalıcı biçimi.</p>
        </div>
        <div className="footer-links">
          <div>
            <h3>Müşteri Hizmetleri</h3>
            <a href="#">İletişim</a>
            <a href="#">Teslimat & İade</a>
            <a href="#">Bakım & Onarım</a>
          </div>
          <div>
            <h3>Aurelia</h3>
            <a href="#">Hikâyemiz</a>
            <a href="#">Mağazalar</a>
            <a href="#">Kariyer</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Aurelia İstanbul</span>
          <div><a href="#">Gizlilik</a><a href="#">Kullanım Şartları</a></div>
        </div>
      </footer>
    </div>
  )
}

export default App