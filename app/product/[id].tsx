import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ChevronLeft,
  Search,
  ShoppingCart,
  Minus,
  Plus,
  Star,
} from "lucide-react-native";
import { getProductById, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const COLORS = {
  primary: "#108474",
  background: "#FFFFFF",
  text: "#1A1A1A",
  textMuted: "#6B7280",
  textLight: "#9CA3AF",
  border: "#E5E7EB",
  starFilled: "#FCD34D",
  starEmpty: "#E5E7EB",
};

// Mock additional images for carousel
const getProductImages = (product: Product): string[] => {
  const baseImages = [
    product.image,
    "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
  ];
  return baseImages;
};

// Mock specifications
const specifications = [
  { label: "Diameter", value: "1.75mm" },
  { label: "Tolerance", value: "+/- 0.05mm" },
  { label: "Print Temp", value: "205-225°C" },
  { label: "Bed Temp", value: "50-60°C" },
  { label: "Spool Weight", value: "500g" },
  { label: "Material", value: "PLA Composite" },
];

// Mock reviews
const reviews = [
  {
    id: "1",
    author: "John D.",
    rating: 5,
    date: "Nov 15, 2024",
    comment:
      "Excellent quality filament! The colors are vibrant and it prints beautifully. No clogging issues at all.",
  },
  {
    id: "2",
    author: "Sarah M.",
    rating: 4,
    date: "Nov 10, 2024",
    comment:
      "Great filament for the price. Slight stringing on some prints but overall very satisfied.",
  },
  {
    id: "3",
    author: "Mike R.",
    rating: 5,
    date: "Nov 5, 2024",
    comment:
      "This is my go-to filament now. Consistent diameter and amazing finish on prints.",
  },
];

type TabType = "description" | "specifications" | "reviews";

interface ImageCarouselProps {
  images: string[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

function ImageCarousel({ images, activeIndex, onIndexChange }: ImageCarouselProps) {
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / SCREEN_WIDTH);
    if (index !== activeIndex && index >= 0 && index < images.length) {
      onIndexChange(index);
    }
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    onIndexChange(index);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.carouselImageContainer}>
            <Image
              source={{ uri: item }}
              style={styles.carouselImage}
              resizeMode="cover"
            />
          </View>
        )}
      />
      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
      {/* Thumbnail Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.thumbnailContainer}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToIndex(index)}
            style={[
              styles.thumbnail,
              index === activeIndex && styles.thumbnailActive,
            ]}
          >
            <Image
              source={{ uri: image }}
              style={styles.thumbnailImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

function QuantitySelector({ quantity, onDecrease, onIncrease }: QuantitySelectorProps) {
  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={onDecrease}
        disabled={quantity <= 1}
      >
        <Minus size={18} color={quantity <= 1 ? COLORS.textLight : COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity style={styles.quantityButton} onPress={onIncrease}>
        <Plus size={18} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );
}

interface StarRatingProps {
  rating: number;
  size?: number;
}

function StarRating({ rating, size = 16 }: StarRatingProps) {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          color={star <= rating ? COLORS.starFilled : COLORS.starEmpty}
          fill={star <= rating ? COLORS.starFilled : "transparent"}
        />
      ))}
    </View>
  );
}

interface TabContentProps {
  activeTab: TabType;
  product: Product;
}

function TabContent({ activeTab, product }: TabContentProps) {
  if (activeTab === "description") {
    return (
      <View style={styles.tabContentSection}>
        <Text style={styles.descriptionText}>
          {product.description || "No description available."}
        </Text>
        <Text style={styles.descriptionText}>
          {"\n"}Our premium filaments are manufactured with precision to ensure
          consistent diameter and optimal printing results. Each spool is
          vacuum-sealed to prevent moisture absorption and maintain filament
          quality.
        </Text>
        <Text style={styles.descriptionText}>
          {"\n"}Perfect for both beginners and professionals, this filament
          offers excellent layer adhesion, minimal warping, and a beautiful
          finish on your 3D printed parts.
        </Text>
      </View>
    );
  }

  if (activeTab === "specifications") {
    return (
      <View style={styles.tabContentSection}>
        {specifications.map((spec, index) => (
          <View
            key={index}
            style={[
              styles.specRow,
              index < specifications.length - 1 && styles.specRowBorder,
            ]}
          >
            <Text style={styles.specLabel}>{spec.label}</Text>
            <Text style={styles.specValue}>{spec.value}</Text>
          </View>
        ))}
      </View>
    );
  }

  if (activeTab === "reviews") {
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    return (
      <View style={styles.tabContentSection}>
        <View style={styles.reviewsSummary}>
          <Text style={styles.avgRating}>{avgRating.toFixed(1)}</Text>
          <StarRating rating={Math.round(avgRating)} size={20} />
          <Text style={styles.reviewCount}>({reviews.length} reviews)</Text>
        </View>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewAuthor}>{review.author}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            <StarRating rating={review.rating} />
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>
    );
  }

  return null;
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const { addToCart, getItemCount } = useCart();

  const product = getProductById(id || "");
  const itemCount = getItemCount();

  const handleCartPress = () => {
    router.push("/cart");
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        quantity
      );
      setQuantity(1); // Reset quantity after adding
    }
  };

  if (!product) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const images = getProductImages(product);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {product.name}
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Search size={22} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleCartPress}>
            <ShoppingCart size={22} color={COLORS.text} />
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

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Carousel */}
        <ImageCarousel
          images={images}
          activeIndex={activeImageIndex}
          onIndexChange={setActiveImageIndex}
        />

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.name}</Text>
          {product.sku && (
            <Text style={styles.productSku}>SKU: {product.sku}</Text>
          )}
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>
              ${product.price.toFixed(2)}
            </Text>
            <Text style={styles.priceNote}>for Core / 50g Coils</Text>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantityRow}>
            <QuantitySelector
              quantity={quantity}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
            />
            <TouchableOpacity style={styles.inlineAddButton} onPress={handleAddToCart}>
              <Text style={styles.inlineAddButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "description" && styles.tabActive]}
            onPress={() => setActiveTab("description")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "description" && styles.tabTextActive,
              ]}
            >
              Description
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "specifications" && styles.tabActive,
            ]}
            onPress={() => setActiveTab("specifications")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "specifications" && styles.tabTextActive,
              ]}
            >
              Specifications
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "reviews" && styles.tabActive]}
            onPress={() => setActiveTab("reviews")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "reviews" && styles.tabTextActive,
              ]}
            >
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <TabContent activeTab={activeTab} product={product} />
      </ScrollView>

      {/* Sticky Footer */}
      <View style={[styles.stickyFooter, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
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
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 16,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  backButtonText: {
    color: COLORS.background,
    fontWeight: "600",
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 12,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  headerRight: {
    flexDirection: "row",
  },
  cartBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: COLORS.background,
    fontSize: 10,
    fontWeight: "700",
  },
  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  // Image Carousel
  carouselImageContainer: {
    width: SCREEN_WIDTH,
    aspectRatio: 1,
    backgroundColor: "#F9FAFB",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  paginationDotActive: {
    backgroundColor: COLORS.text,
  },
  thumbnailContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
    marginRight: 8,
  },
  thumbnailActive: {
    borderColor: COLORS.primary,
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  // Product Info
  productInfo: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
    lineHeight: 28,
  },
  productSku: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
  },
  priceNote: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginLeft: 8,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  quantityButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    minWidth: 32,
    textAlign: "center",
  },
  inlineAddButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  inlineAddButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "600",
  },
  // Tabs
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    paddingVertical: 16,
    marginRight: 24,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.text,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: COLORS.text,
    fontWeight: "600",
  },
  // Tab Content
  tabContentSection: {
    padding: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  specRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  specLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  specValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  // Reviews
  reviewsSummary: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  avgRating: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
  },
  reviewCount: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  starContainer: {
    flexDirection: "row",
    gap: 2,
  },
  reviewCard: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  reviewAuthor: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  reviewDate: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  reviewComment: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
    marginTop: 8,
  },
  // Sticky Footer
  stickyFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  addToCartText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "700",
  },
});
