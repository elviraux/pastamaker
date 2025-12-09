import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="product/[id]"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
