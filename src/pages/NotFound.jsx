import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">404</p>
        <h1>Aradığınız sayfa bulunamadı</h1>
        <p><Link className="text-link" to="/koleksiyon">Koleksiyona dönün</Link></p>
      </div>
    </section>
  )
}
