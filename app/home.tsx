import { useRouter } from "expo-router";
import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NewArrivals from "../components/NewArrivals";
import TopSelling from "../components/TopSelling";
import DressStyleSection from "../components/DressStyleSection";
import HappyCustomers from "../components/HappyCustomers";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header onShopPress={() => router.push("/")} onHomePress={() => {}} />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero Section */}
        <View className="px-6 pt-10 pb-8 bg-amber-50 relative overflow-hidden">
          <Text style={{ position: "absolute", top: 20, right: 40, fontSize: 32 }}>✦</Text>
          <Text style={{ position: "absolute", bottom: 80, left: 20, fontSize: 20 }}>✦</Text>
          <Text style={{ position: "absolute", top: 60, right: 20, fontSize: 16 }}>✦</Text>

          <Text className="text-5xl font-black text-gray-900 leading-tight uppercase">
            Find{"\n"}Clothes{"\n"}That {"\n"}Matches{"\n"}Your Style
          </Text>

          <Text className="text-gray-500 text-sm mt-4 leading-relaxed">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </Text>

          <Pressable onPress={() => router.push("/")} className="bg-black rounded-full py-4 items-center mt-6">
            <Text className="text-white font-bold text-base">Shop Now</Text>
          </Pressable>

          <View className="mt-8 border-t border-gray-200 pt-6">
            <View className="flex-row justify-between">
              <View className="items-center flex-1 border-r border-gray-200">
                <Text className="text-2xl font-black text-gray-900">200+</Text>
                <Text className="text-gray-500 text-xs text-center mt-1">International{"\n"}Brands</Text>
              </View>
              <View className="items-center flex-1 border-r border-gray-200">
                <Text className="text-2xl font-black text-gray-900">2,000+</Text>
                <Text className="text-gray-500 text-xs text-center mt-1">High-Quality{"\n"}Products</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl font-black text-gray-900">30,000+</Text>
                <Text className="text-gray-500 text-xs text-center mt-1">Happy{"\n"}Customers</Text>
              </View>
            </View>
          </View>
        </View>

        {/* New Arrivals */}
        <NewArrivals />

        {/* Top Selling */}
        <TopSelling />

        {/* Browse By Dress Style */}
        <DressStyleSection />

        {/* Happy Customers */}
        <HappyCustomers />

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}