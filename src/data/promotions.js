// Ana sayfadaki dört büyük kampanya kartı (2x2). Sıra: ürün / kadın, kadın / ürün (çapraz).
// title: fotoğrafın üzerindeki büyük başlık. cta: altındaki link yazısı.
// discount: yalnızca gerçekten uygulanan bir indirim varsa yaz (ör. 'Seçili parçalarda %20’ye varan indirim').
// Gerçekte olmayan bir indirimi göstermek yanıltıcı reklam sayılır.
export const promotions = [
  {
    id: 'kisiye-ozel',
    title: 'Sevdiklerinize kişiye özel hediyeler',
    cta: 'Şimdi alışveriş yapın',
    discount: null,
    image: '/jewelry/campaign/kisiye-ozel.jpg',
    to: '/koleksiyon',
  },
  {
    id: 'pirlanta',
    title: 'Pırlantanın en sade, en parlak hali',
    cta: 'Şimdi alışveriş yapın',
    discount: null,
    image: '/jewelry/campaign/pirlanta.jpg',
    to: '/koleksiyon?q=pırlanta',
  },
  {
    id: 'katmanli-kolyeler',
    title: 'Katmanlı kolyelerle kendi stilinizi yaratın',
    cta: 'Şimdi alışveriş yapın',
    discount: null,
    image: '/jewelry/campaign/katmanli-kolyeler.jpg',
    to: '/koleksiyon/kolyeler',
  },
  {
    id: 'yilbasi',
    title: 'Yılbaşı için ışıltılı hediyeler',
    cta: 'Şimdi alışveriş yapın',
    discount: null,
    image: '/jewelry/campaign/yilbasi.jpg',
    to: '/koleksiyon/yilbasi-susleri',
  },
]
