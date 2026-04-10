import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItemCard from "../components/CartItemCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCartStore } from "../store/cartStore";

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
    if (promoCode.toUpperCase() === "SHOP10") {
      setPromoApplied(true);
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/home");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Custom Header */}
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
          <Text className="text-xl font-black tracking-tight">SHOP.CO</Text>
          <View style={{ width: 22 }} />
        </View>
      </View>

      <View className="flex-row items-center px-4 py-2">
        <Pressable onPress={() => router.push("/home")}>
          <Text className="text-gray-400 text-xs">Home</Text>
        </Pressable>
        <Feather name="chevron-right" size={12} color="#9ca3af" />
        <Text className="text-gray-800 text-xs font-medium">Cart</Text>
      </View>

      <View className="px-4 pb-2">
        <Text className="text-3xl font-black tracking-tight">YOUR CART</Text>
      </View>

      {items.length === 0 ? (
        <ScrollView>
          <View className="items-center justify-center px-8 py-24">
            <Feather name="shopping-bag" size={64} color="#e5e7eb" />
            <Text className="text-gray-800 font-bold text-xl mt-5 text-center">Your cart is empty</Text>
            <Pressable onPress={() => router.push("/")} className="mt-6 bg-black px-8 py-4 rounded-full">
              <Text className="text-white font-bold">Browse Products</Text>
            </Pressable>
          </View>
          <Footer />
        </ScrollView>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.product.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <CartItemCard
              item={item}
              onRemove={() => removeFromCart(item.product.id)}
              onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
              onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
            />
          )}
          ListFooterComponent={
            <View>
              <View className="mt-4 bg-gray-50 rounded-2xl p-4">
                <Text className="text-lg font-black mb-3">Order Summary</Text>

                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-gray-500 text-sm">Subtotal</Text>
                  <Text className="text-sm font-semibold text-gray-900">${subtotal.toFixed(2)}</Text>
                </View>

                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-gray-500 text-sm">Discount (-20%)</Text>
                  <Text className="text-sm font-semibold text-red-500">-${discount.toFixed(2)}</Text>
                </View>

                {promoApplied && (
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-gray-500 text-sm">Promo (SHOP10)</Text>
                    <Text className="text-sm font-semibold text-red-500">-${promoDiscount.toFixed(2)}</Text>
                  </View>
                )}

                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-gray-500 text-sm">Delivery Fee</Text>
                  <Text className="text-sm font-semibold text-gray-900">${deliveryFee.toFixed(2)}</Text>
                </View>

                <View className="border-t border-gray-200 my-3" />

                <View className="flex-row justify-between items-center mb-4">
                  <Text className="font-bold text-gray-900">Total</Text>
                  <Text className="font-black text-lg text-gray-900">${total.toFixed(2)}</Text>
                </View>

                {/* Promo Code */}
                <View className="flex-row items-center gap-2 mb-3">
                  <View className="flex-1 flex-row items-center bg-white border border-gray-200 rounded-full px-4 py-3">
                    <Feather name="tag" size={16} color="#9ca3af" />
                    <TextInput
                      className="flex-1 ml-2 text-sm text-gray-700"
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
                    className={`px-5 py-3 rounded-full ${promoApplied ? "bg-green-600" : "bg-gray-900"}`}
                  >
                    <Text className="text-white font-bold text-sm">
                      {promoApplied ? "✓" : "Apply"}
                    </Text>
                  </Pressable>
                </View>

                <Pressable className="bg-black rounded-full py-4 items-center">
                  <Text className="text-white font-bold text-base">Go to Checkout →</Text>
                </Pressable>
              </View>
              <Footer />
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}