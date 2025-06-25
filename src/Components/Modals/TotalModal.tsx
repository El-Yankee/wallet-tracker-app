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
} from "react-native";
import { useAppContext } from "../../Context/AppContext";
import type { Total, TotalForm } from "../../Types";
import { COLOR_OPTIONS } from "../../Constants";
import { styles, darkStyles } from "../../Styles/AppStyles";

interface TotalModalProps {
  visible: boolean;
  onClose: () => void;
  editingTotal: Total | null;
}

export const TotalModal: React.FC<TotalModalProps> = ({
  visible,
  onClose,
  editingTotal,
}) => {
  const { totals, setTotals, isDarkMode } = useAppContext();
  const [form, setForm] = useState<TotalForm>({
    name: "",
    amount: "",
    color: COLOR_OPTIONS[0],
  });
  const currentStyles = isDarkMode ? darkStyles : styles;

  useEffect(() => {
    if (editingTotal) {
      setForm({
        name: editingTotal.name,
        amount: editingTotal.amount.toString(),
        color: editingTotal.color,
      });
    } else {
      setForm({
        name: "",
        amount: "",
        color: COLOR_OPTIONS[0],
      });
    }
  }, [editingTotal, visible]);

  const handleSave = () => {
    if (!form.name.trim() || !form.amount.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const totalData = {
      name: form.name,
      amount: Number.parseFloat(form.amount),
      color: form.color,
    };

    if (editingTotal) {
      setTotals(
        totals.map((total) =>
          total.id === editingTotal.id ? { ...total, ...totalData } : total
        )
      );
    } else {
      setTotals([...totals, { id: Date.now(), ...totalData }]);
    }

    onClose();
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
        <View style={currentStyles.modalContent}>
          <Text style={currentStyles.modalTitle}>
            {editingTotal ? "Edit Total" : "Add New Total"}
          </Text>

          <TextInput
            style={currentStyles.input}
            placeholder="Total name (e.g., My Money)"
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

          <Text style={currentStyles.inputLabel}>Color</Text>
          <View style={currentStyles.colorPicker}>
            {COLOR_OPTIONS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  currentStyles.colorOption,
                  { backgroundColor: color },
                  form.color === color && currentStyles.selectedColor,
                ]}
                onPress={() => setForm({ ...form, color })}
              />
            ))}
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
                {editingTotal ? "Update" : "Add"} Total
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
