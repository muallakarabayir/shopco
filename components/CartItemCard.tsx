import { Feather } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { CartItem } from "../types";

interface CartItemCardProps {
  item: CartItem;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const satoshiBold = { 
  fontFamily: "Satoshi-Variable", 
  fontWeight: "700" as const, 
  fontSize: 16, 
  lineHeight: 16, 
  letterSpacing: 0 
};

export default function CartItemCard({ item, onRemove, onIncrease, onDecrease }: CartItemCardProps) {
  return (
    <View className="bg-white flex-row gap-3">
      {/* Görsel Alanı: Tam 99x99 ve 8.66px radius */}
      <View
        className="w-[99px] h-[99px] rounded-[8.66px] overflow-hidden bg-[#F0EEED] items-center justify-center"
      >
        <Image
          source={{ uri: item.product.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* İçerik Alanı */}
      <View className="flex-1 justify-between">
        <View>
          <View className="flex-row items-start justify-between">
            <Text 
              style={{ ...satoshiBold, color: "#111827", flex: 1, paddingRight: 8 }} 
              numberOfLines={1}
            >
              {item.product.title}
            </Text>
            <Pressable onPress={onRemove} className="p-1">
              <Feather name="trash-2" size={20} color="#ef4444" />
            </Pressable>
          </View>
          
          {/* Boyut ve Renk Bilgisi - Statik veya veriden çekilebilir */}
          <Text className="font-[Satoshi-Variable] text-[12px] text-gray-500 mt-1">
            Size: <Text className="text-gray-900">Large</Text>
          </Text>
          <Text className="font-[Satoshi-Variable] text-[12px] text-gray-500">
            Color: <Text className="text-gray-900">White</Text>
          </Text>
        </View>

        {/* Fiyat ve Miktar Seçici */}
        <View className="flex-row items-center justify-between mt-auto">
          <Text className="text-[20px] font-bold text-gray-900">
            ${(item.product.price * item.quantity).toFixed(0)}
          </Text>
          
          <View className="flex-row items-center bg-[#F0F0F0] rounded-full px-3 py-2 gap-4">
            <Pressable onPress={onDecrease}>
              <Feather name="minus" size={16} color="black" />
            </Pressable>
            
            <Text className="font-[Satoshi-Variable] font-bold text-[14px]">
              {item.quantity}
            </Text>
            
            <Pressable onPress={onIncrease}>
              <Feather name="plus" size={16} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}