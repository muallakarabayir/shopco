import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      {/* Geri Dönüş Butonu */}
      <Pressable 
        onPress={() => router.push("/")} 
        className="absolute top-14 left-4 z-10 p-2"
      >
        <Feather name="arrow-left" size={24} color="black" />
      </Pressable>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <View className="py-10">
          <Text className="text-[32px] uppercase mb-2" style={{ fontFamily: "IntegralCF-Bold" }}>
            Create Account
          </Text>
          <Text className="text-gray-500 text-[16px] mb-8" style={{ fontFamily: "Satoshi-Variable" }}>
            Join us to start shopping the latest trends.
          </Text>

          <View className="gap-y-4">
            <View className="bg-[#F0F0F0] rounded-full px-5 h-14 flex-row items-center">
              <Feather name="user" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-[16px]"
                style={{ fontFamily: "Satoshi-Variable" }}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View className="bg-[#F0F0F0] rounded-full px-5 h-14 flex-row items-center">
              <Feather name="mail" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-[16px]"
                style={{ fontFamily: "Satoshi-Variable" }}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View className="bg-[#F0F0F0] rounded-full px-5 h-14 flex-row items-center">
              <Feather name="lock" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-[16px]"
                style={{ fontFamily: "Satoshi-Variable" }}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <View className="mt-6 flex-row items-start px-2">
            <View className="w-5 h-5 rounded border border-gray-300 mr-3 items-center justify-center">
              <View className="w-3 h-3 bg-black rounded-sm" />
            </View>
            <Text className="text-gray-500 text-xs flex-1" style={{ fontFamily: "Satoshi-Variable" }}>
              By creating an account, you agree to our Terms & Conditions and Privacy Policy.
            </Text>
          </View>

          <Pressable className="bg-black h-14 rounded-full items-center justify-center mt-10">
            <Text className="text-white font-bold text-[16px]" style={{ fontFamily: "Satoshi-Variable" }}>
              Create Account
            </Text>
          </Pressable>

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-500" style={{ fontFamily: "Satoshi-Variable" }}>Already have an account? </Text>
            <Pressable onPress={() => router.push("/auth/login" as any)}>
              <Text className="text-black font-bold underline">Log In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}