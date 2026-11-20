import { categories, formatPrice, materials, products } from './products'

// columns olan başlıklar tıklanınca geniş panel açar, to olanlar doğrudan sayfaya gider.
export const navigation = [
  {
    id: 'hediyeler',
    label: 'Hediyeler',
    columns: [
      {
        title: 'Bütçeye göre',
        links: [
          { label: `${formatPrice(20000)} ve altı`, to: '/koleksiyon?fiyat=20000' },
          { label: `${formatPrice(40000)} ve altı`, to: '/koleksiyon?fiyat=40000' },
          { label: 'Tüm hediyeler', to: '/koleksiyon' },
        ],
      },
      {
        title: 'Kategoriye göre',
        links: categories.map((category) => ({ label: category.name, to: `/koleksiyon/${category.slug}` })),
      },
    ],
    tiles: products.slice(0, 4).map((product) => ({ label: product.name, to: `/urun/${product.slug}`, image: product.images[0] })),
  },
  {
    id: 'mucevher',
    label: 'Mücevher',
    columns: [
      {
        title: 'Kategoriler',
        links: [
          { label: 'Tüm mücevherler', to: '/koleksiyon' },
          ...categories.map((category) => ({ label: category.name, to: `/koleksiyon/${category.slug}` })),
        ],
      },
      {
        title: 'Malzeme',
        links: materials.map((material) => ({ label: material, to: `/koleksiyon?malzeme=${encodeURIComponent(material)}` })),
      },
    ],
    tiles: categories.map((category) => ({ label: category.name, to: `/koleksiyon/${category.slug}`, image: category.image })),
  },
  ...categories.map((category) => ({ id: category.slug, label: category.name, to: `/koleksiyon/${category.slug}` })),
]

export const featureLink = { label: 'Aurelia Dünyası', to: '/#hikaye' }
