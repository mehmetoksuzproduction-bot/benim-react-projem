import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/products'
import { useStore } from '../store/store-context'

// Video: public/jewelry/hero.mp4. Dosya yoksa ya da açılamazsa hero.jpg kapak olarak görünür.
// Video her zaman sessizdir; ses açma düğmesi yoktur.
function HeroVideo() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  // Düğme yalnızca video gerçekten yüklendiğinde görünür; dosya yoksa kapak fotoğrafı kalır.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    // Hareket azaltmayı seçen kullanıcılarda video kendiliğinden başlamaz.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.play().catch(() => {})
  }, [])

  const toggleVideo = () => {
    const video = videoRef.current
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  return (
    <section className="hero">
      <video
        ref={videoRef}
        className="hero-video"
        poster="/jewelry/hero.jpg"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedData={() => setReady(true)}
      >
        <source src="/jewelry/hero.mp4" type="video/mp4" />
      </video>

      <div className="hero-content">
        <h1>Işığın en özel hâli</h1>
        <Link className="hero-button" to="/koleksiyon">Alışverişe başla</Link>
      </div>

      {ready && (
        <button className="hero-toggle" onClick={toggleVideo} aria-label={playing ? 'Videoyu durdur' : 'Videoyu oynat'}>
          <Icon name={playing ? 'pause' : 'play'} size={16} />
        </button>
      )}
    </section>
  )
}

export default function Home() {
  const { notify } = useStore()
  const [email, setEmail] = useState('')

  const submitNewsletter = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    notify('Aurelia dünyasına hoş geldiniz. Yeni koleksiyonlardan ilk siz haberdar olacaksınız.')
    setEmail('')
  }

  return (
    <>
      <HeroVideo />

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">AURELIA’YI KEŞFEDİN</p>
          <h2>Size özel bir ışıltı</h2>
          <p>Her hikâyeye eşlik eden zamansız parçalar.</p>
        </div>
        <div className="collection-grid">
          {categories.map((category, index) => (
            <Link className="collection-card" to={`/koleksiyon/${category.slug}`} key={category.slug}>
              <div className="collection-image">
                <img src={category.image} alt={`${category.name} koleksiyonu`} loading="lazy" />
                <span className="collection-index">0{index + 1}</span>
              </div>
              <div className="collection-meta">
                <h3>{category.name}</h3>
                <span>Keşfet <span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section products-section">
        <div className="section-heading">
          <p className="eyebrow">AURELIA SEÇKİLERİ</p>
          <h2>Gözde tasarımlar</h2>
          <p>Kendiniz için ya da sevdiklerinize, unutulmayacak bir hediye.</p>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        <p className="section-action"><Link className="text-link" to="/koleksiyon">Tümünü gör <span aria-hidden="true">↗</span></Link></p>
      </section>

      <section className="story" id="hikaye">
        <div className="story-image"><img src="/jewelry/story.jpg" alt="Aurelia atölyesinde özenle işlenen mücevher" loading="lazy" /></div>
        <div className="story-content">
          <p className="eyebrow">USTALIĞIN İZİ</p>
          <h2>Nesilden nesile aktarılan bir sanat</h2>
          <p>Her parçamız; seçilmiş taşlar, ustaların elleri ve kusursuz işçilikle hayat buluyor. Bizim için mücevher yalnızca bir aksesuar değil, sizinle birlikte anlam kazanan bir miras.</p>
          <Link className="text-link" to="/koleksiyon">Koleksiyonu keşfedin <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="newsletter">
        <p className="eyebrow">AURELIA DÜNYASI</p>
        <h2>Güzelliğin küçük bir sırrı</h2>
        <p>Yeni koleksiyonları ve size özel notlarımızı ilk siz keşfedin.</p>
        <form onSubmit={submitNewsletter}>
          <label className="sr-only" htmlFor="newsletter-email">E-posta adresiniz</label>
          <input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="E-posta adresiniz" required />
          <button type="submit">Aramıza katıl <span aria-hidden="true">→</span></button>
        </form>
      </section>
    </>
  )
}
