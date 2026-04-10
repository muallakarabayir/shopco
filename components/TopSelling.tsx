import React, { useState } from "react";
import { Text, View } from "react-native";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import ToggleButton from "./ToggleButton";

export default function TopSelling() {
  const { data: products } = useProducts();
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? (products ?? []) : (products?.slice(4, 6) ?? []);

  if (items.length === 0) return null;

  const rows: typeof items[] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <View className="pt-8">
      <Text className="text-2xl font-black text-center uppercase tracking-tight mb-4">
        Top Selling
      </Text>
      <View style={{ paddingHorizontal: 12, gap: 12 }}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: "row", gap: 12 }}>
            {row.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </View>
        ))}
      </View>
      <ToggleButton showAll={showAll} onToggle={() => setShowAll(!showAll)} />
    </View>
  );
}
