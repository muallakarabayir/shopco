import { Pressable, Text, View } from "react-native";

interface HeroSectionProps {
  onShopPress: () => void;
}

export default function HeroSection({ onShopPress }: HeroSectionProps) {
  return (
    <View className="px-6 pt-10 pb-8 relative overflow-hidden bg-brand-bg">
      <Text style={{ position: "absolute", top: 24, right: 24, fontSize: 36 }}>✦</Text>
      <Text style={{ position: "absolute", top: 72, right: 56, fontSize: 18 }}>✦</Text>

      <Text style={{
        fontSize: 36,
        fontFamily: "IntegralCF-Bold",
        color: "#111827",
        lineHeight: 34,
        letterSpacing: 0,
        textTransform: "uppercase",
        textAlignVertical: "center",
      }}>
        Find Clothes That Matches Your Style
      </Text>

      <Text style={{ fontFamily: "Satoshi-Variable", fontWeight: "400", fontSize: 14, lineHeight: 20, letterSpacing: 0, color: "#6b7280", marginTop: 16 }}>
        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
      </Text>

      <Pressable onPress={onShopPress} className="bg-black rounded-full py-4 items-center mt-6">
        <Text className="text-white font-bold text-base">Shop Now</Text>
      </Pressable>

      <View className="mt-8 border-t border-gray-200 pt-6">
        
        <View className="flex-row border-b border-gray-200 pb-4 mb-4">
          <View className="items-center flex-1 border-r border-gray-200">
            <View className="flex-row items-center gap-1">
              <Text style={{ fontSize: 14 }}>✦</Text>
              <Text className="text-2xl font-black text-gray-900">200+</Text>
            </View>
            <Text className="text-gray-500 text-xs text-center mt-1">International Brands</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-2xl font-black text-gray-900">2,000+</Text>
            <Text className="text-gray-500 text-xs text-center mt-1">High-Quality Products</Text>
          </View>
        </View>
       
        <View className="items-center">
          <Text className="text-2xl font-black text-gray-900">30,000+</Text>
          <Text className="text-gray-500 text-xs text-center mt-1">Happy Customers</Text>
        </View>
      </View>
    </View>
  );
}