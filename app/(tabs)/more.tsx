import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react-native";

const COLORS = {
  primary: "#108474",
  background: "#FFFFFF",
  text: "#1A1A1A",
  textMuted: "#6B7280",
  border: "#E5E7EB",
  danger: "#EF4444",
};

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showBorder?: boolean;
  danger?: boolean;
}

function MenuItem({ icon, title, subtitle, onPress, showBorder = true, danger }: MenuItemProps) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, showBorder && styles.menuItemBorder]}
      onPress={onPress}
    >
      <View style={[styles.menuIcon, danger && styles.menuIconDanger]}>
        {icon}
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, danger && styles.menuTitleDanger]}>
          {title}
        </Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <ChevronRight size={20} color={COLORS.textMuted} />
    </TouchableOpacity>
  );
}

interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
}

function MenuSection({ title, children }: MenuSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

export default function MoreScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <User size={32} color={COLORS.background} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Guest User</Text>
          <TouchableOpacity>
            <Text style={styles.signInText}>Sign in or create account</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MenuSection title="MY ACCOUNT">
        <MenuItem
          icon={<Package size={22} color={COLORS.text} />}
          title="Orders"
          subtitle="View order history and track shipments"
        />
        <MenuItem
          icon={<Heart size={22} color={COLORS.text} />}
          title="Wishlist"
          subtitle="Saved items for later"
        />
        <MenuItem
          icon={<MapPin size={22} color={COLORS.text} />}
          title="Addresses"
          subtitle="Manage shipping addresses"
        />
        <MenuItem
          icon={<CreditCard size={22} color={COLORS.text} />}
          title="Payment Methods"
          subtitle="Manage saved payment options"
          showBorder={false}
        />
      </MenuSection>

      <MenuSection title="SETTINGS">
        <MenuItem
          icon={<Bell size={22} color={COLORS.text} />}
          title="Notifications"
          subtitle="Manage push notifications"
        />
        <MenuItem
          icon={<Shield size={22} color={COLORS.text} />}
          title="Privacy"
          subtitle="Control your data and privacy"
          showBorder={false}
        />
      </MenuSection>

      <MenuSection title="SUPPORT">
        <MenuItem
          icon={<HelpCircle size={22} color={COLORS.text} />}
          title="Help Center"
          subtitle="FAQs and support articles"
        />
        <MenuItem
          icon={<FileText size={22} color={COLORS.text} />}
          title="Terms & Conditions"
        />
        <MenuItem
          icon={<Shield size={22} color={COLORS.text} />}
          title="Privacy Policy"
          showBorder={false}
        />
      </MenuSection>

      <View style={styles.logoutSection}>
        <MenuItem
          icon={<LogOut size={22} color={COLORS.danger} />}
          title="Sign Out"
          showBorder={false}
          danger
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Protopasta v1.0.0</Text>
        <Text style={styles.footerSubtext}>Made with filament</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.background,
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  signInText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "500",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: COLORS.background,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  menuIconDanger: {
    backgroundColor: `${COLORS.danger}15`,
  },
  menuContent: {
    flex: 1,
    marginLeft: 14,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text,
  },
  menuTitleDanger: {
    color: COLORS.danger,
  },
  menuSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  logoutSection: {
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: COLORS.background,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: "500",
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
  },
});
