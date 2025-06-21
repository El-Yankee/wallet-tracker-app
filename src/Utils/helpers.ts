import type { Wallet, Total } from "../Types";

export const getWalletName = (wallets: Wallet[], walletId: number): string => {
  const wallet = wallets.find((w) => w.id === walletId);
  return wallet ? wallet.name : "Unknown Wallet";
};

export const getTotalName = (totals: Total[], totalId: number): string => {
  const total = totals.find((t) => t.id === totalId);
  return total ? total.name : "Unknown Total";
};

export const getIconName = (type: string): string => {
  switch (type) {
    case "cash":
      return "attach-money";
    case "credit":
      return "credit-card";
    case "bank":
      return "account-balance";
    case "digital":
      return "account-balance-wallet";
    default:
      return "account-balance-wallet";
  }
};

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split("T")[0];
};
