"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAppContext } from "../../Context/AppContext";
import type { Transaction, TransactionForm } from "../../Types";
import { TRANSACTION_TYPES } from "../../Constants";
import { getCurrentDate } from "../../Utils/helpers";
import { styles, darkStyles } from "../../Styles/AppStyles";

interface TransactionModalProps {
  visible: boolean;
  onClose: () => void;
  editingTransaction: Transaction | null;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  visible,
  onClose,
  editingTransaction,
}) => {
  const { transactions, setTransactions, wallets, totals, isDarkMode } =
    useAppContext();
  const [form, setForm] = useState<TransactionForm>({
    description: "",
    amount: "",
    walletId: "",
    totalId: "",
    type: "expense",
    date: getCurrentDate(),
  });
  const currentStyles = isDarkMode ? darkStyles : styles;

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        description: editingTransaction.description,
        amount: Math.abs(editingTransaction.amount).toString(),
        walletId: editingTransaction.walletId.toString(),
        totalId: editingTransaction.totalId.toString(),
        type: editingTransaction.type,
        date: editingTransaction.date,
      });
    } else {
      setForm({
        description: "",
        amount: "",
        walletId: "",
        totalId: "",
        type: "expense",
        date: getCurrentDate(),
      });
    }
  }, [editingTransaction, visible]);

  const handleSave = () => {
    if (
      !form.description.trim() ||
      !form.amount.trim() ||
      !form.walletId ||
      !form.totalId
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const amount =
      form.type === "expense"
        ? -Math.abs(Number.parseFloat(form.amount))
        : Math.abs(Number.parseFloat(form.amount));

    const transactionData = {
      description: form.description,
      amount,
      walletId: Number.parseInt(form.walletId),
      totalId: Number.parseInt(form.totalId),
      type: form.type,
      date: form.date,
      status: "pending" as const,
    };

    if (editingTransaction) {
      setTransactions(
        transactions.map((transaction) =>
          transaction.id === editingTransaction.id
            ? { ...transaction, ...transactionData }
            : transaction
        )
      );
    } else {
      setTransactions([
        ...transactions,
        { id: Date.now(), ...transactionData },
      ]);
    }

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={currentStyles.modalOverlay}>
        <View style={currentStyles.modalContent}>
          <Text style={currentStyles.modalTitle}>
            {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
          </Text>

          <TextInput
            style={currentStyles.input}
            placeholder="Description (e.g., Grocery Shopping)"
            placeholderTextColor={currentStyles.placeholderColor.color}
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
          />

          <TextInput
            style={currentStyles.input}
            placeholder="Amount"
            placeholderTextColor={currentStyles.placeholderColor.color}
            value={form.amount}
            onChangeText={(text) => setForm({ ...form, amount: text })}
            keyboardType="numeric"
          />

          <Text style={currentStyles.inputLabel}>Type</Text>
          <View style={currentStyles.pickerContainer}>
            <Picker
              selectedValue={form.type}
              onValueChange={(value) => setForm({ ...form, type: value })}
              style={currentStyles.picker}
            >
              {TRANSACTION_TYPES.map((type) => (
                <Picker.Item
                  key={type.value}
                  label={type.label}
                  value={type.value}
                />
              ))}
            </Picker>
          </View>

          <Text style={currentStyles.inputLabel}>Wallet</Text>
          <View style={currentStyles.pickerContainer}>
            <Picker
              selectedValue={form.walletId}
              onValueChange={(value) => setForm({ ...form, walletId: value })}
              style={currentStyles.picker}
            >
              <Picker.Item label="Select wallet" value="" />
              {wallets.map((wallet) => (
                <Picker.Item
                  key={wallet.id}
                  label={wallet.name}
                  value={wallet.id.toString()}
                />
              ))}
            </Picker>
          </View>

          <Text style={currentStyles.inputLabel}>Total (Owner)</Text>
          <View style={currentStyles.pickerContainer}>
            <Picker
              selectedValue={form.totalId}
              onValueChange={(value) => setForm({ ...form, totalId: value })}
              style={currentStyles.picker}
            >
              <Picker.Item label="Select total" value="" />
              {totals.map((total) => (
                <Picker.Item
                  key={total.id}
                  label={total.name}
                  value={total.id.toString()}
                />
              ))}
            </Picker>
          </View>

          <TextInput
            style={currentStyles.input}
            placeholder="Date (YYYY-MM-DD)"
            placeholderTextColor={currentStyles.placeholderColor.color}
            value={form.date}
            onChangeText={(text) => setForm({ ...form, date: text })}
          />

          <View style={currentStyles.modalActions}>
            <TouchableOpacity
              style={currentStyles.cancelButton}
              onPress={onClose}
            >
              <Text style={currentStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={currentStyles.saveButton}
              onPress={handleSave}
            >
              <Text style={currentStyles.saveButtonText}>
                {editingTransaction ? "Update" : "Add"} Transaction
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
