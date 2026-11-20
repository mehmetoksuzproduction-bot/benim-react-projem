import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { formatPrice } from '../data/products'
import { useStore } from '../store/store-context'
import FadeImage from './FadeImage'
import Icon from './Icon'

// Malzemenin yanında görünen küçük renk karesi.
const materialColors = {
  '14K Sarı Altın': '#d9b768',
  '14K Beyaz Altın': '#dcdcd8',
  '925 Ayar Gümüş': '#c4c7cc',
}

// Yatay ürün şeridi. İlk sayfada tam kartlar + bir yarım kart görünür (devamı olduğu anlaşılsın).
// Oklar bir "sayfa" kaydırır (tam görünen kart sayısı kadar); son sayfa şeridin sonuna hizalanır, orada yarım kart kalmaz.
export default function ProductRail({ title, products }) {
  const { favorites, toggleFavorite } = useStore()
  const trackRef = useRef(null)
  const [progress, setProgress] = useState({ size: 1, offset: 0, start: true, end: true })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => {
      const max = track.scrollWidth - track.clientWidth
      const size = Math.min(1, track.clientWidth / track.scrollWidth)
      setProgress({ size, offset: max > 0 ? track.scrollLeft / max : 0, start: track.scrollLeft <= 1, end: track.scrollLeft >= max - 1 })
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => {
      track.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  // Sayfa başları: 0, perPage. kart, 2·perPage. kart ... ve en son şeridin sonu.
  // Şeridin sonuna bir sayfadan az kalıyorsa o ara sayfa atlanır; böylece son sayfada yarım kart kalmaz.
  const pageStarts = (track) => {
    const card = track.querySelector('.rail-card')
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const step = card.offsetWidth + gap
    const paddingLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0
    const perPage = Math.max(1, Math.floor((track.clientWidth - paddingLeft + gap) / step))
    const pageWidth = perPage * step
    const max = track.scrollWidth - track.clientWidth
    const starts = []
    for (let left = 0; left < max - 1; left += pageWidth) starts.push(left)
    if (starts.length > 1 && max - starts[starts.length - 1] < pageWidth) starts.pop()
    starts.push(max)
    return starts
  }

  const page = (direction) => {
    const track = trackRef.current
    const starts = pageStarts(track)
    // Şu anki sayfa: kaydırma konumuna en yakın sayfa başı.
    const current = starts.reduce((best, left, i) => (Math.abs(left - track.scrollLeft) < Math.abs(starts[best] - track.scrollLeft) ? i : best), 0)
    const target = starts[Math.min(starts.length - 1, Math.max(0, current + direction))]
    track.scrollTo({ left: target, behavior: 'smooth' })
  }

  const scrollable = !(progress.start && progress.end)

  return (
    <section className="rail" aria-label={title}>
      <h2 className="rail-title">{title}</h2>

      <div className="rail-track" ref={trackRef}>
        {products.map((product) => {
          const isFavorite = favorites.includes(product.id)
          const url = `/urun/${product.slug}`
          return (
            <article className="rail-card" key={product.id}>
              <Link className="rail-image" to={url} tabIndex={-1} aria-hidden="true">
                <FadeImage src={product.images[0]} alt="" loading="lazy" />
              </Link>
              {product.badge && <span className="rail-badge">{product.badge}</span>}
              <button
                className={isFavorite ? 'rail-favorite active' : 'rail-favorite'}
                onClick={() => toggleFavorite(product)}
                aria-label={isFavorite ? `${product.name} favorilerden çıkar` : `${product.name} favorilere ekle`}
                aria-pressed={isFavorite}
              >
                <Icon name="heart" size={20} />
              </button>
              <div className="rail-info">
                <h3><Link to={url}>{product.name}</Link></h3>
                <p className="rail-price">{formatPrice(product.price)}</p>
                <p className="rail-material">
                  <span className="rail-swatch" style={{ background: materialColors[product.material] ?? '#ccc' }} aria-hidden="true" />
                  {product.material}
                </p>
              </div>
            </article>
          )
        })}
      </div>

      {scrollable && (
        <div className="rail-controls">
          <button onClick={() => page(-1)} disabled={progress.start} aria-label="Önceki ürünler"><Icon name="chevron-left" size={18} /></button>
          <div className="rail-progress" aria-hidden="true">
            <span style={{ width: `${progress.size * 100}%`, left: `${progress.offset * (1 - progress.size) * 100}%` }} />
          </div>
          <button onClick={() => page(1)} disabled={progress.end} aria-label="Sonraki ürünler"><Icon name="chevron-right" size={18} /></button>
        </div>
      )}
    </section>
  )
}
