import { useRouter } from "expo-router";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { CARD_WIDTH } from "../constants/layout";
import { useProducts } from "../hooks/useProducts";

interface Props {
  currentId: number;
}

const satoshiBold = { fontFamily: "Satoshi-Variable", fontWeight: "700" as const, fontSize: 16, lineHeight: 16, letterSpacing: 0 };

export default function YouMightAlsoLike({ currentId }: Props) {
  const router = useRouter();
  const { data: products } = useProducts();

  const related = products?.filter((p) => p.id !== currentId).slice(0, 6) ?? [];

  if (related.length === 0) return null;

  return (
    <View className="mt-6 border-t border-gray-100 pt-6 mb-10">
      <Text style={{ fontFamily: "IntegralCF-Bold", fontSize: 32, lineHeight: 36, letterSpacing: 0, textAlign: "center", textTransform: "uppercase", color: "#111827", marginBottom: 16, width: 284, alignSelf: "center" }}>
        You Might Also Like
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
              style={{ width: CARD_WIDTH, borderRadius: 13.42, overflow: "hidden", backgroundColor: "#f9fafb" }}
            >
              <View style={{ height: 160, width: CARD_WIDTH, backgroundColor: "#f3f4f6", alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: CARD_WIDTH - 24, height: 140 }}
                  resizeMode="contain"
                />
              </View>
              <View className="p-3">
                <Text style={{ ...satoshiBold, color: "#111827" }} numberOfLines={2}>
                  {item.title}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-yellow-400 text-xs">
                    {"★".repeat(Math.round(item.rating.rate))}
                    {"☆".repeat(5 - Math.round(item.rating.rate))}
                  </Text>
                  <Text style={{ fontFamily: "Satoshi-Variable", fontWeight: "400", fontSize: 12, color: "#9ca3af", marginLeft: 4 }}>
                    {item.rating.rate}/5
                  </Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <Text style={{ ...satoshiBold, color: "#111827", marginRight: 8 }}>${discountedPrice}</Text>
                  <Text style={{ fontFamily: "Satoshi-Variable", fontWeight: "400", fontSize: 12, color: "#9ca3af", textDecorationLine: "line-through" }}>
                    ${item.price.toFixed(2)}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
