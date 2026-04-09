import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}
          initialRouteName="home"
        >
          <Stack.Screen name="home" />
          <Stack.Screen name="index" />
          <Stack.Screen name="cart" />
          <Stack.Screen name="product/[id]" />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
