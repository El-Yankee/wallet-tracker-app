import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../Context/AppContext";
import { WalletModal } from "../Components/Modals/WalletModal";
import type { Wallet } from "../Types";
import { formatCurrency } from "../Utils/helpers";
import { styles, darkStyles } from "../Styles/AppStyles";

const getWalletIcon = (type: string) => {
  switch (type) {
    case "cash":
      return "cash-outline";
    case "credit":
      return "card-outline";
    case "bank":
      return "business-outline";
    case "digital":
      return "phone-portrait-outline";
    default:
      return "wallet-outline";
  }
};

export const WalletsScreen: React.FC = () => {
  const { wallets, setWallets, isDarkMode } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWallet, setEditingWallet] = useState<Wallet | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "amount">("name");
  const currentStyles = isDarkMode ? darkStyles : styles;

  const openAddModal = () => {
    setEditingWallet(null);
    setIsModalOpen(true);
  };

  const openEditModal = (wallet: Wallet) => {
    setEditingWallet(wallet);
    setIsModalOpen(true);
  };

  const deleteWallet = (walletId: number) => {
    Alert.alert(
      "Delete Wallet",
      "Are you sure you want to delete this wallet?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setWallets(wallets.filter((wallet) => wallet.id !== walletId));
          },
        },
      ]
    );
  };

  // Ordenar wallets según el criterio seleccionado
  const sortedWallets = useMemo(() => {
    return [...wallets].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "amount") {
        return b.amount - a.amount;
      }
      return 0;
    });
  }, [wallets, sortBy]);

  return (
    <View style={currentStyles.content}>
      <ScrollView style={currentStyles.container}>
        <View style={currentStyles.header}>
          <Text style={currentStyles.headerTitle}>My Wallets</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => setSortBy(sortBy === "name" ? "amount" : "name")}
              style={{
                marginRight: 8,
                backgroundColor: "#e5e7eb",
                borderRadius: 20,
                padding: 6,
              }}
            >
              <Ionicons
                name={sortBy === "name" ? "text-outline" : "cash-outline"}
                size={20}
                color={currentStyles.iconColor.color}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openAddModal}
              style={currentStyles.addButton}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {sortedWallets.map((wallet) => (
          <View key={wallet.id} style={currentStyles.card}>
            <View style={currentStyles.cardContent}>
              <View style={currentStyles.cardLeft}>
                <Ionicons
                  name={
                    getWalletIcon(wallet.type) as keyof typeof Ionicons.glyphMap
                  }
                  size={24}
                  color={currentStyles.iconColor.color}
                />
                <View style={currentStyles.cardInfo}>
                  <Text style={currentStyles.cardTitle}>{wallet.name}</Text>
                  <Text style={currentStyles.cardSubtitle}>{wallet.type}</Text>
                </View>
              </View>
              <View style={currentStyles.cardRight}>
                <Text style={currentStyles.cardAmount}>
                  {formatCurrency(wallet.amount)}
                </Text>
                <View style={currentStyles.cardActions}>
                  <TouchableOpacity onPress={() => openEditModal(wallet)}>
                    <Ionicons
                      name="create-outline"
                      size={20}
                      color={currentStyles.iconColor.color}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteWallet(wallet.id)}>
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <WalletModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingWallet={editingWallet}
      />
    </View>
  );
};
