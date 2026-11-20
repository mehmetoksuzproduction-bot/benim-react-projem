# Aurelia İstanbul

React 19 + Vite ile hazırlanmış mücevher mağazası.

## Komutlar

```bash
npm install      # bağımlılıkları kur
npm run dev      # geliştirme sunucusu
npm run build    # yayın için derle (dist/)
npm run lint     # kod kontrolü
```

## Yapı

```
src/
  data/products.js    Ürünler ve kategoriler (yeni ürün buraya eklenir)
  store/              Sepet, favoriler ve bildirimler (tarayıcıda saklanır)
  components/         Header, Footer, ProductCard, Toast, Layout
  pages/              Ana sayfa, Koleksiyon, Ürün, Favoriler, Sepet, 404
public/jewelry/       Ürün görselleri
```

## Sayfalar

| Adres | Sayfa |
| --- | --- |
| `/` | Ana sayfa |
| `/koleksiyon`, `/koleksiyon/yuzukler` | Koleksiyon (malzeme filtresi, fiyat sıralaması, arama `?q=`) |
| `/urun/:slug` | Ürün detay |
| `/favoriler`, `/sepet` | Favoriler, sepet |

Site birden fazla sayfa kullandığı için yayınlarken sunucunun bilinmeyen adresleri `index.html`'e yönlendirmesi gerekir (Vercel ve Netlify'da SPA ayarı).
