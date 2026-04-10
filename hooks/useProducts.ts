import { useQuery } from "@tanstack/react-query";
import { Product as GeneratedProduct } from "../generated/requests/types.gen";
import { Product } from "../types";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "https://dummyjson.com";

const mapProduct = (p: GeneratedProduct & { rating?: number; stock?: number; thumbnail?: string }): Product => ({
  id: p.id!,
  title: p.title!,
  price: p.price!,
  description: p.description!,
  category: p.category!,
  image: p.thumbnail!,
  rating: {
    rate: p.rating ?? 0,
    count: p.stock ?? 0,
  },
});

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/products?limit=20`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data.products.map(mapProduct);
    },
  });

export const useProduct = (id: number) =>
  useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      const p: GeneratedProduct = await res.json();
      return mapProduct(p);
    },
  });
