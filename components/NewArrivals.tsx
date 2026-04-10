import React, { useState } from "react";
import { Text, View } from "react-native";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import ToggleButton from "./ToggleButton";

export default function NewArrivals() {
  const { data: products } = useProducts();
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? (products ?? []) : (products?.slice(0, 2) ?? []);

  if (items.length === 0) return null;

  const rows: typeof items[] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <View className="pt-8">
      <Text style={{ fontFamily: "IntegralCF-Bold", fontSize: 24, textAlign: "center", textTransform: "uppercase", marginBottom: 16, color: "#111827" }}>
        New Arrivals
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
