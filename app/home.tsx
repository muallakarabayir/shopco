import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DressStyleSection from "../components/DressStyleSection";
import Footer from "../components/Footer";
import HappyCustomers from "../components/HappyCustomers";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import NewArrivals from "../components/NewArrivals";
import TopSelling from "../components/TopSelling";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <Header onShopPress={() => router.push("/shop")} onHomePress={() => {}} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroSection onShopPress={() => router.push("/shop")} />
        <NewArrivals />
        <TopSelling />
        <DressStyleSection />
        <HappyCustomers />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}