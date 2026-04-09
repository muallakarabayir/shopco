import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const PaymentBadge = ({ label, color = "#1a1a2e" }: { label: string; color?: string }) => (
  <View style={{
    borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6,
    backgroundColor: "white", minWidth: 52, alignItems: "center", justifyContent: "center"
  }}>
    <Text style={{ fontSize: 11, fontWeight: "700", color, letterSpacing: 0.5 }}>{label}</Text>
  </View>
);

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <View className="bg-white">
      {/* Newsletter */}
      <View className="bg-gray-900 mx-4 rounded-2xl p-6 mb-8">
        <Text className="text-white text-2xl font-black uppercase leading-tight">
          Stay Upto Date{"\n"}About Our{"\n"}Latest Offers
        </Text>
        <View className="flex-row items-center bg-white rounded-full px-4 py-3 mt-4">
          <Feather name="mail" size={16} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-2 text-sm text-gray-700"
            placeholder="Enter your email address"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <Pressable className="bg-white rounded-full py-3 items-center mt-3">
          <Text className="text-gray-900 font-semibold text-sm">Subscribe to Newsletter</Text>
        </Pressable>
      </View>

      {/* Brand */}
      <View className="px-4 mb-6">
        <Text className="text-2xl font-black text-gray-900">SHOP.CO</Text>
        <Text className="text-gray-500 text-sm mt-2 leading-relaxed">
          We have clothes that suits your style and which you're proud to wear. From women to men.
        </Text>
        <View className="flex-row gap-3 mt-4">
          {["twitter", "facebook", "instagram", "github"].map((icon) => (
            <Pressable key={icon} className="w-9 h-9 rounded-full border border-gray-200 items-center justify-center">
              <Feather name={icon as any} size={16} color="#374151" />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Links */}
      <View className="px-4 flex-row flex-wrap mb-6">
        {[
          { title: "COMPANY", items: ["About", "Features", "Works", "Career"] },
          { title: "HELP", items: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"] },
          { title: "FAQ", items: ["Account", "Manage Deliveries", "Orders", "Payment"] },
          { title: "RESOURCES", items: ["Free eBook", "Development Tutorial", "How to - Blog", "Youtube Playlist"] },
        ].map((section) => (
          <View key={section.title} className="w-1/2 mb-6">
            <Text className="text-xs font-bold text-gray-400 tracking-widest mb-3">{section.title}</Text>
            {section.items.map((item) => (
              <Pressable key={item} className="mb-2">
                <Text className="text-gray-600 text-sm">{item}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>

      {/* Bottom */}
      <View className="border-t border-gray-100 px-4 py-5">
        <Text className="text-gray-400 text-xs text-center mb-4">
          Shop.co © 2000-2023, All Rights Reserved
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <PaymentBadge label="VISA" color="#1A1F71" />
          <View style={{
            borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8,
            paddingHorizontal: 8, paddingVertical: 6,
            backgroundColor: "white", alignItems: "center", justifyContent: "center"
          }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: "#EB001B", marginRight: -6 }} />
              <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: "#F79E1B" }} />
            </View>
          </View>
          <PaymentBadge label="PayPal" color="#003087" />
          <PaymentBadge label="●Pay" color="#000" />
          <PaymentBadge label="G Pay" color="#5F6368" />
        </View>
      </View>
    </View>
  );
}
