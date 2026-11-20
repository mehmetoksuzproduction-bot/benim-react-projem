import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import FadeImage from '../components/FadeImage'
import Icon from '../components/Icon'
import { categories } from '../data/products'
import { promotions } from '../data/promotions'
import { useStore } from '../store/store-context'

// Video: public/jewelry/hero.mp4. Dosya yoksa ya da açılamazsa hero.jpg kapak olarak görünür.
// Video her zaman sessizdir; ses açma düğmesi yoktur.
function HeroVideo() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  // ready: ilk kare hazır, video yumuşakça belirir. Öncesinde koyu zemin görünür (eski fotoğraf yanıp sönmez).
  const [ready, setReady] = useState(false)
  // fallback: video oynatılamazsa (dosya yok, tarayıcı engelledi) yedek fotoğraf gösterilir.
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    // Hareket azaltmayı seçen kullanıcılarda video kendiliğinden başlamaz, ilk karesi durağan görünür.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.play().catch(() => setFallback(true))
  }, [])

  const toggleVideo = () => {
    const video = videoRef.current
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  return (
    <section className="hero">
      {fallback && !ready && <img className="hero-fallback" src="/jewelry/hero.jpg" alt="" />}
      <video
        ref={videoRef}
        className={ready ? 'hero-video is-ready' : 'hero-video'}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedData={() => setReady(true)}
        onError={() => setFallback(true)}
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
        {/* Beş kategori tek sırada; telefonda parmakla kaydırılan şerit. */}
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

      {/* Dört kampanya kartı; içerik src/data/promotions.js dosyasından gelir. */}
      <section className="section promo-section" aria-label="Kampanyalar">
        <div className="promo-grid">
          {promotions.map((promo) => (
            <Link className="promo-card" to={promo.to} key={promo.id}>
              <div className="promo-image"><FadeImage src={promo.image} alt="" loading="lazy" /></div>
              <h3>{promo.title}</h3>
              {promo.discount && <p className="promo-discount">{promo.discount}</p>}
              <span className="promo-link">Keşfet <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
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
