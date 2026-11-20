import { Link } from 'react-router'
import { formatPrice } from '../data/products'
import { useStore } from '../store/store-context'

export default function Cart() {
  const { cartItems, cartTotal, updateQuantity } = useStore()

  return (
    <section className="section cart">
      <div className="section-heading">
        <p className="eyebrow">SEPET</p>
        <h1>Alışveriş sepetiniz</h1>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-state">Sepetiniz boş. <Link className="text-link" to="/koleksiyon">Alışverişe başlayın</Link></p>
      ) : (
        <div className="cart-layout">
          <ul className="cart-list">
            {cartItems.map(({ product, size, quantity }) => (
              <li key={`${product.id}-${size}`} className="cart-item">
                <Link to={`/urun/${product.slug}`}><img src={product.images[0]} alt="" /></Link>
                <div>
                  <h3><Link to={`/urun/${product.slug}`}>{product.name}</Link></h3>
                  <p>{product.material}{size && ` · ${product.sizeLabel}: ${size}`}</p>
                  <div className="quantity">
                    <button onClick={() => updateQuantity(product.id, size, quantity - 1)} aria-label={`${product.name} adedini azalt`}>−</button>
                    <span aria-label="Adet">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, size, quantity + 1)} aria-label={`${product.name} adedini artır`}>+</button>
                  </div>
                </div>
                <div className="cart-item-side">
                  <p>{formatPrice(product.price * quantity)}</p>
                  <button className="link-button" onClick={() => updateQuantity(product.id, size, 0)}>Kaldır</button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="cart-summary">
            <div><span>Ara toplam</span><strong>{formatPrice(cartTotal)}</strong></div>
            <button className="primary-button" disabled>Ödemeye geç</button>
            <small>Ödeme adımı yakında eklenecek.</small>
          </aside>
        </div>
      )}
    </section>
  )
}
