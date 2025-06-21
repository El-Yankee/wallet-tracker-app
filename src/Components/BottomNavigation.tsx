import type React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../Context/AppContext";
import type { TabType } from "../Types";
import { styles, darkStyles } from "../Styles/AppStyles";

const NAV_ITEMS = [
  {
    key: "totals" as TabType,
    icon: "home-outline" as keyof typeof Ionicons.glyphMap,
    label: "Totals",
  },
  {
    key: "wallets" as TabType,
    icon: "wallet-outline" as keyof typeof Ionicons.glyphMap,
    label: "Wallets",
  },
  {
    key: "transactions" as TabType,
    icon: "receipt-outline" as keyof typeof Ionicons.glyphMap,
    label: "Transactions",
  },
  {
    key: "notes" as TabType,
    icon: "document-text-outline" as keyof typeof Ionicons.glyphMap,
    label: "Notes",
  },
];

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab, isDarkMode } = useAppContext();
  const currentStyles = isDarkMode ? darkStyles : styles;

  return (
    <View style={currentStyles.bottomNav}>
      {NAV_ITEMS.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[
            currentStyles.navItem,
            activeTab === item.key && currentStyles.activeNavItem,
          ]}
          onPress={() => setActiveTab(item.key)}
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={
              activeTab === item.key ? "#3b82f6" : currentStyles.iconColor.color
            }
          />
          <Text
            style={[
              currentStyles.navText,
              activeTab === item.key && currentStyles.activeNavText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
