import type React from "react";
import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  BackHandler,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAppContext } from "../../Context/AppContext";
import type { Transaction, TransactionForm } from "../../Types";
import { TRANSACTION_TYPES } from "../../Constants";
import { getCurrentDate } from "../../Utils/helpers";
import { styles, darkStyles } from "../../Styles/AppStyles";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      setForm({ ...form, date: `${year}-${month}-${day}` });
    }
  };

  useEffect(() => {
    if (!visible) return;
    const onBackPress = () => {
      onClose();
      return true;
    };
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => subscription.remove();
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={currentStyles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%" }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={currentStyles.modalContent}>
              <Text style={currentStyles.modalTitle}>
                {editingTransaction
                  ? "Edit Transaction"
                  : "Add New Transaction"}
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
                  dropdownIconColor={currentStyles.iconColor.color}
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
                  onValueChange={(value) =>
                    setForm({ ...form, walletId: value })
                  }
                  dropdownIconColor={currentStyles.iconColor.color}
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
                  onValueChange={(value) =>
                    setForm({ ...form, totalId: value })
                  }
                  dropdownIconColor={currentStyles.iconColor.color}
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

              <Text style={currentStyles.inputLabel}>Date</Text>
              <TouchableOpacity
                style={currentStyles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text
                  style={{
                    color: form.date
                      ? currentStyles.input.color
                      : currentStyles.placeholderColor.color,
                  }}
                >
                  {form.date || "Select date"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={form.date ? new Date(form.date) : new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleDateChange}
                />
              )}

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
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
