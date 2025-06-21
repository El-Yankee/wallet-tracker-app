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
import type { Wallet, WalletForm } from "../../Types";
import { WALLET_TYPES } from "../../Constants";
import { getIconName } from "../../Utils/helpers";
import { styles, darkStyles } from "../../Styles/AppStyles";

interface WalletModalProps {
  visible: boolean;
  onClose: () => void;
  editingWallet: Wallet | null;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  visible,
  onClose,
  editingWallet,
}) => {
  const { wallets, setWallets, isDarkMode } = useAppContext();
  const [form, setForm] = useState<WalletForm>({
    name: "",
    amount: "",
    type: "cash",
  });
  const currentStyles = isDarkMode ? darkStyles : styles;

  useEffect(() => {
    if (editingWallet) {
      setForm({
        name: editingWallet.name,
        amount: editingWallet.amount.toString(),
        type: editingWallet.type,
      });
    } else {
      setForm({
        name: "",
        amount: "",
        type: "cash",
      });
    }
  }, [editingWallet, visible]);

  const handleSave = () => {
    if (!form.name.trim() || !form.amount.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const walletData = {
      name: form.name,
      amount: Number.parseFloat(form.amount),
      type: form.type,
      icon: getIconName(form.type),
    };

    if (editingWallet) {
      setWallets(
        wallets.map((wallet) =>
          wallet.id === editingWallet.id ? { ...wallet, ...walletData } : wallet
        )
      );
    } else {
      setWallets([...wallets, { id: Date.now(), ...walletData }]);
    }

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={currentStyles.modalOverlay}>
        <View style={currentStyles.modalContent}>
          <Text style={currentStyles.modalTitle}>
            {editingWallet ? "Edit Wallet" : "Add New Wallet"}
          </Text>

          <TextInput
            style={currentStyles.input}
            placeholder="Wallet name (e.g., Chase Credit Card)"
            placeholderTextColor={currentStyles.placeholderColor.color}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />

          <TextInput
            style={currentStyles.input}
            placeholder="Amount"
            placeholderTextColor={currentStyles.placeholderColor.color}
            value={form.amount}
            onChangeText={(text) => setForm({ ...form, amount: text })}
            keyboardType="numeric"
          />

          <Text style={currentStyles.inputLabel}>Wallet Type</Text>
          <View style={currentStyles.pickerContainer}>
            <Picker
              selectedValue={form.type}
              onValueChange={(value) => setForm({ ...form, type: value })}
              style={currentStyles.picker}
            >
              {WALLET_TYPES.map((type) => (
                <Picker.Item
                  key={type.value}
                  label={type.label}
                  value={type.value}
                />
              ))}
            </Picker>
          </View>

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
                {editingWallet ? "Update" : "Add"} Wallet
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
