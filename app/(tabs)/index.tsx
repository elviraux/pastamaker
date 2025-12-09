import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Plus } from "lucide-react-native";
import { getNewestProducts, Product } from "@/data/products";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2.3;

const COLORS = {
  primary: "#108474",
  primaryDark: "#0A5C50",
  background: "#FFFFFF",
  text: "#1A1A1A",
  textMuted: "#6B7280",
  textLight: "#9CA3AF",
  border: "#E5E7EB",
  cardBg: "#FFFFFF",
  heroBg: "#2C2C2C",
  heroOverlay: "rgba(0, 0, 0, 0.4)",
};

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.productPriceRow}>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={16} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function HeroSection() {
  return (
    <View style={styles.heroContainer}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        }}
        style={styles.heroImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.85)"]}
        style={styles.heroGradient}
      />
      <View style={styles.heroContent}>
        <Text style={styles.heroSubtitle}>AN ATTRACTIVE OFFER</Text>
        <Text style={styles.heroTitle}>Metal Filaments</Text>
        <Text style={styles.heroDescription}>
          Filled with real metal - magnetic steel & iron - polish or patina
        </Text>
        <View style={styles.heroButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Shop Metal Filament</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Metal finishing blog</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function NewestProductsSection() {
  const newestProducts = getNewestProducts();

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>OUR NEWEST PRODUCTS</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsScroll}
      >
        {newestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ScrollView>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <HeroSection />
      <NewestProductsSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  // Hero Section
  heroContainer: {
    height: 380,
    position: "relative",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  heroSubtitle: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.background,
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: 20,
    marginBottom: 20,
  },
  heroButtons: {
    gap: 10,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  secondaryButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "600",
  },
  // Section
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  productsScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  // Product Card
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  productImageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F9FAFB",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.text,
    lineHeight: 18,
    marginBottom: 8,
    height: 36,
  },
  productPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
});
