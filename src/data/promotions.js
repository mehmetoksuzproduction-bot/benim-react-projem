// Ana sayfadaki dört kampanya kartı.
// discount: yalnızca gerçekten uygulanan bir indirim varsa yaz (ör. 'Seçili parçalarda %30’a varan indirim').
// Gerçekte olmayan bir indirimi göstermek yanıltıcı reklam sayılır.
export const promotions = [
  {
    id: 'kisiye-ozel',
    title: 'Kişiye özel hediyeler',
    discount: null,
    image: '/jewelry/promo-kisiye-ozel.jpg',
    to: '/koleksiyon',
  },
  {
    id: 'pirlanta',
    title: 'Pırlanta seçkisi',
    discount: null,
    image: '/jewelry/promo-pirlanta.jpg',
    to: '/koleksiyon?q=pırlanta',
  },
  {
    id: 'katmanli-kolyeler',
    title: 'Katmanlı kolyeler',
    discount: null,
    image: '/jewelry/promo-katmanli-kolyeler.jpg',
    to: '/koleksiyon/kolyeler',
  },
  {
    id: 'yilbasi',
    title: 'Yılbaşı hediyeleri',
    discount: null,
    image: '/jewelry/promo-yilbasi.jpg',
    to: '/koleksiyon/yilbasi-susleri',
  },
]
