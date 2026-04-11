import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "IntegralCF-Bold": require("../assets/fonts/integral-cf-font-family/integralcf-bold.otf"),
    "IntegralCF-Regular": require("../assets/fonts/integral-cf-font-family/integralcf-regular.otf"),
    "Satoshi-Variable": require("../assets/fonts/Satoshi-Variable.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} initialRouteName="home">
          <Stack.Screen name="home" />
          <Stack.Screen name="index" />
          <Stack.Screen name="shop" />
          <Stack.Screen name="cart" />
          <Stack.Screen name="auth/signup" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="product/[id]" />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
