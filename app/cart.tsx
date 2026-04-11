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
          {/* Items Container */}
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

          {/* Order Summary - Footer ile arasına mb-10 eklendi */}
          <View className="mx-4 mt-6 p-5 rounded-[20px] border border-gray-200 bg-white mb-10">
            <Text 
              className="text-[20px] font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Satoshi-Variable" }}
            >
              Order Summary
            </Text>

            <View className="gap-y-5">
              <View className="flex-row justify-between items-center">
                <Text className="text-[16px] text-gray-400" style={{ fontFamily: "Satoshi-Variable" }}>Subtotal</Text>
                <Text className="text-[16px] font-bold text-gray-900" style={{ fontFamily: "Satoshi-Variable" }}>${subtotal.toFixed(0)}</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-[16px] text-gray-400" style={{ fontFamily: "Satoshi-Variable" }}>Discount (-20%)</Text>
                <Text className="text-[16px] font-bold text-red-500" style={{ fontFamily: "Satoshi-Variable" }}>-${discount.toFixed(0)}</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-[16px] text-gray-400" style={{ fontFamily: "Satoshi-Variable" }}>Delivery Fee</Text>
                <Text className="text-[16px] font-bold text-gray-900" style={{ fontFamily: "Satoshi-Variable" }}>${deliveryFee.toFixed(0)}</Text>
              </View>
            </View>

            <View className="h-[1px] bg-gray-100 my-5" />

            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-[18px] text-gray-900" style={{ fontFamily: "Satoshi-Variable" }}>Total</Text>
              <Text className="text-[24px] font-bold text-gray-900" style={{ fontFamily: "Satoshi-Variable" }}>${total.toFixed(0)}</Text>
            </View>

            {/* Promo Code & Apply */}
            <View className="flex-row items-center gap-3 mb-4">
              <View className="flex-1 flex-row items-center bg-[#F0F0F0] rounded-full px-4 h-12">
                <Feather name="tag" size={20} color="#9ca3af" />
                <TextInput
                  className="flex-1 ml-3 text-[14px] text-gray-700"
                  style={{ fontFamily: "Satoshi-Variable" }}
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
                className={`h-12 px-8 rounded-full items-center justify-center ${promoApplied ? "bg-green-600" : "bg-black"}`}
              >
                <Text className="text-white font-bold" style={{ fontFamily: "Satoshi-Variable" }}>
                  {promoApplied ? "✓" : "Apply"}
                </Text>
              </Pressable>
            </View>

            {/* Go to Checkout Button */}
            <Pressable className="bg-black rounded-full h-14 flex-row items-center justify-center gap-2">
              <Text className="text-white font-bold text-[16px]" style={{ fontFamily: "Satoshi-Variable" }}>
                Go to Checkout
              </Text>
              <Feather name="arrow-right" size={20} color="white" />
            </Pressable>
          </View>
          
          <Footer />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}