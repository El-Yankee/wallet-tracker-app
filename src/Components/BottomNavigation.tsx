import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAppContext } from "../Context/AppContext";
import type { TabType } from "../Types";
import { styles, darkStyles } from "../Styles/AppStyles";

const NAV_ITEMS = [
  {
    key: "Totals" as TabType,
    icon: "home-outline" as keyof typeof Ionicons.glyphMap,
    label: "Totals",
  },
  {
    key: "Wallets" as TabType,
    icon: "wallet-outline" as keyof typeof Ionicons.glyphMap,
    label: "Wallets",
  },
  {
    key: "Transactions" as TabType,
    icon: "receipt-outline" as keyof typeof Ionicons.glyphMap,
    label: "Transactions",
  },
  {
    key: "Notes" as TabType,
    icon: "document-text-outline" as keyof typeof Ionicons.glyphMap,
    label: "Notes",
  },
];

export const BottomNavigation: React.FC = () => {
  const { isDarkMode } = useAppContext();
  const currentStyles = isDarkMode ? darkStyles : styles;
  const navigation = useNavigation<NavigationProp<any>>();
  const currentRoute =
    navigation.getState().routes[navigation.getState().index]?.name;

  return (
    <View style={currentStyles.bottomNav}>
      {NAV_ITEMS.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[
            currentStyles.navItem,
            currentRoute === item.key && currentStyles.activeNavItem,
          ]}
          onPress={() => {
            if (currentRoute !== item.key) {
              navigation.navigate(item.key);
            }
          }}
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={
              currentRoute === item.key
                ? "#3b82f6"
                : currentStyles.iconColor.color
            }
          />
          <Text
            style={[
              currentStyles.navText,
              currentRoute === item.key && currentStyles.activeNavText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
