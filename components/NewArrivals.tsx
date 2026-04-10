import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function NewArrivals() {
  const { data: products } = useProducts();
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? (products ?? []) : (products?.slice(0, 2) ?? []);

  if (items.length === 0) return null;

  return (
    <View className="pt-8">
      <Text className="text-2xl font-black text-center uppercase tracking-tight mb-4">
        New Arrivals
      </Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
      <Pressable
        onPress={() => setShowAll(!showAll)}
        className="border border-gray-300 rounded-full py-3 items-center mt-4 mx-4"
      >
        <Text className="text-gray-800 font-semibold text-sm">
          {showAll ? "Show Less" : "View All"}
        </Text>
      </Pressable>
    </View>
  );
}
