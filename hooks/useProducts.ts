import { useQuery } from "@tanstack/react-query";
import { Product } from "../types";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "https://dummyjson.com";

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/products?limit=20`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data.products.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.thumbnail,
        rating: { rate: p.rating, count: p.stock },
      }));
    },
  });

export const useProduct = (id: number) =>
  useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      const p = await res.json();
      return {
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.thumbnail,
        rating: { rate: p.rating, count: p.stock },
      };
    },
  });
