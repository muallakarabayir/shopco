import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItemCard from "../components/CartItemCard";
import Footer from "../components/Footer";
import { useCartStore } from "../store/cartStore";

const satoshi = { fontFamily: "Satoshi-Variable", fontWeight: "400" as const, fontSize: 14, lineHeight: 20, letterSpacing: 0 };

export default function CartScreen() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = totalPrice();
  const discount = subtotal * 0.2;
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount - promoDiscount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SHOP10") setPromoApplied(true);
  };

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.push("/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View>
        <View className="bg-black py-2 px-4">
          <Text className="text-white text-center text-xs">
            Sign up and get <Text className="font-bold">20% off</Text> to your first order.{" "}
            <Text className="font-bold underline">Sign Up Now</Text>
          </Text>
        </View>
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
          <Pressable onPress={handleBack}>
            <Feather name="arrow-left" size={22} color="#000" />
          </Pressable>
          <Text style={{ fontFamily: "IntegralCF-Bold", fontSize: 20, color: "#111827" }}>SHOP.CO</Text>
          <View style={{ width: 22 }} />
        </View>
      </View>

      {/* Breadcrumb */}
      <View className="flex-row items-center px-4 py-2">
        <Pressable onPress={() => router.push("/home")}>
          <Text style={{ ...satoshi, color: "#9ca3af" }}>Home</Text>
        </Pressable>
        <Feather name="chevron-right" size={12} color="#9ca3af" />
        <Text style={{ ...satoshi, fontWeight: "600", color: "#111827" }}>Cart</Text>
      </View>

      {/* Title */}
      <View className="px-4 pb-2">
        <Text style={{ fontFamily: "IntegralCF-Bold", fontSize: 28, color: "#111827" }}>YOUR CART</Text>
      </View>

      {items.length === 0 ? (
        <ScrollView>
          <View className="items-center justify-center px-8 py-24">
            <Feather name="shopping-bag" size={64} color="#e5e7eb" />
            <Text style={{ ...satoshi, fontWeight: "700", fontSize: 20, color: "#111827", marginTop: 20, textAlign: "center" }}>Your cart is empty</Text>
            <Pressable onPress={() => router.push("/shop")} className="mt-6 bg-black px-8 py-4 rounded-full">
              <Text style={{ ...satoshi, fontWeight: "700", color: "white" }}>Browse Products</Text>
            </Pressable>
          </View>
          <Footer />
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Items Container - Figma: border, radius 20, padding 14, gap 16 */}
          <View style={{
            marginHorizontal: 16,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#e5e7eb",
            padding: 14,
            gap: 16,
          }}>
            {items.map((item, index) => (
              <View key={item.product.id}>
                <CartItemCard
                  item={item}
                  onRemove={() => removeFromCart(item.product.id)}
                  onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                  onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                />
                {index < items.length - 1 && (
                  <View style={{ height: 1, backgroundColor: "#e5e7eb", marginTop: 16 }} />
                )}
              </View>
            ))}
          </View>

          {/* Order Summary */}
          <View className="mt-4 mx-4 bg-gray-50 rounded-2xl p-4">
            <Text style={{ ...satoshi, fontWeight: "700", fontSize: 18, color: "#111827", marginBottom: 12 }}>Order Summary</Text>

            <View className="flex-row justify-between items-center mb-2">
              <Text style={{ ...satoshi, color: "#6b7280" }}>Subtotal</Text>
              <Text style={{ ...satoshi, fontWeight: "600", color: "#111827" }}>${subtotal.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between items-center mb-2">
              <Text style={{ ...satoshi, color: "#6b7280" }}>Discount (-20%)</Text>
              <Text style={{ ...satoshi, fontWeight: "600", color: "#ef4444" }}>-${discount.toFixed(2)}</Text>
            </View>

            {promoApplied && (
              <View className="flex-row justify-between items-center mb-2">
                <Text style={{ ...satoshi, color: "#6b7280" }}>Promo (SHOP10)</Text>
                <Text style={{ ...satoshi, fontWeight: "600", color: "#ef4444" }}>-${promoDiscount.toFixed(2)}</Text>
              </View>
            )}

            <View className="flex-row justify-between items-center mb-2">
              <Text style={{ ...satoshi, color: "#6b7280" }}>Delivery Fee</Text>
              <Text style={{ ...satoshi, fontWeight: "600", color: "#111827" }}>${deliveryFee.toFixed(2)}</Text>
            </View>

            <View className="border-t border-gray-200 my-3" />

            <View className="flex-row justify-between items-center mb-4">
              <Text style={{ ...satoshi, fontWeight: "700", fontSize: 16, color: "#111827" }}>Total</Text>
              <Text style={{ ...satoshi, fontWeight: "900", fontSize: 20, color: "#111827" }}>${total.toFixed(2)}</Text>
            </View>

            {/* Promo Code */}
            <View className="flex-row items-center gap-2 mb-3">
              <View className="flex-1 flex-row items-center bg-white border border-gray-200 rounded-full px-4 py-3">
                <Feather name="tag" size={16} color="#9ca3af" />
                <TextInput
                  style={{ ...satoshi, flex: 1, marginLeft: 8, color: "#374151" }}
                  placeholder="Add promo code"
                  placeholderTextColor="#9ca3af"
                  value={promoCode}
                  onChangeText={setPromoCode}
                  autoCapitalize="characters"
                  editable={!promoApplied}
                />
              </View>
              <Pressable
                onPress={handleApplyPromo}
                style={{ backgroundColor: promoApplied ? "#16a34a" : "#111827", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999 }}
              >
                <Text style={{ ...satoshi, fontWeight: "700", color: "white" }}>
                  {promoApplied ? "✓" : "Apply"}
                </Text>
              </Pressable>
            </View>

            <Pressable className="bg-black rounded-full py-4 items-center">
              <Text style={{ ...satoshi, fontWeight: "700", fontSize: 16, color: "white" }}>Go to Checkout →</Text>
            </Pressable>
          </View>

          <Footer />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
