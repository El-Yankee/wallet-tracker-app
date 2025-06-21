import type React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../Context/AppContext";
import { styles, darkStyles } from "../Styles/AppStyles";

export const DarkModeToggle: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useAppContext();
  const currentStyles = isDarkMode ? darkStyles : styles;

  return (
    <TouchableOpacity
      onPress={() => setIsDarkMode(!isDarkMode)}
      style={currentStyles.darkModeToggle}
    >
      <Ionicons
        name={isDarkMode ? "sunny-outline" : "moon-outline"}
        size={24}
        color={currentStyles.iconColor.color}
      />
    </TouchableOpacity>
  );
};
