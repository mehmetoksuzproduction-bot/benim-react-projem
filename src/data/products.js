export const categories = [
  { slug: 'yuzukler', name: 'Yüzükler', image: '/jewelry/ring.jpg' },
  { slug: 'kolyeler', name: 'Kolyeler', image: '/jewelry/necklace.jpg' },
  { slug: 'kupeler', name: 'Küpeler', image: '/jewelry/earrings.jpg' },
  { slug: 'bileklikler', name: 'Bileklikler', image: '/jewelry/bracelet.jpg' },
  // seasonal: mücevher değil; Mücevher menüsünde ve üst menüde görünmez, Hediyeler panelinde yer alır.
  {
    slug: 'yilbasi-susleri',
    name: 'Yılbaşı Süsleri',
    image: '/jewelry/snow-globe.jpg',
    seasonal: true,
    emptyMessage: 'Yılbaşı seçkimiz çok yakında burada.',
  },
]

export const jewelryCategories = categories.filter((category) => !category.seasonal)
export const seasonalCategory = categories.find((category) => category.seasonal)

export const materials = ['14K Sarı Altın', '14K Beyaz Altın', '925 Ayar Gümüş']

// Yeni ürün eklemek için bu listeye bir nesne eklemen yeterli.
// sizes yoksa ürün beden seçmeden doğrudan sepete eklenir.
export const products = [
  {
    id: 1,
    slug: 'isilti-pirlanta-yuzuk',
    name: 'Işıltı Pırlanta Yüzük',
    category: 'yuzukler',
    material: '14K Beyaz Altın',
    price: 48500,
    images: ['/jewelry/ring.jpg'],
    sizeLabel: 'Yüzük ölçüsü',
    sizes: ['48', '50', '52', '54', '56'],
    description: 'Tek taş pırlantanın ışığını öne çıkaran ince bir gövde. Her gün takılacak kadar sade, özel anlara eşlik edecek kadar göz alıcı.',
  },
  {
    id: 2,
    slug: 'zarif-pirlanta-kolye',
    name: 'Zarif Pırlanta Kolye',
    category: 'kolyeler',
    material: '14K Beyaz Altın',
    price: 36900,
    images: ['/jewelry/necklaceProduct.jpg', '/jewelry/necklace.jpg'],
    sizeLabel: 'Zincir uzunluğu',
    sizes: ['40 cm', '45 cm'],
    description: 'Boyun çizgisine yumuşakça oturan ince zincir ve tek pırlanta. Tek başına ya da diğer kolyelerle katmanlı takılabilir.',
  },
  {
    id: 3,
    slug: 'altin-halka-kupe',
    name: 'Altın Halka Küpe',
    category: 'kupeler',
    material: '14K Sarı Altın',
    price: 18750,
    images: ['/jewelry/earrings.jpg'],
    description: 'Hafif ve zamansız bir halka. Sabahtan akşama, her kombine uyum sağlar.',
  },
  {
    id: 4,
    slug: 'eterno-bileklik',
    name: 'Eterno Bileklik',
    category: 'bileklikler',
    material: '14K Sarı Altın',
    price: 22400,
    images: ['/jewelry/bracelet.jpg'],
    sizeLabel: 'Uzunluk',
    sizes: ['16 cm', '18 cm'],
    description: 'Bileğe zarif bir ışıltı katan ince zincir bileklik. Diğer bilekliklerle üst üste takmak için ideal.',
  },
]

export const getProduct = (slug) => products.find((product) => product.slug === slug)
export const getCategory = (slug) => categories.find((category) => category.slug === slug)

export const formatPrice = (price) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price)

// Aramada "altin" yazan da "Altın"ı bulsun diye Türkçe harfleri sadeleştirir.
const plainLetters = { ı: 'i', ş: 's', ğ: 'g', ü: 'u', ö: 'o', ç: 'c' }
export const normalize = (text) => text.toLocaleLowerCase('tr-TR').replace(/[ışğüöç]/g, (letter) => plainLetters[letter])
