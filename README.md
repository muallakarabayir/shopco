
## OpenAPI React Query Codegen

Bu projede `@7nohe/openapi-react-query-codegen` kullanılarak DummyJSON API için otomatik tip üretimi yapılmıştır.

### Nasıl çalışır?

1. `openapi.yaml` dosyasında API endpoint'leri ve şemaları tanımlandı
2. Codegen çalıştırıldı:

\`\`\`bash
npx openapi-rq -i openapi.yaml -o generated
\`\`\`

3. `generated/requests/types.gen.ts` dosyasında otomatik üretilen tipler (`Product`, `GetProductsData` vs.) `hooks/useProducts.ts` içinde kullanıldı

### Codegen'i yeniden çalıştırmak için:

\`\`\`bash
npx openapi-rq -i openapi.yaml -o generated
\`\`\`

## API Notu

Görevde belirtilen `fakestoreapi.com` API'si geliştirme sürecinde kararsız çalıştığı için `dummyjson.com` API'si kullanılmıştır. Bu durum görevli ile paylaşılmış ve onay alınmıştır. Veri yapısı `mapProduct()` fonksiyonu ile normalize edilerek projedeki `Product` tipine uygun hale getirilmiştir.

## Ortam Değişkenleri

Projeyi çalıştırmak için root dizininde `.env` dosyası oluşturun:
EXPO_PUBLIC_API_URL=https://dummyjson.com

## Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Expo Go uygulaması (iOS/Android) veya iOS/Android Simulator

### Adımlar

1. Repoyu klonla:
git clone https://github.com/muallakarabayir/shopco.git
cd shopco

2. Bağımlılıkları yükle:
npm install --legacy-peer-deps

3. `.env` dosyası oluştur:
EXPO_PUBLIC_API_URL=https://dummyjson.com

4. Uygulamayı başlat:
npx expo start

5. Expo Go ile aç:
   - iOS: Kamerayı QR koda tut
   - Android: Expo Go uygulamasından QR kodu tara

## Kullanılan Teknolojiler

- **Expo SDK 54** + React Native + TypeScript
- **Expo Router** — File-based routing
- **TanStack Query v5** — API istekleri ve cache yönetimi
- **OpenAPI React Query Codegen** — Otomatik tip ve client üretimi
- **Zustand** — Global state ve sepet yönetimi
- **NativeWind v2** — Tailwind CSS ile stil yönetimi
- **DummyJSON API** — Ürün verileri

## Varsayımlar ve Bonus Özellikler

- FakeStore API kararsız çalıştığı için DummyJSON API kullanıldı (görevli onayı alındı)
- Ürün fiyatlarına %40 indirim uygulandı (Figma tasarımına uygun)
- Promo kodu özelliği eklendi (SHOP10 → %10 ek indirim)
- Pagination (sayfalama) eklendi
- Arama ve filtreleme (fiyat aralığı, dress style) eklendi
- Integral CF ve Satoshi fontları Figma'dan alınarak uygulandı
- NativeWind bazı durumlarda tam çalışmadığı için özel renkler ve dinamik değerler inline style ile yazıldı
