import { Tabs, router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Home,
  Store,
  RefreshCw,
  FileText,
  MoreHorizontal,
  Search,
  ShoppingCart,
} from "lucide-react-native";
import { useCart } from "@/context/CartContext";

const COLORS = {
  primary: "#108474",
  background: "#FFFFFF",
  text: "#1A1A1A",
  textMuted: "#6B7280",
  border: "#E5E7EB",
};

function CustomHeader() {
  const insets = useSafeAreaInsets();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const handleCartPress = () => {
    router.push("/cart");
  };

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Search size={24} color={COLORS.text} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>P</Text>
          </View>
          <Text style={styles.logoText}>Protopasta</Text>
        </View>

        <TouchableOpacity style={styles.headerButton} onPress={handleCartPress}>
          <ShoppingCart size={24} color={COLORS.text} />
          {itemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {itemCount > 99 ? "99+" : itemCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <CustomHeader />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            borderTopWidth: 1,
            borderTopColor: COLORS.border,
            paddingBottom: insets.bottom,
            height: 60 + insets.bottom,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "500",
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Home
                size={24}
                color={color}
                fill={focused ? color : "transparent"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            title: "Shop",
            tabBarIcon: ({ color, focused }) => (
              <Store
                size={24}
                color={color}
                fill={focused ? color : "transparent"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="subscriptions"
          options={{
            title: "Subscriptions",
            tabBarIcon: ({ color }) => <RefreshCw size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="blog"
          options={{
            title: "Blog",
            tabBarIcon: ({ color }) => <FileText size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: "More",
            tabBarIcon: ({ color }) => (
              <MoreHorizontal size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoIconText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "700",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  cartBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: COLORS.background,
    fontSize: 11,
    fontWeight: "700",
  },
});
