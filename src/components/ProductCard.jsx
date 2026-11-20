import { Link } from 'react-router'
import { formatPrice, getCategory } from '../data/products'
import { useStore } from '../store/store-context'
import Icon from './Icon'

export default function ProductCard({ product }) {
  const { favorites, toggleFavorite, addToCart } = useStore()
  const isFavorite = favorites.includes(product.id)
  const url = `/urun/${product.slug}`

  return (
    <article className="product-card">
      <div className="product-image">
        <Link className="product-image-link" to={url} tabIndex={-1} aria-hidden="true">
          <img src={product.images[0]} alt="" loading="lazy" />
        </Link>
        <button
          className={isFavorite ? 'favorite active' : 'favorite'}
          onClick={() => toggleFavorite(product)}
          aria-label={isFavorite ? `${product.name} favorilerden çıkar` : `${product.name} favorilere ekle`}
          aria-pressed={isFavorite}
        >
          <Icon name="heart" size={18} />
        </button>
        {product.sizes ? (
          <Link className="quick-add" to={url}>Seçenekleri gör</Link>
        ) : (
          <button className="quick-add" onClick={() => addToCart(product)}>Sepete ekle <span aria-hidden="true">＋</span></button>
        )}
      </div>
      <p className="product-category">{getCategory(product.category)?.name}</p>
      <h3><Link to={url}>{product.name}</Link></h3>
      <p className="price">{formatPrice(product.price)}</p>
    </article>
  )
}
