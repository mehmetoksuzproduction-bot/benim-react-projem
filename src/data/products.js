export const categories = [
  { slug: 'yuzukler', name: 'Yüzükler', image: '/jewelry/categories/yuzukler.jpg' },
  { slug: 'kolyeler', name: 'Kolyeler', image: '/jewelry/categories/kolyeler.jpg' },
  { slug: 'kupeler', name: 'Küpeler', image: '/jewelry/categories/kupeler.jpg' },
  { slug: 'bileklikler', name: 'Bileklikler', image: '/jewelry/categories/bileklikler.jpg' },
  // seasonal: mücevher olmayan kategori (yılbaşı süsü, hediye kutusu); Mücevher menüsünde ve üst menüde görünmez,
  // Hediyeler panelinde yer alır. Hediyeler panelinin ilk görselli kutusu, listedeki ilk seasonal kategoridir.
  {
    slug: 'yilbasi-susleri',
    name: 'Yılbaşı Süsleri',
    image: '/jewelry/categories/yilbasi-susleri.jpg',
    seasonal: true,
    emptyMessage: 'Yılbaşı seçkimiz çok yakında burada.',
  },
  {
    slug: 'hediye-kutulari',
    name: 'Hediye Kutuları',
    image: '/jewelry/categories/hediye-kutulari.jpg',
    seasonal: true,
    emptyMessage: 'Hediye kutusu seçkimiz çok yakında burada.',
  },
]

export const jewelryCategories = categories.filter((category) => !category.seasonal)
export const seasonalCategory = categories.find((category) => category.seasonal)

export const materials = ['14K Sarı Altın', '14K Beyaz Altın', '925 Ayar Gümüş']

const ringSizes = { sizeLabel: 'Yüzük ölçüsü', sizes: ['48', '50', '52', '54', '56'] }
const necklaceSizes = { sizeLabel: 'Zincir uzunluğu', sizes: ['40 cm', '45 cm'] }
const braceletSizes = { sizeLabel: 'Uzunluk', sizes: ['16 cm', '18 cm'] }

// Yeni ürün eklemek için bu listeye bir nesne eklemen yeterli.
// images[0]: açık gri zeminli ürün fotoğrafı (kartlarda görünür); sonrakiler ürün sayfasındaki galeriye eklenir.
// sizes yoksa ürün beden seçmeden doğrudan sepete eklenir. badge: kartın sol üstündeki etiket (isteğe bağlı).
// Not: 5–11 numaralı ürünler test amaçlıdır.
export const products = [
  {
    id: 1,
    slug: 'isilti-pirlanta-yuzuk',
    name: 'Işıltı Pırlanta Yüzük',
    category: 'yuzukler',
    material: '14K Beyaz Altın',
    price: 48500,
    images: ['/jewelry/products/isilti-pirlanta-yuzuk.jpg', '/jewelry/ring.jpg'],
    ...ringSizes,
    description: 'Tek taş pırlantanın ışığını öne çıkaran ince bir gövde. Her gün takılacak kadar sade, özel anlara eşlik edecek kadar göz alıcı.',
  },
  {
    id: 2,
    slug: 'zarif-pirlanta-kolye',
    name: 'Zarif Pırlanta Kolye',
    category: 'kolyeler',
    material: '14K Beyaz Altın',
    price: 36900,
    images: ['/jewelry/products/zarif-pirlanta-kolye.jpg', '/jewelry/necklaceProduct.jpg'],
    ...necklaceSizes,
    description: 'Boyun çizgisine yumuşakça oturan ince zincir ve tek pırlanta. Tek başına ya da diğer kolyelerle katmanlı takılabilir.',
  },
  {
    id: 3,
    slug: 'altin-halka-kupe',
    name: 'Altın Halka Küpe',
    category: 'kupeler',
    material: '14K Sarı Altın',
    price: 18750,
    images: ['/jewelry/products/altin-halka-kupe.jpg'],
    description: 'Hafif ve zamansız bir halka. Sabahtan akşama, her kombine uyum sağlar.',
  },
  {
    id: 4,
    slug: 'eterno-bileklik',
    name: 'Eterno Bileklik',
    category: 'bileklikler',
    material: '14K Sarı Altın',
    price: 22400,
    images: ['/jewelry/products/eterno-bileklik.jpg'],
    ...braceletSizes,
    description: 'Bileğe zarif bir ışıltı katan ince zincir bileklik. Diğer bilekliklerle üst üste takmak için ideal.',
  },
  {
    id: 5,
    slug: 'mini-halka-kupe',
    name: 'Mini Halka Küpe',
    category: 'kupeler',
    material: '14K Sarı Altın',
    price: 6900,
    images: ['/jewelry/products/mini-halka-kupe.jpg'],
    description: 'Kulağa tam oturan kalın, küçük halkalar. Tek başına ya da diğer küpelerle birlikte takılır.',
  },
  {
    id: 6,
    slug: 'damla-zumrut-kupe',
    name: 'Damla Zümrüt Küpe',
    category: 'kupeler',
    material: '14K Sarı Altın',
    price: 24500,
    images: ['/jewelry/products/damla-zumrut-kupe.jpg'],
    badge: 'Yeni',
    description: 'Minik bir pırlantanın altında sallanan damla zümrüt. Yüze renk ve hareket katar.',
  },
  {
    id: 7,
    slug: 'capraz-pirlanta-yuzuk',
    name: 'Çapraz Pırlanta Yüzük',
    category: 'yuzukler',
    material: '14K Sarı Altın',
    price: 32800,
    images: ['/jewelry/products/capraz-pirlanta-yuzuk.jpg'],
    ...ringSizes,
    description: 'Biri parlak, biri pırlanta dizili iki gövdenin zarif kesişimi.',
  },
  {
    id: 8,
    slug: 'ince-bant-yuzuk',
    name: 'İnce Bant Yüzük',
    category: 'yuzukler',
    material: '925 Ayar Gümüş',
    price: 3900,
    images: ['/jewelry/products/ince-bant-yuzuk.jpg'],
    ...ringSizes,
    description: 'Sade, ince ve her gün takılacak bir bant. Diğer yüzüklerle üst üste kombinlemek için ideal.',
  },
  {
    id: 9,
    slug: 'safir-damla-kolye',
    name: 'Safir Damla Kolye',
    category: 'kolyeler',
    material: '14K Sarı Altın',
    price: 27900,
    images: ['/jewelry/products/safir-damla-kolye.jpg'],
    ...necklaceSizes,
    badge: 'Yeni',
    description: 'Altın çerçeveli yuvarlak bir safir ve ince zincir. Derin mavisiyle zamansız bir ayrıntı.',
  },
  {
    id: 10,
    slug: 'inci-kolye',
    name: 'İnci Kolye',
    category: 'kolyeler',
    material: '14K Sarı Altın',
    price: 12400,
    images: ['/jewelry/products/inci-kolye.jpg'],
    ...necklaceSizes,
    description: 'İnce altın zincirde tek bir tatlı su incisi. Sade ve her zaman şık.',
  },
  {
    id: 11,
    slug: 'su-yolu-bileklik',
    name: 'Su Yolu Bileklik',
    category: 'bileklikler',
    material: '14K Beyaz Altın',
    price: 41500,
    images: ['/jewelry/products/su-yolu-bileklik.jpg'],
    ...braceletSizes,
    description: 'Kesintisiz dizilmiş yuvarlak pırlantalarla klasik bir su yolu bileklik.',
  },
]

export const getProduct = (slug) => products.find((product) => product.slug === slug)
export const getCategory = (slug) => categories.find((category) => category.slug === slug)

export const formatPrice = (price) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price)

// Aramada "altin" yazan da "Altın"ı bulsun diye Türkçe harfleri sadeleştirir.
const plainLetters = { ı: 'i', ş: 's', ğ: 'g', ü: 'u', ö: 'o', ç: 'c' }
export const normalize = (text) => text.toLocaleLowerCase('tr-TR').replace(/[ışğüöç]/g, (letter) => plainLetters[letter])
