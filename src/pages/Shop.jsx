import { NavLink, useParams, useSearchParams } from 'react-router'
import ProductCard from '../components/ProductCard'
import { categories, formatPrice, getCategory, materials, normalize, products } from '../data/products'
import NotFound from './NotFound'

const sorters = {
  'fiyat-artan': (a, b) => a.price - b.price,
  'fiyat-azalan': (a, b) => b.price - a.price,
}

export default function Shop() {
  const { category: categorySlug } = useParams()
  const [params, setParams] = useSearchParams()
  const category = getCategory(categorySlug)
  const query = params.get('q') ?? ''
  const material = params.get('malzeme') ?? ''
  const sort = params.get('sirala') ?? ''
  const maxPrice = Number(params.get('fiyat')) || 0

  if (categorySlug && !category) return <NotFound />

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const results = products
    .filter((product) => !category || product.category === category.slug)
    .filter((product) => !material || product.material === material)
    .filter((product) => !maxPrice || product.price <= maxPrice)
    .filter((product) => !query || normalize(`${product.name} ${getCategory(product.category)?.name} ${product.material}`).includes(normalize(query)))
    .sort(sorters[sort] ?? (() => 0))

  return (
    <section className="section shop">
      <div className="section-heading">
        <p className="eyebrow">KOLEKSİYON</p>
        <h1>{category?.name ?? (query ? 'Arama sonuçları' : 'Tüm mücevherler')}</h1>
        {query && (
          <p>
            “{query}” için {results.length} parça bulundu.{' '}
            <button className="link-button" onClick={() => setParam('q', '')}>Aramayı temizle</button>
          </p>
        )}
        {maxPrice > 0 && (
          <p>
            {formatPrice(maxPrice)} ve altı.{' '}
            <button className="link-button" onClick={() => setParam('fiyat', '')}>Bütçe filtresini kaldır</button>
          </p>
        )}
      </div>

      <nav className="category-tabs" aria-label="Kategoriler">
        <NavLink to="/koleksiyon" end>Tümü</NavLink>
        {categories.map((item) => <NavLink key={item.slug} to={`/koleksiyon/${item.slug}`}>{item.name}</NavLink>)}
      </nav>

      <div className="shop-toolbar">
        <span>{results.length} ürün</span>
        <div className="filters">
          <label>
            <span className="sr-only">Malzeme</span>
            <select value={material} onChange={(event) => setParam('malzeme', event.target.value)}>
              <option value="">Tüm malzemeler</option>
              {materials.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Sırala</span>
            <select value={sort} onChange={(event) => setParam('sirala', event.target.value)}>
              <option value="">Önerilen</option>
              <option value="fiyat-artan">Fiyat: Düşükten yükseğe</option>
              <option value="fiyat-azalan">Fiyat: Yüksekten düşüğe</option>
            </select>
          </label>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="product-grid">{results.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <p className="empty-state">Seçiminizle eşleşen ürün bulunamadı. Filtreleri değiştirmeyi deneyin.</p>
      )}
    </section>
  )
}
