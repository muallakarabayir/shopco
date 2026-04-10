import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SCREEN_WIDTH } from "../constants/layout";

const CATEGORIES = [
  {
    label: "Casual",
    image: require("../assets/images/casual.png"),
  },
  {
    label: "Formal",
    image: require("../assets/images/formal.png"),
  },
  {
    label: "Party",
    image: require("../assets/images/party.png"),
  },
  {
    label: "Gym",
    image: require("../assets/images/gym.png"),
  },
];

const CARD_W = SCREEN_WIDTH - 32;

export default function DressStyleSection() {
  const router = useRouter();

  return (
    <View className="px-4 pt-8">
      <Text className="text-2xl font-black text-center uppercase tracking-tight mb-4">
        Browse By Dress Style
      </Text>
      <View style={{ gap: 12 }}>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat.label}
            onPress={() => router.push("/")}
            style={{ width: CARD_W, height: 140, borderRadius: 20, overflow: "hidden", backgroundColor: "#f3f4f6" }}
          >
            <Image
              source={cat.image}
              style={{ position: "absolute", right: 0, bottom: 0, width: CARD_W * 0.6, height: 140 }}
              resizeMode="cover"
            />
            <View style={{ position: "absolute", top: 20, left: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#111827" }}>
                {cat.label}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}