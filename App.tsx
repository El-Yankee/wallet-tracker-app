import React, { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "./src/Components/AppHeader";
import { TotalsScreen } from "./src/Screens/TotalsScreen";
import { WalletsScreen } from "./src/Screens/WalletsScreen";
import { TransactionsScreen } from "./src/Screens/TransactionsScreen";
import { NotesScreen } from "./src/Screens/NotesScreen";
import { AppProvider, useAppContext } from "./src/Context/AppContext";
import { styles, darkStyles } from "./src/Styles/AppStyles";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs: React.FC = () => {
  const { isDarkMode } = useAppContext();
  const currentStyles = isDarkMode ? darkStyles : styles;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: currentStyles.bottomNav,
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "home-outline";
          if (route.name === "Totals") iconName = "home-outline";
          if (route.name === "Wallets") iconName = "wallet-outline";
          if (route.name === "Transactions") iconName = "receipt-outline";
          if (route.name === "Notes") iconName = "document-text-outline";
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: currentStyles.iconColor.color,
        tabBarLabelStyle: currentStyles.navText,
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
    <SafeAreaView
      style={[
        currentStyles.safeArea,
        { backgroundColor: currentStyles.background.backgroundColor },
      ]}
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
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
