"use client";

import type React from "react";
import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../Context/AppContext";
import { TotalModal } from "../Components/Modals/TotalModal";
import type { Total } from "../Types";
import { formatCurrency } from "../Utils/helpers";
import { styles, darkStyles } from "../Styles/AppStyles";

export const TotalsScreen: React.FC = () => {
  const { totals, setTotals, totalAmount, isDarkMode } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTotal, setEditingTotal] = useState<Total | null>(null);
  const currentStyles = isDarkMode ? darkStyles : styles;

  const openAddModal = () => {
    setEditingTotal(null);
    setIsModalOpen(true);
  };

  const openEditModal = (total: Total) => {
    setEditingTotal(total);
    setIsModalOpen(true);
  };

  const deleteTotal = (totalId: number) => {
    Alert.alert("Delete Total", "Are you sure you want to delete this total?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTotals(totals.filter((total) => total.id !== totalId));
        },
      },
    ]);
  };

  return (
    <View style={currentStyles.content}>
      <ScrollView style={currentStyles.container}>
        <View style={currentStyles.header}>
          <Text style={currentStyles.headerTitle}>Money Totals</Text>
          <View style={currentStyles.headerActions}>
            <TouchableOpacity
              onPress={openAddModal}
              style={currentStyles.addButton}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={currentStyles.totalCard}>
          <Text style={currentStyles.totalCardTitle}>Total Balance</Text>
          <Text style={currentStyles.totalAmount}>
            {formatCurrency(totalAmount)}
          </Text>
        </View>

        {totals.map((total) => (
          <View key={total.id} style={currentStyles.card}>
            <View style={currentStyles.cardContent}>
              <View style={currentStyles.cardLeft}>
                <View
                  style={[
                    currentStyles.colorDot,
                    { backgroundColor: total.color },
                  ]}
                />
                <Text style={currentStyles.cardTitle}>{total.name}</Text>
              </View>
              <View style={currentStyles.cardRight}>
                <Text style={currentStyles.cardAmount}>
                  {formatCurrency(total.amount)}
                </Text>
                <View style={currentStyles.cardActions}>
                  <TouchableOpacity onPress={() => openEditModal(total)}>
                    <Ionicons
                      name="create-outline"
                      size={20}
                      color={currentStyles.iconColor.color}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTotal(total.id)}>
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <TotalModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingTotal={editingTotal}
      />
    </View>
  );
};
