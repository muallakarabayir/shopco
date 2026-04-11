import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      {/* Geri Dönüş Butonu */}
      <Pressable 
        onPress={() => router.push("/")} 
        className="absolute top-14 left-4 z-10 p-2"
      >
        <Feather name="arrow-left" size={24} color="black" />
      </Pressable>

      <View className="flex-1 justify-center">
        <Text className="text-[32px] uppercase mb-2" style={{ fontFamily: "IntegralCF-Bold" }}>
          Login
        </Text>
        <Text className="text-gray-500 text-[16px] mb-8" style={{ fontFamily: "Satoshi-Variable" }}>
          Welcome back! Please enter your details.
        </Text>

        <View className="gap-y-4">
          <View className="bg-[#F0F0F0] rounded-full px-5 h-14 flex-row items-center">
            <Feather name="mail" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-3 text-[16px]"
              style={{ fontFamily: "Satoshi-Variable" }}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="bg-[#F0F0F0] rounded-full px-5 h-14 flex-row items-center">
            <Feather name="lock" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-3 text-[16px]"
              style={{ fontFamily: "Satoshi-Variable" }}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#9ca3af" />
            </Pressable>
          </View>
        </View>

        <Pressable className="mt-4 self-end">
          <Text className="text-gray-900 font-medium underline" style={{ fontFamily: "Satoshi-Variable" }}>
            Forgot password?
          </Text>
        </Pressable>

        <Pressable className="bg-black h-14 rounded-full items-center justify-center mt-10">
          <Text className="text-white font-bold text-[16px]" style={{ fontFamily: "Satoshi-Variable" }}>
            Log In
          </Text>
        </Pressable>

        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500" style={{ fontFamily: "Satoshi-Variable" }}>Don't have an account? </Text>
          <Pressable onPress={() => router.push("/auth/signup" as any)}>
            <Text className="text-black font-bold underline">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}