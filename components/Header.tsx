import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SCREEN_WIDTH } from "../constants/layout";
import { useCartStore } from "../store/cartStore";
import DrawerMenu from "./DrawerMenu";

interface HeaderProps {
  showBack?: boolean;
  onShopPress?: () => void;
  onSearchPress?: () => void;
  onHomePress?: () => void;
}

const isSmallScreen = SCREEN_WIDTH < 375;

export default function Header({ showBack = false, onShopPress, onHomePress, onSearchPress }: HeaderProps) {
  const router = useRouter();
  const totalItems = useCartStore((s) => s.totalItems);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/home");
    }
  };

  const handleSearch = () => {
    if (onShopPress) {
      onShopPress();
    } else {
      router.push("/");
    }
  };

  return (
    <View>
      <DrawerMenu
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onHomePress={onHomePress}
        onShopPress={onShopPress}
      />

      <View className="bg-black py-2 px-4">
        <Text className="text-white text-center" style={{ fontSize: isSmallScreen ? 10 : 12 }}>
          Sign up and get <Text className="font-bold">20% off</Text> to your first order.{" "}
          <Text className="font-bold underline">Sign Up Now</Text>
        </Text>
      </View>

      <View
        className="flex-row items-center justify-between border-b border-gray-100"
        style={{ paddingHorizontal: isSmallScreen ? 12 : 16, paddingVertical: isSmallScreen ? 10 : 12 }}
      >
        <View className="flex-row items-center gap-3">
          {showBack ? (
            <Pressable onPress={handleBack}>
              <Feather name="arrow-left" size={isSmallScreen ? 20 : 22} color="#000" />
            </Pressable>
          ) : (
            <Pressable onPress={() => setDrawerOpen(true)}>
              <Feather name="menu" size={isSmallScreen ? 20 : 22} color="#000" />
            </Pressable>
          )}
          <Text style={{ fontSize: isSmallScreen ? 18 : 20 }} className="font-black tracking-tight">
            SHOP.CO
          </Text>
        </View>

        <View className="flex-row items-center gap-4">
          {!showBack && (
            <Pressable onPress={handleSearch}>
              <Pressable onPress={onSearchPress}><Feather name="search" size={isSmallScreen ? 20 : 22} color="#000" /></Pressable>
            </Pressable>
          )}
          <Pressable onPress={() => router.push("/cart")} className="relative">
            <Feather name="shopping-bag" size={isSmallScreen ? 20 : 22} color="#000" />
            {totalItems() > 0 && (
              <View className="absolute -top-2 -right-2 bg-black rounded-full w-4 h-4 items-center justify-center">
                <Text className="text-white text-[9px] font-bold">{totalItems()}</Text>
              </View>
            )}
          </Pressable>
          {!showBack && <Feather name="user" size={isSmallScreen ? 20 : 22} color="#000" />}
        </View>
      </View>
    </View>
  );
}
