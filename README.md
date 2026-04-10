
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
