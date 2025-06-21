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
import { useAppContext } from "../../Context/AppContext";
import type { Note, NoteForm } from "../../Types";
import { styles, darkStyles } from "../../Styles/AppStyles";

interface NoteModalProps {
  visible: boolean;
  onClose: () => void;
  editingNote: Note | null;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  visible,
  onClose,
  editingNote,
}) => {
  const { notes, setNotes, isDarkMode } = useAppContext();
  const [form, setForm] = useState<NoteForm>({
    title: "",
    content: "",
  });
  const currentStyles = isDarkMode ? darkStyles : styles;

  useEffect(() => {
    if (editingNote) {
      setForm({
        title: editingNote.title,
        content: editingNote.content,
      });
    } else {
      setForm({
        title: "",
        content: "",
      });
    }
  }, [editingNote, visible]);

  const handleSave = () => {
    if (!form.title.trim() || !form.content.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (editingNote) {
      setNotes(
        notes.map((note) =>
          note.id === editingNote.id ? { ...note, ...form } : note
        )
      );
    } else {
      setNotes([...notes, { id: Date.now(), ...form }]);
    }

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={currentStyles.modalOverlay}>
        <View style={currentStyles.modalContent}>
          <Text style={currentStyles.modalTitle}>
            {editingNote ? "Edit Note" : "Add New Note"}
          </Text>

          <TextInput
            style={currentStyles.input}
            placeholder="Note title"
            placeholderTextColor={currentStyles.placeholderColor.color}
            value={form.title}
            onChangeText={(text) => setForm({ ...form, title: text })}
          />

          <TextInput
            style={[currentStyles.input, currentStyles.textArea]}
            placeholder="Write your note here..."
            placeholderTextColor={currentStyles.placeholderColor.color}
            value={form.content}
            onChangeText={(text) => setForm({ ...form, content: text })}
            multiline
            numberOfLines={4}
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
                {editingNote ? "Update" : "Add"} Note
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
