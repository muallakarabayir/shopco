import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Modal, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterModal, { FilterState } from "../components/FilterModal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const ITEMS_PER_PAGE = 6;

export default function ProductListScreen() {
  const { data: products, isLoading, isError, refetch } = useProducts();
  const [search, setSearch] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = (products ?? []).filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesMinPrice = filters ? p.price >= filters.minPrice : true;
    const matchesMaxPrice = filters ? p.price <= filters.maxPrice : true;
    const matchesStyle = filters?.dressStyle
      ? p.category.toLowerCase().includes(filters.dressStyle.toLowerCase())
      : true;
    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesStyle;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const activeFilterCount = filters
    ? (filters.colors.length > 0 ? 1 : 0) +
      (filters.sizes.length > 0 ? 1 : 0) +
      (filters.dressStyle ? 1 : 0) +
      (filters.minPrice > 0 || filters.maxPrice < 500 ? 1 : 0)
    : 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header onSearchPress={() => setSearchVisible(true)} />

      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(f) => { setFilters(f); setCurrentPage(1); }}
      />

      {/* Search Modal */}
      <Modal visible={searchVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setSearchVisible(false)}>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-start", paddingTop: 60 }}>
            <TouchableWithoutFeedback>
              <View className="bg-white mx-4 rounded-2xl p-4">
                <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
                  <Feather name="search" size={16} color="#9ca3af" />
                  <TextInput
                    autoFocus
                    className="flex-1 ml-2 text-sm text-gray-700"
                    placeholder="Search for products..."
                    placeholderTextColor="#9ca3af"
                    value={search}
                    onChangeText={(t) => { setSearch(t); setCurrentPage(1); }}
                  />
                  {search.length > 0 && (
                    <Pressable onPress={() => setSearch("")}>
                      <Feather name="x" size={16} color="#9ca3af" />
                    </Pressable>
                  )}
                </View>
                <Pressable onPress={() => setSearchVisible(false)} className="mt-3 items-center">
                  <Text className="text-gray-500 text-sm">Close</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Title + Filter Button */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View>
          <Text className="text-2xl font-black tracking-tight">ALL PRODUCTS</Text>
          {filtered.length > 0 && (
            <Text className="text-gray-400 text-xs mt-0.5">
              Showing 1-{Math.min(ITEMS_PER_PAGE, filtered.length)} of {filtered.length} Products
            </Text>
          )}
        </View>

        <Pressable
          onPress={() => setFilterVisible(true)}
          className="relative"
          style={{ width: 32, height: 32, borderRadius: 62, borderWidth: 1, borderColor: "#e5e7eb", alignItems: "center", justifyContent: "center" }}
        >
          <Feather name="sliders" size={16} color="#000" />
          {activeFilterCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-black rounded-full w-4 h-4 items-center justify-center">
              <Text className="text-white text-[9px] font-bold">{activeFilterCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Active Filter Tags */}
      {filters && (filters.minPrice > 0 || filters.maxPrice < 500 || filters.dressStyle || search.length > 0) && (
        <View className="flex-row flex-wrap px-4 mb-2 gap-2">
          {(filters.minPrice > 0 || filters.maxPrice < 500) && (
            <View className="bg-gray-100 rounded-full px-3 py-1 flex-row items-center gap-1">
              <Text className="text-xs text-gray-700">${filters.minPrice} - ${filters.maxPrice}</Text>
              <Pressable onPress={() => setFilters({ ...filters, minPrice: 0, maxPrice: 500 })}>
                <Feather name="x" size={12} color="#6b7280" />
              </Pressable>
            </View>
          )}
          {filters.dressStyle && (
            <View className="bg-gray-100 rounded-full px-3 py-1 flex-row items-center gap-1">
              <Text className="text-xs text-gray-700">{filters.dressStyle}</Text>
              <Pressable onPress={() => setFilters({ ...filters, dressStyle: null })}>
                <Feather name="x" size={12} color="#6b7280" />
              </Pressable>
            </View>
          )}
          {search.length > 0 && (
            <View className="bg-gray-100 rounded-full px-3 py-1 flex-row items-center gap-1">
              <Text className="text-xs text-gray-700">"{search}"</Text>
              <Pressable onPress={() => setSearch("")}>
                <Feather name="x" size={12} color="#6b7280" />
              </Pressable>
            </View>
          )}
        </View>
      )}

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
          data={paginated}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
          columnWrapperStyle={{ gap: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => <ProductCard product={item} />}
          ListEmptyComponent={
            <View className="items-center justify-center py-16">
              <Feather name="search" size={48} color="#e5e7eb" />
              <Text className="text-gray-400 text-sm mt-4">No products found</Text>
              <Pressable onPress={() => { setFilters(null); setSearch(""); }} className="mt-4 bg-black px-6 py-2 rounded-full">
                <Text className="text-white text-sm font-semibold">Clear Filters</Text>
              </Pressable>
            </View>
          }
          ListFooterComponent={
            <View>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
              <Footer />
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
