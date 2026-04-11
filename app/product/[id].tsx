import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import YouMightAlsoLike from "../../components/YouMightAlsoLike";
import { useProduct } from "../../hooks/useProducts";
import { useCartStore } from "../../store/cartStore";

const REVIEWS = [
  { name: "Samantha D.", rating: 5, text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. It's become my favorite go-to shirt.", date: "August 14, 2023" },
  { name: "Alex M.", rating: 4, text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. This t-shirt definitely gets a thumbs up from me.", date: "August 15, 2023" },
  { name: "Ethan R.", rating: 4, text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye and the fit is perfect.", date: "August 16, 2023" },
];

const COLORS = ["#4ade80", "#1f2937", "#3b82f6"];
const SIZES = ["Small", "Medium", "Large", "X-Large"];
const satoshi = { fontFamily: "Satoshi-Variable", fontWeight: "400" as const, fontSize: 14, lineHeight: 20, letterSpacing: 0 };

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: product, isLoading, isError } = useProduct(Number(id));
  const addToCart = useCartStore((s) => s.addToCart) as (product: any, quantity?: number) => void;
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faqs">("reviews");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setQuantity(1);
    setTimeout(() => setAdded(false), 1500);
  };

  const discountPct = 40;
  const originalPrice = product?.price ?? 0;
  const discountedPrice = (originalPrice * (1 - discountPct / 100)).toFixed(2);
  const visibleReviews = showAllReviews ? REVIEWS : REVIEWS.slice(0, 2);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <Header showBack />

      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

      {isError && (
        <View className="flex-1 items-center justify-center px-8">
          <Feather name="alert-circle" size={48} color="#d1d5db" />
          <Text style={{ ...satoshi, fontWeight: "700", color: "#111827", fontSize: 18, marginTop: 16, textAlign: "center" }}>Product not found</Text>
          <Pressable onPress={() => router.back()} className="mt-5 bg-black px-6 py-3 rounded-full">
            <Text style={{ ...satoshi, color: "white", fontWeight: "600" }}>Go Back</Text>
          </Pressable>
        </View>
      )}

      {!isLoading && !isError && product && (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row items-center px-4 py-2">
              <Pressable onPress={() => router.push("/home")}><Text style={{ ...satoshi, color: "#9ca3af" }}>Home</Text></Pressable>
              <Feather name="chevron-right" size={12} color="#9ca3af" />
              <Pressable onPress={() => router.push("/shop")}><Text style={{ ...satoshi, color: "#9ca3af" }}>Shop</Text></Pressable>
              <Feather name="chevron-right" size={12} color="#9ca3af" />
              <Text style={{ ...satoshi, fontWeight: "600", color: "#111827", textTransform: "capitalize" }}>{product.category}</Text>
            </View>

            <View className="mx-4 bg-gray-100 rounded-2xl items-center justify-center h-72">
              <Image source={{ uri: product.image }} className="w-56 h-64" resizeMode="contain" />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 px-4" contentContainerStyle={{ gap: 10 }}>
              {[0, 1, 2].map((i) => (
                <Pressable key={i} className={`w-20 h-20 rounded-xl bg-gray-100 items-center justify-center border-2 ${i === 0 ? "border-black" : "border-transparent"}`}>
                  <Image source={{ uri: product.image }} className="w-14 h-14" resizeMode="contain" />
                </Pressable>
              ))}
            </ScrollView>

            <View className="px-4 mt-4">
              {/* Ürün adı - IntegralCF */}
              <Text style={{ fontFamily: "IntegralCF-Bold", fontSize: 20, color: "#111827", textTransform: "uppercase", lineHeight: 24 }}>
                {product.title}
              </Text>

              <View className="flex-row items-center mt-2">
                <Text className="text-yellow-400 text-base">
                  {"★".repeat(Math.round(product.rating.rate))}
                  {"☆".repeat(5 - Math.round(product.rating.rate))}
                </Text>
                <Text style={{ ...satoshi, color: "#6b7280", marginLeft: 8 }}>{product.rating.rate}/5</Text>
              </View>

              <View className="flex-row items-center gap-3 mt-3">
                <Text style={{ fontFamily: "Satoshi-Variable", fontWeight: "700", fontSize: 24, color: "#111827" }}>${discountedPrice}</Text>
                <Text style={{ ...satoshi, fontSize: 18, color: "#9ca3af", textDecorationLine: "line-through" }}>${originalPrice.toFixed(2)}</Text>
                <View className="bg-red-100 px-2 py-0.5 rounded-full">
                  <Text style={{ ...satoshi, fontSize: 12, fontWeight: "700", color: "#ef4444" }}>-{discountPct}%</Text>
                </View>
              </View>

              <View className="mt-3 mb-2">
                <Text style={{ ...satoshi, color: "#4b5563", lineHeight: 22 }}>{product.description}</Text>
              </View>
              <View className="mt-4 border-t border-gray-100 pt-4">
                <Text style={{ ...satoshi, color: "#6b7280", marginBottom: 12 }}>Select Colors</Text>
                <View className="flex-row gap-3">
                  {COLORS.map((color, i) => (
                    <Pressable
                      key={color}
                      onPress={() => setSelectedColor(i)}
                      style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: color, alignItems: "center", justifyContent: "center", borderWidth: selectedColor === i ? 3 : 0, borderColor: "#000" }}
                    >
                      {selectedColor === i && <Feather name="check" size={16} color="#fff" />}
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="mt-4 border-t border-gray-100 pt-4 pb-6">
                <Text style={{ ...satoshi, color: "#6b7280", marginBottom: 16 }}>Choose Size</Text>
                <View className="flex-row" style={{ gap: 16 }}>
                  {SIZES.map((size) => (
                    <Pressable
                      key={size}
                      onPress={() => setSelectedSize(size)}
                      style={{ flex: 1, paddingVertical: 10, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: selectedSize === size ? "#000" : "#F0F0F0" }}
                    >
                      <Text style={{ ...satoshi, color: selectedSize === size ? "#fff" : "#374151" }}>
                        {size}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="border-t border-gray-100 pt-4 flex-row items-center gap-3">
                <View className="flex-row items-center bg-gray-100 rounded-full px-3" style={{ height: 48 }}>
                  <Pressable onPress={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 32, height: 48, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ ...satoshi, fontWeight: "700", fontSize: 18, color: "#374151" }}>−</Text>
                  </Pressable>
                  <View style={{ width: 28, alignItems: "center" }}>
                    <Text style={{ ...satoshi, fontWeight: "600", color: "#111827" }}>{quantity}</Text>
                  </View>
                  <Pressable onPress={() => setQuantity(quantity + 1)} style={{ width: 32, height: 48, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ ...satoshi, fontWeight: "700", fontSize: 18, color: "#374151" }}>+</Text>
                  </Pressable>
                </View>
                <Pressable
                  onPress={handleAddToCart}
                  className={`flex-1 rounded-full py-3 items-center ${added ? "bg-green-600" : "bg-black"}`}
                >
                  <Text style={{ ...satoshi, fontWeight: "600", color: "white" }}>
                    {added ? "✓ Added!" : "Add to Cart"}
                  </Text>
                </Pressable>
              </View>

              <View className="mt-6 border-t border-gray-100 pt-2 flex-row">
                {[
                  { key: "details", label: "Product Details" },
                  { key: "reviews", label: "Rating & Reviews" },
                  { key: "faqs", label: "FAQs" },
                ].map((tab) => (
                  <Pressable key={tab.key} onPress={() => setActiveTab(tab.key as any)} className="flex-1 items-center py-3">
                    <Text style={{ ...satoshi, fontWeight: activeTab === tab.key ? "600" : "400", color: activeTab === tab.key ? "#111827" : "#9ca3af" }}>
                      {tab.label}
                    </Text>
                    {activeTab === tab.key && <View className="h-0.5 bg-black w-full mt-2" />}
                  </Pressable>
                ))}
              </View>

              {activeTab === "details" && (
                <View className="py-4">
                  <Text style={{ ...satoshi, color: "#4b5563", lineHeight: 22 }}>{product.description}</Text>
                  <View className="mt-3 flex-row">
                    <View className="bg-gray-100 px-3 py-1 rounded-full">
                      <Text style={{ ...satoshi, fontSize: 12, color: "#4b5563", textTransform: "capitalize" }}>{product.category}</Text>
                    </View>
                  </View>
                </View>
              )}

              {activeTab === "reviews" && (
                <View className="py-4">
                  <View className="flex-row items-center justify-between mb-4">
                    <Text style={{ fontFamily: "Satoshi-Variable", fontWeight: "700", fontSize: 16, color: "#111827" }}>
                      All Reviews <Text style={{ fontWeight: "400", color: "#9ca3af" }}>({REVIEWS.length * 150})</Text>
                    </Text>
                    <Pressable className="bg-black px-4 py-2 rounded-full">
                      <Text style={{ ...satoshi, fontSize: 12, fontWeight: "600", color: "white" }}>Write a Review</Text>
                    </Pressable>
                  </View>
                  {visibleReviews.map((review, i) => (
                    <View key={i} className="mb-4 border border-gray-100 rounded-2xl p-4">
                      <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-yellow-400 text-sm">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</Text>
                        <Feather name="more-horizontal" size={16} color="#9ca3af" />
                      </View>
                      <View className="flex-row items-center gap-1 mb-2">
                        <Text style={{ ...satoshi, fontWeight: "700", color: "#111827" }}>{review.name}</Text>
                        <Feather name="check-circle" size={14} color="#22c55e" />
                      </View>
                      <Text style={{ ...satoshi, color: "#6b7280" }}>"{review.text}"</Text>
                      <Text style={{ ...satoshi, fontSize: 12, color: "#9ca3af", marginTop: 8 }}>Posted on {review.date}</Text>
                    </View>
                  ))}
                  {!showAllReviews && (
                    <Pressable onPress={() => setShowAllReviews(true)} className="border border-gray-200 rounded-full py-3 items-center mt-2">
                      <Text style={{ ...satoshi, fontWeight: "600", color: "#374151" }}>Load More Reviews</Text>
                    </Pressable>
                  )}
                </View>
              )}

              {activeTab === "faqs" && (
                <View className="py-4">
                  {["What is the return policy?", "How do I care for this product?", "Is this product available in other colors?"].map((faq) => (
                    <View key={faq} className="flex-row items-center justify-between py-4 border-b border-gray-100">
                      <Text style={{ ...satoshi, color: "#374151", flex: 1, paddingRight: 16 }}>{faq}</Text>
                      <Feather name="chevron-right" size={16} color="#9ca3af" />
                    </View>
                  ))}
                </View>
              )}
            </View>

            <YouMightAlsoLike currentId={Number(id)} />
            <Footer />
            
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}
