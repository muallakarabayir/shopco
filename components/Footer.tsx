import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

const satoshi = { fontFamily: "Satoshi-Variable", fontWeight: "400" as const, fontSize: 14, lineHeight: 20, letterSpacing: 0 };

const SECTIONS = [
  { title: "COMPANY", items: ["About", "Features", "Works", "Career"] },
  { title: "HELP", items: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"] },
  { title: "FAQ", items: ["Account", "Manage Deliveries", "Orders", "Payment"] },
  { title: "RESOURCES", items: ["Free eBook", "Development Tutorial", "How to - Blog", "Youtube Playlist"] },
];

const BADGES = [
  { key: "visa", source: require("../assets/images/visa.png") },
  { key: "master", source: require("../assets/images/master.png") },
  { key: "paypal", source: require("../assets/images/paypal.png") },
  { key: "apple", source: require("../assets/images/apple.png") },
  { key: "google", source: require("../assets/images/google.png") },
];

const SOCIAL_ICONS = [
  { name: "twitter", bg: false, iconColor: "#374151" },
  { name: "facebook", bg: true, iconColor: "#ffffff" },
  { name: "instagram", bg: false, iconColor: "#374151" },
  { name: "github", bg: false, iconColor: "#374151" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <View style={{ backgroundColor: "#F0F0F0" }}>
      {/* Newsletter Wrapper - Arka planı ikiye bölen kısım */}
      <View>
        {/* Üstteki beyaz boşluk (veya sayfa içeriği rengi) */}
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: "50%", backgroundColor: "white" }} />
        {/* Alttaki footer rengi */}
        <View style={{ position: "absolute", top: "50%", left: 0, right: 0, bottom: 0, backgroundColor: "#F0F0F0" }} />

        {/* Newsletter Siyah Kutu */}
        <View className="mx-4 rounded-2xl bg-black p-6">
          <Text style={{ fontFamily: "IntegralCF-Bold", fontSize: 28, color: "white", textTransform: "uppercase", lineHeight: 32, letterSpacing: 0 }}>
            Stay Upto Date{"\n"}About Our{"\n"}Latest Offers
          </Text>
          <View className="flex-row items-center bg-white rounded-full px-4 py-3 mt-4">
            <Feather name="mail" size={16} color="#9ca3af" />
            <TextInput
              style={{ ...satoshi, flex: 1, marginLeft: 8, color: "#374151" }}
              placeholder="Enter your email address"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <Pressable className="bg-white rounded-full py-3 items-center mt-3">
            <Text style={{ ...satoshi, fontWeight: "600", color: "#111827" }}>Subscribe to Newsletter</Text>
          </Pressable>
        </View>
      </View>

      {/* Brand */}
      <View className="px-4 mt-6 mb-6">
        <Text style={{ fontFamily: "IntegralCF-Bold", fontSize: 28, color: "#111827" }}>SHOP.CO</Text>
        <Text style={{ ...satoshi, color: "#6b7280", marginTop: 8 }}>
          We have clothes that suits your style and which you're proud to wear. From women to men.
        </Text>
        <View className="flex-row gap-3 mt-4">
          {SOCIAL_ICONS.map((icon) => (
            <Pressable
              key={icon.name}
              className={`w-9 h-9 rounded-full items-center justify-center border ${icon.bg ? "bg-black border-black" : "bg-transparent border-gray-300"}`}
            >
              <Feather name={icon.name as any} size={16} color={icon.iconColor} />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Links */}
      <View className="px-4 flex-row flex-wrap mb-4">
        {SECTIONS.map((section) => (
          <View key={section.title} className="w-1/2 mb-6">
            <Text style={{ fontFamily: "Satoshi-Variable", fontWeight: "700", fontSize: 12, color: "#111827", letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>
              {section.title}
            </Text>
            {section.items.map((item) => (
              <Pressable key={item} className="mb-3">
                <Text style={{ ...satoshi, color: "#374151" }}>{item}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>

      {/* Bottom */}
      <View className="border-t border-gray-300 px-4 pt-5 pb-14">
        <Text style={{ ...satoshi, color: "#9ca3af", textAlign: "center", marginBottom: 16 }}>
          Shop.co © 2000-2023, All Rights Reserved
        </Text>
        <View className="flex-row justify-center items-center flex-wrap gap-2">
          {BADGES.map((badge) => (
            <View key={badge.key} className="border border-gray-300 rounded-lg px-2 py-1 bg-white items-center justify-center">
              <Image source={badge.source} style={{ width: 28, height: 28 }} resizeMode="contain" />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}