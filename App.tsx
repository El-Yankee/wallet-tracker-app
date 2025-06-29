import React, { useEffect } from "react";
import { StatusBar, TouchableOpacity, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "./src/Components/AppHeader";
import { TotalsScreen } from "./src/Screens/TotalsScreen";
import { WalletsScreen } from "./src/Screens/WalletsScreen";
import { TransactionsScreen } from "./src/Screens/TransactionsScreen";
import { NotesScreen } from "./src/Screens/NotesScreen";
import { AppProvider, useAppContext } from "./src/Context/AppContext";
import { styles, darkStyles } from "./src/Styles/AppStyles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation, position }: any) => {
  const { isDarkMode } = useAppContext();
  const currentStyles = isDarkMode ? darkStyles : styles;

  return (
    <View style={currentStyles.bottomNav}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const isFocused = state.index === index;
        let iconName = "home-outline";
        if (route.name === "Totals") iconName = "home-outline";
        if (route.name === "Wallets") iconName = "wallet-outline";
        if (route.name === "Transactions") iconName = "receipt-outline";
        if (route.name === "Notes") iconName = "document-text-outline";

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={currentStyles.navItem}
          >
            <Ionicons
              name={iconName as any}
              size={22}
              color={isFocused ? "#3b82f6" : currentStyles.iconColor.color}
            />
            <Text
              style={[
                currentStyles.navText,
                isFocused && currentStyles.activeNavText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#3b82f6" },
        swipeEnabled: true,
      }}
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
