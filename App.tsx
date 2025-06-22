import type React from "react";
import { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { AppHeader } from "./src/Components/AppHeader";
import { BottomNavigation } from "./src/Components/BottomNavigation";
import { TotalsScreen } from "./src/Screens/TotalsScreen";
import { WalletsScreen } from "./src/Screens/WalletsScreen";
import { TransactionsScreen } from "./src/Screens/TransactionsScreen";
import { NotesScreen } from "./src/Screens/NotesScreen";
import { AppProvider, useAppContext } from "./src/Context/AppContext";
import { styles, darkStyles } from "./src/Styles/AppStyles";

const AppContent: React.FC = () => {
  const { activeTab, isDarkMode, loadAllData } = useAppContext();
  const currentStyles = isDarkMode ? darkStyles : styles;

  useEffect(() => {
    loadAllData();
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case "totals":
        return <TotalsScreen />;
      case "wallets":
        return <WalletsScreen />;
      case "transactions":
        return <TransactionsScreen />;
      case "notes":
        return <NotesScreen />;
      default:
        return <TotalsScreen />;
    }
  };

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
      {renderScreen()}
      <BottomNavigation />
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
