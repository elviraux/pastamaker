import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Clock, ArrowRight } from "lucide-react-native";

const COLORS = {
  primary: "#108474",
  background: "#FFFFFF",
  text: "#1A1A1A",
  textMuted: "#6B7280",
  border: "#E5E7EB",
};

const blogPosts = [
  {
    id: "1",
    title: "How to Polish Metal Filament Prints for a Mirror Finish",
    excerpt: "Learn the techniques professionals use to get that perfect metallic shine on your 3D printed parts.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    readTime: "8 min read",
    category: "Tutorial",
    date: "Dec 5, 2024",
  },
  {
    id: "2",
    title: "Creating Beautiful Patinas on Copper and Bronze Prints",
    excerpt: "Discover how to age your metal composite prints for an authentic vintage look.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    readTime: "6 min read",
    category: "Guide",
    date: "Dec 3, 2024",
  },
  {
    id: "3",
    title: "HTPLA vs PLA: When to Use Each Filament Type",
    excerpt: "A comprehensive comparison to help you choose the right material for your project.",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&h=400&fit=crop",
    readTime: "5 min read",
    category: "Comparison",
    date: "Nov 28, 2024",
  },
  {
    id: "4",
    title: "Print Settings for Perfect Metal Filament Results",
    excerpt: "Optimize your slicer settings for the best results with our metal composite filaments.",
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&h=400&fit=crop",
    readTime: "10 min read",
    category: "Technical",
    date: "Nov 25, 2024",
  },
];

interface BlogCardProps {
  post: typeof blogPosts[0];
  featured?: boolean;
}

function BlogCard({ post, featured }: BlogCardProps) {
  if (featured) {
    return (
      <TouchableOpacity style={styles.featuredCard}>
        <Image
          source={{ uri: post.image }}
          style={styles.featuredImage}
          resizeMode="cover"
        />
        <View style={styles.featuredContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{post.category}</Text>
          </View>
          <Text style={styles.featuredTitle}>{post.title}</Text>
          <Text style={styles.featuredExcerpt}>{post.excerpt}</Text>
          <View style={styles.metaRow}>
            <View style={styles.readTimeContainer}>
              <Clock size={14} color={COLORS.textMuted} />
              <Text style={styles.readTime}>{post.readTime}</Text>
            </View>
            <Text style={styles.date}>{post.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.blogCard}>
      <Image
        source={{ uri: post.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.categoryBadgeSmall}>
          <Text style={styles.categoryTextSmall}>{post.category}</Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {post.title}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.readTimeContainer}>
            <Clock size={12} color={COLORS.textMuted} />
            <Text style={styles.readTimeSmall}>{post.readTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function BlogScreen() {
  const [featuredPost, ...otherPosts] = blogPosts;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Protopasta Blog</Text>
        <Text style={styles.subtitle}>
          Tips, tutorials, and inspiration for 3D printing
        </Text>
      </View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>FEATURED</Text>
        <BlogCard post={featuredPost} featured />
      </View>

      <View style={styles.articlesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>LATEST ARTICLES</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <ArrowRight size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.articlesGrid}>
          {otherPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  featuredSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: 1,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primary,
  },
  featuredCard: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featuredImage: {
    width: "100%",
    height: 200,
  },
  featuredContent: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  featuredExcerpt: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  readTime: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  readTimeSmall: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  date: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  articlesSection: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  articlesGrid: {
    gap: 16,
  },
  blogCard: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  categoryBadgeSmall: {
    alignSelf: "flex-start",
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  categoryTextSmall: {
    fontSize: 9,
    fontWeight: "600",
    color: COLORS.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    lineHeight: 18,
    marginBottom: 6,
  },
});
