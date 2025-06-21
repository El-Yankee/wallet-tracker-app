export interface Total {
  id: number;
  name: string;
  amount: number;
  color: string;
}

export interface Wallet {
  id: number;
  name: string;
  amount: number;
  type: "cash" | "credit" | "bank" | "digital";
  icon: string;
}

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  walletId: number;
  totalId: number;
  date: string;
  type: "income" | "expense";
  status: "pending" | "accepted" | "cancelled";
}

export interface Note {
  id: number;
  title: string;
  content: string;
}

export type TabType = "totals" | "wallets" | "transactions" | "notes";

export interface TotalForm {
  name: string;
  amount: string;
  color: string;
}

export interface WalletForm {
  name: string;
  amount: string;
  type: "cash" | "credit" | "bank" | "digital";
}

export interface TransactionForm {
  description: string;
  amount: string;
  walletId: string;
  totalId: string;
  type: "income" | "expense";
  date: string;
}

export interface NoteForm {
  title: string;
  content: string;
}
