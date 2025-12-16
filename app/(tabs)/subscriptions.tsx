import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { RefreshCw, Check } from "lucide-react-native";

const COLORS = {
  primary: "#108474",
  background: "#FFFFFF",
  text: "#1A1A1A",
  textMuted: "#6B7280",
  border: "#E5E7EB",
};

const subscriptionPlans = [
  {
    id: "1",
    name: "Starter Box",
    price: 14.99,
    frequency: "monthly",
    features: ["1 random color spool", "Free shipping", "Cancel anytime"],
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=400&fit=crop",
  },
  {
    id: "2",
    name: "Creator Box",
    price: 29.99,
    frequency: "monthly",
    features: ["2 curated color spools", "Exclusive colors", "Free shipping", "Cancel anytime"],
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop",
    popular: true,
  },
  {
    id: "3",
    name: "Pro Box",
    price: 49.99,
    frequency: "monthly",
    features: ["4 premium spools", "Early access", "Exclusive colors", "Free shipping", "Cancel anytime"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  },
];

export default function SubscriptionsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <RefreshCw size={32} color={COLORS.primary} />
        <Text style={styles.title}>Filament Subscriptions</Text>
        <Text style={styles.subtitle}>
          Get fresh colors delivered to your door every month
        </Text>
      </View>

      <View style={styles.plansContainer}>
        {subscriptionPlans.map((plan) => (
          <View
            key={plan.id}
            style={[styles.planCard, plan.popular && styles.popularCard]}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
              </View>
            )}
            <Image
              source={{ uri: plan.image }}
              style={styles.planImage}
              resizeMode="cover"
            />
            <View style={styles.planContent}>
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.planPrice}>${plan.price.toFixed(2)}</Text>
                <Text style={styles.planFrequency}>/{plan.frequency}</Text>
              </View>
              <View style={styles.featuresContainer}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Check size={16} color={COLORS.primary} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={[
                  styles.subscribeButton,
                  plan.popular && styles.subscribeButtonPopular,
                ]}
              >
                <Text
                  style={[
                    styles.subscribeButtonText,
                    plan.popular && styles.subscribeButtonTextPopular,
                  ]}
                >
                  Subscribe Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
  },
  plansContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 16,
  },
  planCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  popularCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  popularBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  popularBadgeText: {
    color: COLORS.background,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  planImage: {
    width: "100%",
    height: 150,
  },
  planContent: {
    padding: 20,
  },
  planName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
  },
  planFrequency: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  featuresContainer: {
    gap: 8,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.text,
  },
  subscribeButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  subscribeButtonPopular: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  subscribeButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
  },
  subscribeButtonTextPopular: {
    color: COLORS.background,
  },
});
