import { useState } from 'react'
import { Link, useParams } from 'react-router'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'
import { formatPrice, getCategory, getProduct, products } from '../data/products'
import { useStore } from '../store/store-context'
import NotFound from './NotFound'

export default function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFound />
  // key: başka bir ürüne geçince seçili beden ve görsel sıfırlansın.
  return <ProductDetail key={product.id} product={product} />
}

function ProductDetail({ product }) {
  const { favorites, toggleFavorite, addToCart } = useStore()
  const [size, setSize] = useState('')
  const [activeImage, setActiveImage] = useState(0)
  const category = getCategory(product.category)
  const isFavorite = favorites.includes(product.id)
  const needsSize = Boolean(product.sizes) && !size
  const related = products.filter((item) => item.id !== product.id).slice(0, 4)

  return (
    <>
      <section className="product-page">
        <nav className="breadcrumb" aria-label="Sayfa yolu">
          <Link to="/">Ana sayfa</Link> / <Link to={`/koleksiyon/${category.slug}`}>{category.name}</Link> / <span>{product.name}</span>
        </nav>

        <div className="product-layout">
          <div className="gallery">
            <div className="gallery-main"><img src={product.images[activeImage]} alt={product.name} /></div>
            {product.images.length > 1 && (
              <div className="gallery-thumbs">
                {product.images.map((image, index) => (
                  <button key={image} className={index === activeImage ? 'active' : ''} onClick={() => setActiveImage(index)} aria-label={`${index + 1}. görsel`} aria-pressed={index === activeImage}>
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <p className="eyebrow">{category.name.toLocaleUpperCase('tr-TR')}</p>
            <h1>{product.name}</h1>
            <p className="product-price">{formatPrice(product.price)}</p>
            <p className="product-material">{product.material}</p>
            <p className="product-description">{product.description}</p>

            {product.sizes && (
              <fieldset className="size-options">
                <legend>{product.sizeLabel}</legend>
                {product.sizes.map((option) => (
                  <label key={option} className={size === option ? 'selected' : ''}>
                    <input type="radio" name="size" value={option} checked={size === option} onChange={() => setSize(option)} />
                    {option}
                  </label>
                ))}
              </fieldset>
            )}

            <div className="product-actions">
              <button className="primary-button" disabled={needsSize} onClick={() => addToCart(product, size || null)}>
                {needsSize ? `${product.sizeLabel} seçin` : 'Sepete ekle'}
              </button>
              <button className={isFavorite ? 'outline-button active' : 'outline-button'} onClick={() => toggleFavorite(product)} aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'} aria-pressed={isFavorite}>
                <Icon name="heart" size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section products-section">
          <div className="section-heading"><h2>Bunları da beğenebilirsiniz</h2></div>
          <div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
        </section>
      )}
    </>
  )
}
