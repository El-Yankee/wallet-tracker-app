import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "./src/Components/AppHeader";
import { TotalsScreen } from "./src/Screens/TotalsScreen";
import { WalletsScreen } from "./src/Screens/WalletsScreen";
import { TransactionsScreen } from "./src/Screens/TransactionsScreen";
import { NotesScreen } from "./src/Screens/NotesScreen";
import { AppProvider, useAppContext } from "./src/Context/AppContext";
import { styles, darkStyles } from "./src/Styles/AppStyles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const MainTabs: React.FC = () => {
  const { isDarkMode } = useAppContext();
  const currentStyles = isDarkMode ? darkStyles : styles;

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        swipeEnabled: true,
        tabBarShowIcon: true,
        tabBarStyle: currentStyles.bottomNav,
        tabBarIndicatorStyle: { backgroundColor: "#3b82f6" },
        tabBarIcon: ({ color }) => {
          let iconName = "home-outline";
          if (route.name === "Totals") iconName = "home-outline";
          if (route.name === "Wallets") iconName = "wallet-outline";
          if (route.name === "Transactions") iconName = "receipt-outline";
          if (route.name === "Notes") iconName = "document-text-outline";
          return <Ionicons name={iconName as any} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: currentStyles.iconColor.color,
        tabBarLabelStyle: currentStyles.navText,
        tabBarShowLabel: true,
      })}
    >
      <Tab.Screen name="Totals" component={TotalsScreen} />
      <Tab.Screen name="Wallets" component={WalletsScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
    </Tab.Navigator>
  );
};

const AppContent: React.FC = () => {
  const { isDarkMode, loadAllData } = useAppContext();
  const currentStyles = isDarkMode ? darkStyles : styles;

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          currentStyles.safeArea,
          { backgroundColor: currentStyles.background.backgroundColor },
        ]}
        edges={["top", "bottom"]}
      >
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={currentStyles.background.backgroundColor}
        />
        <AppHeader />
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
