import { Link } from 'react-router'
import { categories } from '../data/products'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <Link className="brand footer-logo" to="/"><span>AURELIA</span><small>ISTANBUL</small></Link>
        <p>Zarafetin kalıcı biçimi.</p>
      </div>
      <div className="footer-links">
        <div>
          <h3>KOLEKSİYONLAR</h3>
          {categories.map((category) => (
            <Link key={category.slug} to={`/koleksiyon/${category.slug}`}>{category.name}</Link>
          ))}
        </div>
        <div>
          <h3>AURELIA</h3>
          <Link to="/#hikaye">Hikâyemiz</Link>
          <a href="mailto:merhaba@aurelia.istanbul">Bize ulaşın</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Aurelia İstanbul</span>
      </div>
    </footer>
  )
}
