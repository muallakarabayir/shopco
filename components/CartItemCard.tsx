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
          <Text className="text-sm font-bold text-gray-900 flex-1 pr-2" numberOfLines={2}>
            {item.product.title}
          </Text>
          <Pressable onPress={onRemove} className="p-1">
            <Feather name="trash-2" size={16} color="#ef4444" />
          </Pressable>
        </View>
        <Text className="text-gray-400 text-xs mt-1 capitalize">{item.product.category}</Text>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-base font-black text-gray-900">
            ${(item.product.price * item.quantity).toFixed(2)}
          </Text>
          <View
            className="flex-row items-center bg-white rounded-full border border-gray-200 px-2"
            style={{ height: 36 }}
          >
            <Pressable onPress={onDecrease} style={{ width: 28, height: 36, alignItems: "center", justifyContent: "center" }}>
              <Text className="text-gray-700 font-bold text-base">−</Text>
            </Pressable>
            <View style={{ width: 24, alignItems: "center", justifyContent: "center" }}>
              <Text className="text-gray-900 font-semibold text-sm">{item.quantity}</Text>
            </View>
            <Pressable onPress={onIncrease} style={{ width: 28, height: 36, alignItems: "center", justifyContent: "center" }}>
              <Text className="text-gray-700 font-bold text-base">+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
