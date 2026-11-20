import { Link } from 'react-router'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { useStore } from '../store/store-context'

export default function Favorites() {
  const { favorites } = useStore()
  const items = products.filter((product) => favorites.includes(product.id))

  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">FAVORİLER</p>
        <h1>Beğendikleriniz</h1>
      </div>
      {items.length > 0 ? (
        <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <p className="empty-state">Henüz favori ürününüz yok. <Link className="text-link" to="/koleksiyon">Koleksiyonu keşfedin</Link></p>
      )}
    </section>
  )
}
