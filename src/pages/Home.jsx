import { useState } from 'react'
import { Link } from 'react-router'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/products'
import { useStore } from '../store/store-context'

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
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">YENİ KOLEKSİYON · 2026</p>
          <h1>Işığın en özel hâli</h1>
          <p>Zamanın ötesine geçen tasarımlarla, hikâyenizi ışıltıyla anlatın.</p>
          <Link className="hero-button" to="/koleksiyon">Koleksiyonu keşfet <span aria-hidden="true">↗</span></Link>
        </div>
        <span className="hero-caption">Her anınıza eşlik eden bir ışıltı</span>
      </section>

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
