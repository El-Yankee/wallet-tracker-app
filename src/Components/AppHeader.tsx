import type React from "react";
import { View, Text } from "react-native";
import { useAppContext } from "../Context/AppContext";
import { styles, darkStyles } from "../Styles/AppStyles";
import { DarkModeToggle } from "./DarkModeToggle";

export const AppHeader: React.FC = () => {
  const { isDarkMode } = useAppContext();
  const currentStyles = isDarkMode ? darkStyles : styles;

  return (
    <View style={currentStyles.appHeader}>
      <Text style={currentStyles.appTitle}>Wallet Tracker</Text>
      <DarkModeToggle />
    </View>
  );
};
