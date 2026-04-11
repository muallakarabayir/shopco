import React, { useState } from "react";
import { Text, View } from "react-native";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import ToggleButton from "./ToggleButton";

export default function TopSelling() {
  const { data: products } = useProducts();
  const [showAll, setShowAll] = useState(false);
  
  // Ürünleri dilimleme mantığı (4'ten 6'ya kadar olanları gösterir)
  const items = showAll ? (products ?? []) : (products?.slice(4, 6) ?? []);

  if (items.length === 0) return null;

  const rows: typeof items[] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <View className="pt-8">
      <Text 
        className="text-[24px] text-center uppercase mb-4 text-[#111827]"
        style={{ fontFamily: "IntegralCF-Bold" }}
      >
        Top Selling
      </Text>

      <View className="px-3 gap-y-3">
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row gap-x-3">
            {row.map((item) => (
              <View key={item.id} className="flex-1">
                <ProductCard product={item} />
              </View>
            ))}
          </View>
        ))}
      </View>

      <ToggleButton 
        showAll={showAll} 
        onToggle={() => setShowAll(!showAll)} 
      />
    </View>
  );
}