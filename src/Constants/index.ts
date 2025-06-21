export const STORAGE_KEYS = {
  TOTALS: "@wallet_totals",
  WALLETS: "@wallet_wallets",
  TRANSACTIONS: "@wallet_transactions",
  NOTES: "@wallet_notes",
  DARK_MODE: "@wallet_dark_mode",
};

export const COLOR_OPTIONS = [
  "#3B82F6", // blue
  "#EC4899", // pink
  "#10B981", // green
  "#8B5CF6", // purple
  "#F59E0B", // yellow
  "#EF4444", // red
  "#6366F1", // indigo
  "#F97316", // orange
];

export const WALLET_TYPES = [
  { label: "Cash", value: "cash" },
  { label: "Credit Card", value: "credit" },
  { label: "Bank Account", value: "bank" },
  { label: "Digital Wallet", value: "digital" },
];

export const TRANSACTION_TYPES = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

export const DEFAULT_DATA = {
  totals: [
    { id: 1, name: "My Money", amount: 2450.75, color: COLOR_OPTIONS[0] },
    { id: 2, name: "Sister's Money", amount: 890.25, color: COLOR_OPTIONS[1] },
    { id: 3, name: "Shared Fund", amount: 320.0, color: COLOR_OPTIONS[2] },
  ],
  wallets: [
    {
      id: 1,
      name: "Cash",
      amount: 245.5,
      type: "cash" as const,
      icon: "money",
    },
    {
      id: 2,
      name: "Chase Credit Card",
      amount: 1200.75,
      type: "credit" as const,
      icon: "credit-card",
    },
    {
      id: 3,
      name: "Savings Account",
      amount: 1890.25,
      type: "bank" as const,
      icon: "account-balance",
    },
    {
      id: 4,
      name: "PayPal",
      amount: 324.5,
      type: "digital" as const,
      icon: "account-balance-wallet",
    },
  ],
};
