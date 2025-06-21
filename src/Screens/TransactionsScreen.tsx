"use client";

import type React from "react";
import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../Context/AppContext";
import { TransactionModal } from "../Components/Modals/TransactionModal";
import { TransactionCard } from "../Components/TransactionCard";
import type { Transaction } from "../Types";
import { styles, darkStyles } from "../Styles/AppStyles";

export const TransactionsScreen: React.FC = () => {
  const {
    transactions,
    setTransactions,
    wallets,
    setWallets,
    totals,
    setTotals,
    isDarkMode,
  } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const currentStyles = isDarkMode ? darkStyles : styles;

  const pendingTransactions = transactions.filter(
    (t) => t.status === "pending"
  );
  const acceptedTransactions = transactions.filter(
    (t) => t.status === "accepted"
  );
  const cancelledTransactions = transactions.filter(
    (t) => t.status === "cancelled"
  );

  const openAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const openEditModal = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const acceptTransaction = (transactionId: number) => {
    const transaction = transactions.find((t) => t.id === transactionId);
    if (!transaction || transaction.status !== "pending") return;

    // Update wallet balance
    setWallets(
      wallets.map((wallet) =>
        wallet.id === transaction.walletId
          ? { ...wallet, amount: wallet.amount + transaction.amount }
          : wallet
      )
    );

    // Update total balance
    setTotals(
      totals.map((total) =>
        total.id === transaction.totalId
          ? { ...total, amount: total.amount + transaction.amount }
          : total
      )
    );

    // Update transaction status
    setTransactions(
      transactions.map((t) =>
        t.id === transactionId ? { ...t, status: "accepted" as const } : t
      )
    );
  };

  const cancelTransaction = (transactionId: number) => {
    setTransactions(
      transactions.map((t) =>
        t.id === transactionId ? { ...t, status: "cancelled" as const } : t
      )
    );
  };

  const deleteTransaction = (transactionId: number) => {
    setTransactions(transactions.filter((t) => t.id !== transactionId));
  };

  const clearTransactionHistory = () => {
    Alert.alert(
      "Clear Transaction History",
      "This will delete all accepted and cancelled transactions. Pending transactions will remain. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            setTransactions(transactions.filter((t) => t.status === "pending"));
          },
        },
      ]
    );
  };

  const renderSection = (
    title: string,
    transactions: Transaction[],
    cardStyle?: any
  ) => {
    if (transactions.length === 0) return null;

    return (
      <View>
        <Text style={currentStyles.sectionTitle}>{title}</Text>
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onEdit={openEditModal}
            onAccept={acceptTransaction}
            onCancel={cancelTransaction}
            onDelete={deleteTransaction}
            style={cardStyle}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={currentStyles.content}>
      <ScrollView style={currentStyles.container}>
        <View style={currentStyles.header}>
          <Text style={currentStyles.headerTitle}>Transactions</Text>
          <View style={currentStyles.headerActions}>
            <TouchableOpacity
              onPress={clearTransactionHistory}
              style={currentStyles.clearButton}
            >
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openAddModal}
              style={currentStyles.addButton}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {renderSection(
          "Pending Approval",
          pendingTransactions,
          currentStyles.pendingCard
        )}
        {renderSection(
          "Accepted",
          acceptedTransactions,
          currentStyles.acceptedCard
        )}
        {renderSection(
          "Cancelled",
          cancelledTransactions,
          currentStyles.cancelledCard
        )}
      </ScrollView>

      <TransactionModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingTransaction={editingTransaction}
      />
    </View>
  );
};
