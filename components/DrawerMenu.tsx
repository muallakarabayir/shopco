import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useEffect } from "react";
import { Modal, Pressable, Text, View, Animated, TouchableWithoutFeedback } from "react-native";
import { SCREEN_WIDTH } from "../constants/layout";

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  onHomePress?: () => void;
  onShopPress?: () => void;
}

const satoshi = { fontFamily: "Satoshi-Variable", fontWeight: "400" as const, fontSize: 14, lineHeight: 20, letterSpacing: 0 };

export default function DrawerMenu({ visible, onClose, onHomePress, onShopPress }: DrawerMenuProps) {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.75)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, { toValue: 0, duration: 280, useNativeDriver: true }).start();
    } else {
      Animated.timing(slideAnim, { toValue: -SCREEN_WIDTH * 0.75, duration: 220, useNativeDriver: true }).start();
    }
  }, [visible]);

  const menuItems = [
    { label: "Home", onPress: () => { onClose(); onHomePress ? onHomePress() : router.push("/home"); } },
    { label: "Shop", onPress: () => { onClose(); onShopPress ? onShopPress() : router.push("/shop"); } },
    { label: "Brands", onPress: () => { onClose(); router.push("/home#brands"); } },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1">
        {/* Karartılmış Arka Plan */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="absolute inset-0 bg-black/50" />
        </TouchableWithoutFeedback>

        {/* Kayar Menü */}
        <Animated.View
          style={{
            transform: [{ translateX: slideAnim }],
            width: SCREEN_WIDTH * 0.75,
          }}
          className="flex-1 bg-white shadow-xl z-50"
        >
          {/* h-full ekleyerek View'ın tüm yüksekliği kaplamasını sağladık */}
          <View className="flex-1 p-6 pt-12 h-full">
            
            {/* Header Kısmı */}
            <View className="flex-row justify-between items-center mb-10">
              <Text style={{ fontFamily: "IntegralCF-Bold", fontSize: 24, color: "#111827" }}>
                SHOP.CO
              </Text>
              <Pressable onPress={onClose} hitSlop={15}>
                <Feather name="x" size={28} color="#000" />
              </Pressable>
            </View>

            {/* Orta Kısım (Navigasyon) */}
            <View>
              {menuItems.map((item) => (
                <Pressable 
                  key={item.label} 
                  onPress={item.onPress} 
                  className="py-5 border-b border-gray-50 active:bg-gray-50"
                >
                  <Text style={{ ...satoshi, fontWeight: "600", fontSize: 18, color: "#111827" }}>
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Butonları En Alta İten Alan */}
            {/* mt-auto sayesinde bu View her zaman en aşağıda kalır */}
            <View className="absolute bottom-8 left-6 right-6 gap-y-4">
              <Pressable 
                onPress={() => { onClose(); router.push("/auth/login"); }}
                className="bg-black py-4 rounded-full items-center active:opacity-80"
              >
                <Text style={{ ...satoshi, fontWeight: "700", color: "white" }}>Sign In</Text>
              </Pressable>

              <Pressable 
                onPress={() => { onClose(); router.push("/auth/signup"); }}
                className="border border-black py-4 rounded-full items-center active:bg-gray-50"
              >
                <Text style={{ ...satoshi, fontWeight: "700", color: "black" }}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}