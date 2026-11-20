import { categories, formatPrice, jewelryCategories, materials, products, seasonalCategory } from './products'

const categoryLink = (category) => ({ label: category.name, to: `/koleksiyon/${category.slug}` })
const categoryTile = (category) => ({ ...categoryLink(category), image: category.image })

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
        links: categories.map(categoryLink),
      },
    ],
    // İlk kutu sezonun kategorisi (Yılbaşı Süsleri), kalanlar öne çıkan ürünler.
    tiles: [
      ...(seasonalCategory ? [categoryTile(seasonalCategory)] : []),
      ...products.map((product) => ({ label: product.name, to: `/urun/${product.slug}`, image: product.images[0] })),
    ].slice(0, 4),
  },
  {
    id: 'mucevher',
    label: 'Mücevher',
    columns: [
      {
        title: 'Kategoriler',
        links: [
          { label: 'Tüm mücevherler', to: '/koleksiyon' },
          ...jewelryCategories.map(categoryLink),
        ],
      },
      {
        title: 'Malzeme',
        links: materials.map((material) => ({ label: material, to: `/koleksiyon?malzeme=${encodeURIComponent(material)}` })),
      },
    ],
    tiles: jewelryCategories.map(categoryTile),
  },
  ...jewelryCategories.map((category) => ({ id: category.slug, ...categoryLink(category) })),
]

export const featureLink = { label: 'Aurelia Dünyası', to: '/#aurelia-dunyasi' }
