"use client";

import type React from "react";
import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../Context/AppContext";
import { NoteModal } from "../Components/Modals/NoteModal";
import type { Note } from "../Types";
import { styles, darkStyles } from "../Styles/AppStyles";

export const NotesScreen: React.FC = () => {
  const { notes, setNotes, isDarkMode } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const currentStyles = isDarkMode ? darkStyles : styles;

  const openAddModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const deleteNote = (noteId: number) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setNotes(notes.filter((note) => note.id !== noteId));
        },
      },
    ]);
  };

  return (
    <View style={currentStyles.content}>
      <ScrollView style={currentStyles.container}>
        <View style={currentStyles.header}>
          <Text style={currentStyles.headerTitle}>Notes</Text>
          <TouchableOpacity
            onPress={openAddModal}
            style={currentStyles.addButton}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {notes.map((note) => (
          <View key={note.id} style={currentStyles.card}>
            <View style={currentStyles.noteHeader}>
              <Text style={currentStyles.cardTitle}>{note.title}</Text>
              <View style={currentStyles.cardActions}>
                <TouchableOpacity onPress={() => openEditModal(note)}>
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color={currentStyles.iconColor.color}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNote(note.id)}>
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={currentStyles.noteContent}>{note.content}</Text>
          </View>
        ))}
      </ScrollView>

      <NoteModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingNote={editingNote}
      />
    </View>
  );
};
