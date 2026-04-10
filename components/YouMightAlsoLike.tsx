import { useRouter } from "expo-router";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { CARD_WIDTH } from "../constants/layout";
import { useProducts } from "../hooks/useProducts";

interface Props {
  currentId: number;
}

export default function YouMightAlsoLike({ currentId }: Props) {
  const router = useRouter();
  const { data: products } = useProducts();

  const related = products?.filter((p) => p.id !== currentId).slice(0, 6) ?? [];

  if (related.length === 0) return null;

  return (
    <View className="mt-6 border-t border-gray-100 pt-6 mb-10">
      <Text className="text-2xl font-black text-center uppercase mb-4">
        You Might Also LIke
      </Text>
      <FlatList
        data={related}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
        renderItem={({ item }) => {
          const discountedPrice = (item.price * 0.6).toFixed(2);
          return (
            <Pressable
              onPress={() => router.push(`/product/${item.id}`)}
              style={{ width: CARD_WIDTH }}
              className="bg-gray-50 rounded-2xl overflow-hidden"
            >
              <View style={{ height: 160, width: CARD_WIDTH }} className="bg-gray-100 items-center justify-center">
                <Image
                  source={{ uri: item.image }}
                  style={{ width: CARD_WIDTH - 24, height: 140 }}
                  resizeMode="contain"
                />
              </View>
              <View className="p-3">
                <Text className="text-sm font-semibold text-gray-900" numberOfLines={2}>
                  {item.title}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-yellow-400 text-xs">
                    {"★".repeat(Math.round(item.rating.rate))}
                    {"☆".repeat(5 - Math.round(item.rating.rate))}
                  </Text>
                  <Text className="text-gray-400 text-xs ml-1">{item.rating.rate}/5</Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <Text className="text-base font-black text-gray-900 mr-2">${discountedPrice}</Text>
                  <Text className="text-xs text-gray-400 line-through">${item.price.toFixed(2)}</Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}