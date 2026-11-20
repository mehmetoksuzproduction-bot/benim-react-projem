import { useState } from 'react'
import { Link } from 'react-router'
import { categories, formatPrice } from '../data/products'
import { useStore } from '../store/store-context'
import Icon from './Icon'

// Yalnızca gerçekten var olan sayfalara link verilir.
// SSS, kargo, iade, gizlilik gibi sayfalar eklendiğinde buraya yeni sütun/link olarak eklenebilir.
const columns = [
  {
    title: 'Koleksiyonlar',
    links: [{ label: 'Tüm mücevherler', to: '/koleksiyon' }, ...categories.map((category) => ({ label: category.name, to: `/koleksiyon/${category.slug}` }))],
  },
  {
    title: 'Alışveriş',
    links: [
      { label: `${formatPrice(20000)} altı hediyeler`, to: '/koleksiyon?fiyat=20000' },
      { label: 'Favorilerim', to: '/favoriler' },
      { label: 'Sepetim', to: '/sepet' },
    ],
  },
  {
    title: 'Aurelia Hakkında',
    links: [
      { label: 'Aurelia Dünyası', to: '/#aurelia-dunyasi' },
      { label: 'Bize ulaşın', href: 'mailto:merhaba@aurelia.istanbul' },
    ],
  },
]

export default function Footer() {
  const { notify } = useStore()
  const [email, setEmail] = useState('')

  const subscribe = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    notify('Aurelia dünyasına hoş geldiniz. Yeni koleksiyonlardan ilk siz haberdar olacaksınız.')
    setEmail('')
  }

  return (
    <footer className="site-footer">
      <section className="footer-band">
        <div>
          <h2>Altın, gümüş ve doğal taşlar</h2>
          <Link to="/koleksiyon">Mücevherleri inceleyin</Link>
        </div>
        <p>Her parçamızda kullandığımız malzemeyi açıkça belirtiyoruz: 14 ayar sarı ve beyaz altın, 925 ayar gümüş, pırlanta, zümrüt, safir ve inci. Ne taktığınızı bilmenizi, yıllarca severek takmanızı istiyoruz.</p>
      </section>

      <div className="footer-main">
        <div className="footer-logo-block">
          <Link className="brand footer-logo" to="/"><span>AURELIA</span><small>ISTANBUL</small></Link>
          <p>Zarafetin kalıcı biçimi.</p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} className="footer-column" aria-label={column.title}>
            <h3>{column.title}</h3>
            {column.links.map((link) =>
              link.href ? <a key={link.label} href={link.href}>{link.label}</a> : <Link key={link.label} to={link.to}>{link.label}</Link>,
            )}
          </nav>
        ))}
      </div>

      <div className="footer-newsletter">
        <div>
          <h3><span>AURELIA</span> Bültenine katılın</h3>
          <p>Yeni koleksiyonlardan, sezonun seçkilerinden ve size özel notlarımızdan ilk siz haberdar olun.</p>
        </div>
        <form onSubmit={subscribe}>
          <label className="sr-only" htmlFor="footer-email">E-posta adresiniz</label>
          <input id="footer-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="E-posta adresiniz" required />
          <button type="submit">Şimdi katılın</button>
        </form>
      </div>

      <div className="footer-bar">
        <span className="footer-locale"><Icon name="globe" size={16} /> Ülke ve dil: Türkiye (₺ TRY) | Türkçe</span>
        <span>© 2026 Aurelia İstanbul</span>
      </div>
    </footer>
  )
}
