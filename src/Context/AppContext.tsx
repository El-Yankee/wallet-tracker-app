"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Total, Wallet, Transaction, Note, TabType } from "../Types";
import { StorageService } from "../Services/StorageService";
import { STORAGE_KEYS, DEFAULT_DATA } from "../Constants";

interface AppContextType {
  // State
  activeTab: TabType;
  isDarkMode: boolean;
  totals: Total[];
  wallets: Wallet[];
  transactions: Transaction[];
  notes: Note[];

  // Actions
  setActiveTab: (tab: TabType) => void;
  setIsDarkMode: (isDark: boolean) => void;
  setTotals: (totals: Total[]) => void;
  setWallets: (wallets: Wallet[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setNotes: (notes: Note[]) => void;
  loadAllData: () => Promise<void>;

  // Computed values
  totalAmount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>("totals");
  const [isDarkMode, setIsDarkModeState] = useState(false);
  const [totals, setTotalsState] = useState<Total[]>([]);
  const [wallets, setWalletsState] = useState<Wallet[]>([]);
  const [transactions, setTransactionsState] = useState<Transaction[]>([]);
  const [notes, setNotesState] = useState<Note[]>([]);

  const totalAmount = totals.reduce((sum, total) => sum + total.amount, 0);

  // Auto-save when data changes
  useEffect(() => {
    if (totals.length > 0) {
      StorageService.saveData(STORAGE_KEYS.TOTALS, totals);
    }
  }, [totals]);

  useEffect(() => {
    if (wallets.length > 0) {
      StorageService.saveData(STORAGE_KEYS.WALLETS, wallets);
    }
  }, [wallets]);

  useEffect(() => {
    StorageService.saveData(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  useEffect(() => {
    StorageService.saveData(STORAGE_KEYS.NOTES, notes);
  }, [notes]);

  useEffect(() => {
    StorageService.saveData(STORAGE_KEYS.DARK_MODE, isDarkMode);
  }, [isDarkMode]);

  const setIsDarkMode = (isDark: boolean) => {
    setIsDarkModeState(isDark);
  };

  const setTotals = (newTotals: Total[]) => {
    setTotalsState(newTotals);
  };

  const setWallets = (newWallets: Wallet[]) => {
    setWalletsState(newWallets);
  };

  const setTransactions = (newTransactions: Transaction[]) => {
    setTransactionsState(newTransactions);
  };

  const setNotes = (newNotes: Note[]) => {
    setNotesState(newNotes);
  };

  const loadAllData = async () => {
    try {
      const [
        totalsData,
        walletsData,
        transactionsData,
        notesData,
        darkModeData,
      ] = await Promise.all([
        StorageService.loadData<Total[]>(STORAGE_KEYS.TOTALS),
        StorageService.loadData<Wallet[]>(STORAGE_KEYS.WALLETS),
        StorageService.loadData<Transaction[]>(STORAGE_KEYS.TRANSACTIONS),
        StorageService.loadData<Note[]>(STORAGE_KEYS.NOTES),
        StorageService.loadData<boolean>(STORAGE_KEYS.DARK_MODE),
      ]);

      setTotalsState(totalsData || DEFAULT_DATA.totals);
      setWalletsState(walletsData || DEFAULT_DATA.wallets);
      setTransactionsState(transactionsData || []);
      setNotesState(notesData || []);
      setIsDarkModeState(darkModeData || false);
    } catch (error) {
      console.error("Error loading data:", error);
      // Load default data on error
      setTotalsState(DEFAULT_DATA.totals);
      setWalletsState(DEFAULT_DATA.wallets);
    }
  };

  const value: AppContextType = {
    activeTab,
    isDarkMode,
    totals,
    wallets,
    transactions,
    notes,
    setActiveTab,
    setIsDarkMode,
    setTotals,
    setWallets,
    setTransactions,
    setNotes,
    loadAllData,
    totalAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
