import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

const CATEGORIES = [
  { label: "Casual", image: require("../assets/images/casual.png") },
  { label: "Formal", image: require("../assets/images/formal.png") },
  { label: "Party", image: require("../assets/images/party.png") },
  { label: "Gym", image: require("../assets/images/gym.png") },
];

export default function DressStyleSection() {
  const router = useRouter();

  return (
    <View className="items-center mt-8 pb-2">
      {/* Ana Konteynır: 358px genişlik */}
      <View className="w-[358px] bg-[#F0F0F0] rounded-[20px] px-6 py-10">
        <Text 
          className="text-[32px] text-center uppercase mb-7 text-gray-900"
          style={{ fontFamily: "IntegralCF-Bold" }}
        >
          Browse By{"\n"}Dress Style
        </Text>

        <View className="gap-y-4 items-center">
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.label}
              onPress={() => router.push("/")}
              // Kart Ölçüleri: 310x190, Radius 20
              className="w-[310px] h-[190px] rounded-[20px] overflow-hidden bg-white relative"
            >
              {/* Kategori Başlığı: Left 24px, Top Figma değerlerine göre */}
              <View className="absolute top-6 left-6 z-10">
                <Text 
                  className="text-[24px] font-bold text-gray-900"
                  style={{ fontFamily: "Satoshi-Variable" }}
                >
                  {cat.label}
                </Text>
              </View>

              {/* Görsel: Sağ tarafa yaslı ve konteynırı dolduracak şekilde */}
              <Image
                source={cat.image}
                className="absolute right-0 bottom-0 h-full w-[80%]"
                resizeMode="cover"
              />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}