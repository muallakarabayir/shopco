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
      <Text 
        className="text-[32px] text-center uppercase mb-4 text-[#111827] w-[284px] self-center"
        style={{ fontFamily: "IntegralCF-Bold", lineHeight: 36 }}
      >
        You Might Also Like
      </Text>
      <FlatList
        data={related}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
        renderItem={({ item }) => {
          // İndirimli fiyat ve rastgele bir indirim oranı simülasyonu
          const discountPercent = 20; 
          const discountedPrice = (item.price * (1 - discountPercent / 100)).toFixed(0);
          
          return (
            <Pressable
              onPress={() => router.push(`/product/${item.id}`)}
              className="bg-[#f9fafb] rounded-[13.42px] overflow-hidden"
              style={{ width: CARD_WIDTH }}
            >
              <View className="h-40 bg-[#f3f4f6] items-center justify-center">
                <Image
                  source={{ uri: item.image }}
                  style={{ width: CARD_WIDTH - 24, height: 140 }}
                  resizeMode="contain"
                />
              </View>
              <View className="p-3">
                <Text 
                  className="text-[#111827] text-base leading-4"
                  style={{ fontFamily: "Satoshi-Variable", fontWeight: "700" }}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                
                {/* Rating Bölümü */}
                <View className="flex-row items-center mt-1">
                  <Text className="text-yellow-400 text-xs">
                    {"★".repeat(Math.round(item.rating.rate))}
                    {"☆".repeat(5 - Math.round(item.rating.rate))}
                  </Text>
                  <Text className="text-[#9ca3af] text-[12px] ml-1" style={{ fontFamily: "Satoshi-Variable" }}>
                    {item.rating.rate}/5
                  </Text>
                </View>

                {/* Fiyat ve İndirim Bölümü */}
                <View className="flex-row items-center mt-1 flex-wrap">
                  <Text 
                    className="text-[#111827] text-xl mr-2"
                    style={{ fontFamily: "Satoshi-Variable", fontWeight: "700" }}
                  >
                    ${discountedPrice}
                  </Text>
                  <Text 
                    className="text-[#9ca3af] text-base line-through mr-2"
                    style={{ fontFamily: "Satoshi-Variable", fontWeight: "700" }}
                  >
                    ${item.price.toFixed(0)}
                  </Text>
                  
                  {/* İndirim Oranı Tag'i */}
                  <View className="bg-red-50 px-2 py-0.5 rounded-full">
                    <Text className="text-[#FF3333] text-[10px] font-bold">
                      -{discountPercent}%
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}