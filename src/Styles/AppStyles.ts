import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  background: {
    backgroundColor: "#f9fafb",
  },
  appHeader: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
  },
  content: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  darkModeToggle: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  addButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#fef2f2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  totalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#10b981",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pendingCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  acceptedCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#10b981",
  },
  cancelledCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
    opacity: 0.6,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardInfo: {
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  cardAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
    marginTop: 8,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  incomeAmount: {
    color: "#10b981",
  },
  expenseAmount: {
    color: "#ef4444",
  },
  transactionDetails: {
    marginBottom: 12,
  },
  transactionDetail: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 2,
  },
  transactionActions: {
    flexDirection: "row",
    gap: 8,
  },
  acceptButton: {
    backgroundColor: "#10b981",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  editButton: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: "#fef2f2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  cancelledText: {
    textDecorationLine: "line-through",
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: "#eff6ff",
    borderRadius: 8,
  },
  navText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  activeNavText: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  iconColor: {
    color: "#6b7280",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
    color: "#111827",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    color: "#111827",
  },
  colorPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: "#374151",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  cancelButtonText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  placeholderColor: {
    color: "#9ca3af",
  },
});

export const darkStyles = StyleSheet.create({
  ...styles,
  safeArea: {
    ...styles.safeArea,
    backgroundColor: "#111827",
  },
  background: {
    backgroundColor: "#111827",
  },
  appHeader: {
    ...styles.appHeader,
    backgroundColor: "#1f2937",
    borderBottomColor: "#374151",
  },
  appTitle: {
    ...styles.appTitle,
    color: "#f9fafb",
  },
  container: {
    ...styles.container,
    backgroundColor: "#111827",
  },
  headerTitle: {
    ...styles.headerTitle,
    color: "#f9fafb",
  },
  darkModeToggle: {
    ...styles.darkModeToggle,
    backgroundColor: "#374151",
  },
  totalCard: {
    ...styles.totalCard,
    backgroundColor: "#1f2937",
  },
  totalCardTitle: {
    ...styles.totalCardTitle,
    color: "#9ca3af",
  },
  card: {
    ...styles.card,
    backgroundColor: "#1f2937",
  },
  cardTitle: {
    ...styles.cardTitle,
    color: "#f9fafb",
  },
  cardSubtitle: {
    ...styles.cardSubtitle,
    color: "#9ca3af",
  },
  cardAmount: {
    ...styles.cardAmount,
    color: "#f9fafb",
  },
  sectionTitle: {
    ...styles.sectionTitle,
    color: "#f9fafb",
  },
  transactionDetail: {
    ...styles.transactionDetail,
    color: "#9ca3af",
  },
  noteContent: {
    ...styles.noteContent,
    color: "#9ca3af",
  },
  bottomNav: {
    ...styles.bottomNav,
    backgroundColor: "#1f2937",
    borderTopColor: "#374151",
  },
  navText: {
    ...styles.navText,
    color: "#9ca3af",
  },
  iconColor: {
    color: "#9ca3af",
  },
  modalContent: {
    ...styles.modalContent,
    backgroundColor: "#1f2937",
  },
  modalTitle: {
    ...styles.modalTitle,
    color: "#f9fafb",
  },
  input: {
    ...styles.input,
    backgroundColor: "#374151",
    borderColor: "#4b5563",
    color: "#f9fafb",
  },
  inputLabel: {
    ...styles.inputLabel,
    color: "#d1d5db",
  },
  pickerContainer: {
    ...styles.pickerContainer,
    backgroundColor: "#374151",
    borderColor: "#4b5563",
  },
  picker: {
    ...styles.picker,
    color: "#f9fafb",
  },
  cancelButtonText: {
    ...styles.cancelButtonText,
    color: "#9ca3af",
  },
  placeholderColor: {
    color: "#6b7280",
  },
});
