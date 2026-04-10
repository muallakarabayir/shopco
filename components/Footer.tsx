import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const satoshi = { fontFamily: "Satoshi-Variable", fontWeight: "400" as const, fontSize: 14, lineHeight: 20, letterSpacing: 0 };

export default function Footer() {
  const [email, setEmail] = useState("");

  const socialIcons = [
    { name: "twitter", bg: "transparent", iconColor: "#374151", border: true },
    { name: "facebook", bg: "#000000", iconColor: "#ffffff", border: false },
    { name: "instagram", bg: "transparent", iconColor: "#374151", border: true },
    { name: "github", bg: "transparent", iconColor: "#374151", border: true },
  ];

  return (
    <View style={{ backgroundColor: "#F0F0F0" }}>
      {/* Newsletter */}
      <View style={{ marginHorizontal: 16, borderRadius: 16, backgroundColor: "#000000", padding: 24, marginBottom: 0 }}>
        <Text style={{ fontFamily: "IntegralCF-Bold", fontSize: 28, color: "white", textTransform: "uppercase", lineHeight: 32, letterSpacing: 0 }}>
          Stay Upto Date{"\n"}About Our{"\n"}Latest Offers
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", borderRadius: 999, paddingHorizontal: 16, paddingVertical: 12, marginTop: 16 }}>
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
        <Pressable style={{ backgroundColor: "white", borderRadius: 999, paddingVertical: 12, alignItems: "center", marginTop: 12 }}>
          <Text style={{ ...satoshi, fontWeight: "600", color: "#111827" }}>Subscribe to Newsletter</Text>
        </Pressable>
      </View>

      {/* Brand */}
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        <Text style={{ fontFamily: "IntegralCF-Bold", fontSize: 28, color: "#111827" }}>SHOP.CO</Text>
        <Text style={{ ...satoshi, color: "#6b7280", marginTop: 8 }}>
          We have clothes that suits your style and which you're proud to wear. From women to men.
        </Text>
        <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
          {socialIcons.map((icon) => (
            <Pressable
              key={icon.name}
              style={{
                width: 36, height: 36, borderRadius: 18,
                backgroundColor: icon.bg,
                borderWidth: icon.border ? 1 : 0,
                borderColor: "#d1d5db",
                alignItems: "center", justifyContent: "center",
              }}
            >
              <Feather name={icon.name as any} size={16} color={icon.iconColor} />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Links */}
      <View style={{ paddingHorizontal: 16, flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}>
        {[
          { title: "COMPANY", items: ["About", "Features", "Works", "Career"] },
          { title: "HELP", items: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"] },
          { title: "FAQ", items: ["Account", "Manage Deliveries", "Orders", "Payment"] },
          { title: "RESOURCES", items: ["Free eBook", "Development Tutorial", "How to - Blog", "Youtube Playlist"] },
        ].map((section) => (
          <View key={section.title} style={{ width: "50%", marginBottom: 24 }}>
            <Text style={{ fontFamily: "Satoshi-Variable", fontWeight: "700", fontSize: 12, color: "#9ca3af", letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>
              {section.title}
            </Text>
            {section.items.map((item) => (
              <Pressable key={item} style={{ marginBottom: 12 }}>
                <Text style={{ ...satoshi, color: "#374151" }}>{item}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>

      {/* Bottom */}
      <View style={{ borderTopWidth: 1, borderTopColor: "#d1d5db", paddingHorizontal: 16, paddingVertical: 20, paddingBottom: 60 }}>
        <Text style={{ ...satoshi, color: "#9ca3af", textAlign: "center", marginBottom: 16 }}>
          Shop.co © 2000-2023, All Rights Reserved
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {[
            { label: "VISA", color: "#1A1F71" },
            { label: "MC", color: "#EB001B" },
            { label: "PayPal", color: "#003087" },
            { label: "Apple Pay", color: "#000" },
            { label: "G Pay", color: "#5F6368" },
          ].map((badge) => (
            <View key={badge.label} style={{
              borderWidth: 1, borderColor: "#d1d5db", borderRadius: 8,
              paddingHorizontal: 10, paddingVertical: 6,
              backgroundColor: "white", minWidth: 56, alignItems: "center", justifyContent: "center"
            }}>
              <Text style={{ fontSize: 11, fontWeight: "700", color: badge.color }}>{badge.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}