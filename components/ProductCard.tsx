import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { CARD_WIDTH } from "../constants/layout";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const discountedPrice = (product.price * 0.6).toFixed(2);

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      style={{ width: CARD_WIDTH, borderRadius: 13.42, overflow: "hidden", backgroundColor: "#f9fafb" }}
    >
      <View style={{ height: 174, width: CARD_WIDTH, backgroundColor: "#f3f4f6", alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{ uri: product.image }}
          style={{ width: CARD_WIDTH - 24, height: 150 }}
          resizeMode="contain"
        />
      </View>
      <View className="p-3">
        <Text style={{ fontFamily: "Satoshi-Variable", fontSize: 14, fontWeight: "600", color: "#111827" }} numberOfLines={2}>
          {product.title}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-yellow-400 text-xs">
            {"★".repeat(Math.round(product.rating.rate))}
            {"☆".repeat(5 - Math.round(product.rating.rate))}
          </Text>
          <Text style={{ fontFamily: "Satoshi-Variable", fontSize: 12, color: "#9ca3af", marginLeft: 4 }}>
            {product.rating.rate}/5
          </Text>
        </View>
        <View className="flex-row items-center mt-1">
          <Text style={{ fontFamily: "Satoshi-Variable", fontSize: 16, fontWeight: "900", color: "#111827", marginRight: 8 }}>
            ${discountedPrice}
          </Text>
          <Text style={{ fontFamily: "Satoshi-Variable", fontSize: 12, color: "#9ca3af", textDecorationLine: "line-through" }}>
            ${product.price.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
