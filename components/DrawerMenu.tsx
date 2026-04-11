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
    { label: "Cart", onPress: () => { onClose(); router.push("/cart"); } },
  ];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={{
                transform: [{ translateX: slideAnim }],
                width: SCREEN_WIDTH * 0.75,
                height: "100%",
                backgroundColor: "white",
                paddingTop: 60,
                paddingHorizontal: 24,
              }}
            >
              <View className="flex-row items-center justify-between mb-8">
                <Text style={{ fontFamily: "IntegralCF-Bold", fontSize: 20, color: "#111827" }}>SHOP.CO</Text>
                <Pressable onPress={onClose}>
                  <Feather name="x" size={24} color="#000" />
                </Pressable>
              </View>

              {menuItems.map((item) => (
                <Pressable key={item.label} onPress={item.onPress} className="py-4 border-b border-gray-100">
                  <Text style={{ ...satoshi, fontWeight: "600", fontSize: 18, color: "#111827" }}>{item.label}</Text>
                </Pressable>
              ))}

              <View className="absolute bottom-12 left-6 right-6">
                <View className="flex-row gap-4">
                  <Pressable className="flex-1 bg-black py-3 rounded-full items-center">
                    <Text style={{ ...satoshi, fontWeight: "700", color: "white" }}>Sign In</Text>
                  </Pressable>
                  <Pressable className="flex-1 border border-black py-3 rounded-full items-center">
                    <Text style={{ ...satoshi, fontWeight: "700", color: "#111827" }}>Sign Up</Text>
                  </Pressable>
                </View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
