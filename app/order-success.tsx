import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CheckCircle, Package, Mail } from "lucide-react-native";
import { useCart } from "@/context/CartContext";

const COLORS = {
  primary: "#108474",
  primaryLight: "#E8F5F3",
  background: "#FFFFFF",
  text: "#1A1A1A",
  textMuted: "#6B7280",
  border: "#E5E7EB",
};

function generateOrderId(): string {
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `#PP-${number}`;
}

export default function OrderSuccessScreen() {
  const insets = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const { clearCart } = useCart();

  // Generate order ID once using useMemo
  const orderId = useMemo(() => generateOrderId(), []);

  // Clear cart when screen loads
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const handleContinueShopping = () => {
    // Navigate to home and reset the navigation stack
    router.replace("/(tabs)");
  };

  const customerEmail = email || "customer@example.com";

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 32 },
        ]}
      >
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <CheckCircle size={80} color={COLORS.primary} strokeWidth={1.5} />
          </View>
        </View>

        {/* Main Message */}
        <Text style={styles.title}>Thank you for your order!</Text>
        <Text style={styles.subtitle}>
          Your order has been placed successfully
        </Text>

        {/* Order Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Package size={20} color={COLORS.primary} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Order Number</Text>
              <Text style={styles.detailValue}>{orderId}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Mail size={20} color={COLORS.primary} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Confirmation sent to</Text>
              <Text style={styles.detailValue}>{customerEmail}</Text>
            </View>
          </View>
        </View>

        {/* Info Text */}
        <Text style={styles.infoText}>
          We will send you a shipping confirmation email as soon as your order
          ships. Thank you for shopping with Protopasta!
        </Text>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Continue Shopping Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinueShopping}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>

        {/* Secondary Action */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleContinueShopping}
        >
          <Text style={styles.secondaryButtonText}>View Order History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  // Icon
  iconContainer: {
    marginBottom: 32,
  },
  iconBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  // Text
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: "center",
    marginBottom: 32,
  },
  // Details Card
  detailsCard: {
    width: "100%",
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  // Info
  infoText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  spacer: {
    flex: 1,
  },
  // Buttons
  continueButton: {
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  continueButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
});
