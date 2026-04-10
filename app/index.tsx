import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterModal, { FilterState } from "../components/FilterModal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function ProductListScreen() {
  const { data: products, isLoading, isError, refetch } = useProducts();
  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState | null>(null);

  const filtered = products?.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const activeFilterCount = filters
    ? (filters.colors.length > 0 ? 1 : 0) +
      (filters.sizes.length > 0 ? 1 : 0) +
      (filters.dressStyle ? 1 : 0)
    : 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(f) => setFilters(f)}
      />

      <View className="mx-4 mt-3 mb-2 flex-row items-center gap-2">
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
          <Feather name="search" size={16} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-2 text-sm text-gray-700"
            placeholder="Search for products..."
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
            style={{ paddingVertical: 3 }}
          />
        </View>
        <Pressable
          onPress={() => setFilterVisible(true)}
          className="bg-gray-100 rounded-full w-10 h-10 items-center justify-center relative"
        >
          <Feather name="sliders" size={18} color="#000" />
          {activeFilterCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-black rounded-full w-4 h-4 items-center justify-center">
              <Text className="text-white text-[9px] font-bold">{activeFilterCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <View className="px-4 py-3">
        <Text className="text-2xl font-black tracking-tight">NEW ARRIVALS</Text>
      </View>

      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
          <Text className="mt-3 text-gray-500 text-sm">Loading products...</Text>
        </View>
      )}

      {isError && (
        <View className="flex-1 items-center justify-center px-8">
          <Feather name="wifi-off" size={48} color="#d1d5db" />
          <Text className="text-gray-800 font-bold text-lg mt-4 text-center">Something went wrong</Text>
          <Pressable onPress={() => refetch()} className="mt-5 bg-black px-6 py-3 rounded-full">
            <Text className="text-white font-semibold">Try Again</Text>
          </Pressable>
        </View>
      )}

      {!isLoading && !isError && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
          columnWrapperStyle={{ gap: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => <ProductCard product={item} />}
          ListFooterComponent={<Footer />}
        />
      )}
    </SafeAreaView>
  );
}
