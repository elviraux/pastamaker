import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SlidersHorizontal } from "lucide-react-native";
import { products, Product } from "@/data/products";

const COLORS = {
  primary: "#108474",
  background: "#FFFFFF",
  text: "#1A1A1A",
  textMuted: "#6B7280",
  border: "#E5E7EB",
};

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  return (
    <View style={styles.productItem}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.productName} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.filterBar}>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={18} color={COLORS.text} />
          <Text style={styles.filterText}>Filters & Sort</Text>
        </TouchableOpacity>
        <Text style={styles.productCount}>{products.length} products</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.productRow}
        renderItem={({ item }) => <ProductItem product={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },
  productCount: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  productList: {
    padding: 16,
  },
  productRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productItem: {
    width: "48%",
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
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
  productName: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.text,
    paddingHorizontal: 12,
    paddingTop: 12,
    height: 50,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 12,
    marginBottom: 12,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  addToCartText: {
    color: COLORS.background,
    fontSize: 13,
    fontWeight: "600",
  },
});
