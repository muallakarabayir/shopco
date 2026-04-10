import { Feather } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { SCREEN_WIDTH } from "../constants/layout";
import { CartItem } from "../types";

interface CartItemCardProps {
  item: CartItem;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const IMAGE_SIZE = SCREEN_WIDTH * 0.2;
const satoshiBold = { fontFamily: "Satoshi-Variable", fontWeight: "700" as const, fontSize: 16, lineHeight: 16, letterSpacing: 0 };

export default function CartItemCard({ item, onRemove, onIncrease, onDecrease }: CartItemCardProps) {
  return (
    <View className="bg-gray-50 rounded-2xl p-3 flex-row gap-3">
      <View
        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
        className="bg-gray-100 rounded-xl items-center justify-center"
      >
        <Image
          source={{ uri: item.product.image }}
          style={{ width: IMAGE_SIZE - 16, height: IMAGE_SIZE - 16 }}
          resizeMode="contain"
        />
      </View>
      <View className="flex-1">
        <View className="flex-row items-start justify-between">
          <Text style={{ ...satoshiBold, color: "#111827", flex: 1, paddingRight: 8 }} numberOfLines={2}>
            {item.product.title}
          </Text>
          <Pressable onPress={onRemove} className="p-1">
            <Feather name="trash-2" size={16} color="#ef4444" />
          </Pressable>
        </View>
        <Text style={{ fontFamily: "Satoshi-Variable", fontWeight: "400", fontSize: 12, color: "#9ca3af", marginTop: 4, textTransform: "capitalize" }}>
          {item.product.category}
        </Text>
        <View className="flex-row items-center justify-between mt-2">
          <Text style={{ ...satoshiBold, color: "#111827" }}>
            ${(item.product.price * item.quantity).toFixed(2)}
          </Text>
          <View
            className="flex-row items-center bg-white rounded-full border border-gray-200 px-2"
            style={{ height: 36 }}
          >
            <Pressable onPress={onDecrease} style={{ width: 28, height: 36, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ ...satoshiBold, color: "#374151" }}>−</Text>
            </Pressable>
            <View style={{ width: 24, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontFamily: "Satoshi-Variable", fontWeight: "600", fontSize: 14, color: "#111827" }}>{item.quantity}</Text>
            </View>
            <Pressable onPress={onIncrease} style={{ width: 28, height: 36, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ ...satoshiBold, color: "#374151" }}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
