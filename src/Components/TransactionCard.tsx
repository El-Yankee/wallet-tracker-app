import type React from "react";
import { View, Text, TouchableOpacity, type ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../Context/AppContext";
import type { Transaction } from "../Types";
import { getWalletName, getTotalName, formatCurrency } from "../Utils/helpers";
import { styles, darkStyles } from "../Styles/AppStyles";

interface TransactionCardProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onAccept: (id: number) => void;
  onCancel: (id: number) => void;
  onDelete: (id: number) => void;
  style?: ViewStyle;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onEdit,
  onAccept,
  onCancel,
  onDelete,
  style,
}) => {
  const { wallets, totals, isDarkMode } = useAppContext();
  const currentStyles = isDarkMode ? darkStyles : styles;

  const getStatusIcon = () => {
    switch (transaction.status) {
      case "pending":
        return <Ionicons name="time-outline" size={20} color="#f59e0b" />;
      case "accepted":
        return (
          <Ionicons
            name={
              transaction.type === "income"
                ? "trending-up-outline"
                : "trending-down-outline"
            }
            size={20}
            color={transaction.amount > 0 ? "#10b981" : "#ef4444"}
          />
        );
      case "cancelled":
        return <Ionicons name="close-outline" size={20} color="#ef4444" />;
      default:
        return null;
    }
  };

  const renderActions = () => {
    if (transaction.status === "pending") {
      return (
        <View style={currentStyles.transactionActions}>
          <TouchableOpacity
            onPress={() => onAccept(transaction.id)}
            style={currentStyles.acceptButton}
          >
            <Ionicons name="checkmark" size={16} color="#fff" />
            <Text style={currentStyles.actionButtonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onEdit(transaction)}
            style={currentStyles.editButton}
          >
            <Ionicons
              name="create-outline"
              size={16}
              color={currentStyles.iconColor.color}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onCancel(transaction.id)}
            style={currentStyles.cancelButton}
          >
            <Ionicons name="close-outline" size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
      );
    }

    if (transaction.status === "cancelled") {
      return (
        <TouchableOpacity onPress={() => onDelete(transaction.id)}>
          <Ionicons name="trash-outline" size={16} color="#ef4444" />
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View style={[currentStyles.card, style]}>
      <View style={currentStyles.transactionHeader}>
        <View style={currentStyles.transactionLeft}>
          {getStatusIcon()}
          <Text
            style={[
              currentStyles.cardTitle,
              transaction.status === "cancelled" && currentStyles.cancelledText,
            ]}
          >
            {transaction.description}
          </Text>
        </View>
        <View style={currentStyles.cardRight}>
          <Text
            style={[
              currentStyles.transactionAmount,
              transaction.amount > 0
                ? currentStyles.incomeAmount
                : currentStyles.expenseAmount,
              transaction.status === "cancelled" && currentStyles.cancelledText,
            ]}
          >
            {transaction.amount > 0 ? "+" : ""}
            {formatCurrency(Math.abs(transaction.amount))}
          </Text>
          {transaction.status === "cancelled" && renderActions()}
        </View>
      </View>
      <View style={currentStyles.transactionDetails}>
        <Text style={currentStyles.transactionDetail}>
          Wallet: {getWalletName(wallets, transaction.walletId)}
        </Text>
        <Text style={currentStyles.transactionDetail}>
          Total: {getTotalName(totals, transaction.totalId)}
        </Text>
        <Text style={currentStyles.transactionDetail}>
          Date: {transaction.date}
        </Text>
      </View>
      {transaction.status === "pending" && renderActions()}
    </View>
  );
};
