# SHOP.CO — Wibesoft Frontend Case

React Native ile geliştirilmiş e-ticaret uygulaması.

## Ekranlar

- **Home** — Hero section, New Arrivals, Top Selling, Dress Style, Happy Customers
- **Shop** — Ürün listesi, arama, filtreleme, sayfalama
- **Product Detail** — Ürün detayı, renk/beden seçimi, sepete ekle
- **Cart** — Sepet yönetimi, promo kodu, sipariş özeti

## Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| React Native + Expo SDK 54 | Mobil uygulama |
| TypeScript | Tip güvenliği |
| Expo Router | File-based routing |
| TanStack Query v5 | API istekleri ve cache yönetimi |
| OpenAPI React Query Codegen | Otomatik tip üretimi |
| Zustand | Global state ve sepet yönetimi |
| NativeWind v2 (Tailwind CSS) | Stil yönetimi |
| DummyJSON API | Ürün verileri |

## Kurulum

### Gereksinimler

- Node.js 18+
- npm
- Expo Go uygulaması (iOS/Android)

### Adımlar

\`\`\`bash
# 1. Repoyu klonla
git clone https://github.com/muallakarabayir/shopco.git
cd shopco

# 2. Bağımlılıkları yükle
npm install --legacy-peer-deps

# 3. .env dosyası oluştur
echo "EXPO_PUBLIC_API_URL=https://dummyjson.com" > .env

# 4. Uygulamayı başlat
npx expo start
\`\`\`

### Expo Go ile Aç

- **iOS:** Kamerayı QR koda tut
- **Android:** Expo Go uygulamasından QR kodu tara

## Ortam Değişkenleri

\`\`\`
EXPO_PUBLIC_API_URL=https://dummyjson.com
\`\`\`

## OpenAPI React Query Codegen

\`openapi.yaml\` dosyasından otomatik tip üretimi:

\`\`\`bash
npx openapi-rq -i openapi.yaml -o generated
\`\`\`

Üretilen tipler \`generated/requests/types.gen.ts\` dosyasında, \`hooks/useProducts.ts\` içinde kullanılmaktadır.

## API Notu

Görevde belirtilen \`fakestoreapi.com\` API'si geliştirme sürecinde kararsız çalıştığı için \`dummyjson.com\` API'si kullanılmıştır. Bu durum görevli ile paylaşılmış ve onay alınmıştır. Veri yapısı \`mapProduct()\` fonksiyonu ile normalize edilerek \`Product\` tipine uygun hale getirilmiştir.

## Tipografi

Figma tasarımında kullanılan fontlar projeye entegre edilmiştir:

| Font | Figma'daki Kullanım | Projede Kullanım |
|------|---------------------|------------------|
| **Integral CF Bold** | Başlıklar (Hero, Section titles) | `assets/fonts/integral-cf-font-family/integralcf-bold.otf` |
| **Satoshi Variable** | Gövde metinleri, fiyat, açıklama | `assets/fonts/Satoshi-Variable.ttf` |

Fontlar \`app/_layout.tsx\` içinde \`expo-font\` ile yüklenmekte, tüm componentlerde \`fontFamily\` style prop'u ile uygulanmaktadır.

## Görseller

Figma tasarımında yer alan "Browse By Dress Style" bölümündeki kategori görselleri, tasarıma görsel olarak en yakın ücretsiz görseller seçilerek \`assets/images/\` klasörüne eklenmiştir:

| Kategori | Dosya |
|----------|-------|
| Casual | `assets/images/casual.png` |
| Formal | `assets/images/formal.png` |
| Party | `assets/images/party.png` |
| Gym | `assets/images/gym.png` |

Ödeme yöntemi ikonları (Visa, Mastercard, PayPal, Apple Pay, Google Pay) de aynı klasörde bulunmaktadır.

## Varsayımlar ve Bonus Özellikler

- Ürün fiyatlarına %40 indirim uygulandı (Figma tasarımına uygun)
- Promo kodu özelliği eklendi → `SHOP10` kodu ile %10 ek indirim
- Pagination (sayfalama) eklendi — 6 ürün/sayfa
- Arama modal'ı eklendi — header'daki arama ikonuna basınca açılır
- Fiyat aralığı ve dress style filtreleme eklendi
- Integral CF ve Satoshi fontları Figma'dan alınarak uygulandı
- NativeWind bazı durumlarda tam çalışmadığı için özel hex renkler ve dinamik değerler inline \`style\` ile yazıldı
- DrawerMenu, HappyCustomers carousel, YouMightAlsoLike gibi ek UI bileşenleri eklendi
