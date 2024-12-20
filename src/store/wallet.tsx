import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = new MMKV();

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

type WalletData = {
  id: string;
  walletName: string;
  walletAddress: string;
  emoji: number;
  walletBalance?: number;
};
interface WalletState {
  walletData: WalletData[];
  adjustSOL?: string;
  adjustUSD?: string;
  prevBalance?: number;
  prevBalanceUSD?: number;
  currentBalance?: number;
  currentBalanceUSD?: number;
  usdtBalance?: number;
  usdtBalanceUSD?: number;
  addDummyData: () => void;
  addWalletData: (newWallet: {
    walletName: string;
    walletAddress: string;
    emoji: number;
  }) => void;
  addBalance: (id: string, balance: number) => void;
  removeWalletData: (id: string) => void;
  deleteAllWallets: () => void;
  addWalletList: ({
    walletData,
    adjustSOL,
    adjustUSD,
    prevBalance,
    prevBalanceUSD,
    currentBalance,
    currentBalanceUSD,
    usdtBalance,
    usdcBalance,
  }: {
    walletData: WalletData[];
    adjustSOL?: string;
    adjustUSD?: string;
    prevBalance?: number;
    prevBalanceUSD?: number;
    currentBalance?: number;
    currentBalanceUSD?: number;
    usdtBalance?: number;
    usdcBalance?: number;
  }) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      walletData: [],
      addDummyData: () =>
        set((state) => ({
          walletData: [
            ...state.walletData,
            {
              walletName: "Solana",
              walletAddress: "7YFjY3k3v4Kv6z4fQ5fF7",
              emoji: 0,
              id: Crypto.randomUUID(),
            },
            {
              walletName: "Ethereum",
              walletAddress: "0x7YFjY3k3v4Kv6z4fQ5fF7",
              emoji: 1,
              id: Crypto.randomUUID(),
            },
            {
              walletName: "Bitcoin",
              walletAddress: "1JYFjY3k3v4Kv6z4fQ5fF7",
              emoji: 2,
              id: Crypto.randomUUID(),
            },
            {
              walletName: "Cardano",
              walletAddress: "1JYFjY3k3v4Kv6z4fQ5fF7",
              emoji: 3,
              id: Crypto.randomUUID(),
            },
            {
              walletName: "Polkadot",
              walletAddress: "1JYhjY3k3v4Kv6z4fQ5fF7",
              emoji: 4,
              id: Crypto.randomUUID(),
            },
            {
              walletName: "Ripple",
              walletAddress: "1JYFjY3k3vhhv6z4fQ5fF7",
              emoji: 5,
              id: Crypto.randomUUID(),
            },
          ],
        })),
      // Add a single wallet to the existing walletData
      addWalletData: (newWallet) =>
        set((state) => {
          const uuid = Crypto.randomUUID();
          return {
            walletData: [
              ...state.walletData,
              {
                id: uuid,
                walletName: newWallet.walletName,
                walletAddress: newWallet.walletAddress,
                emoji: newWallet.emoji,
              },
            ],
          };
        }),
      addWalletList: (data) =>
        set((state) => {
          return {
            walletData: data.walletData,
            adjustSOL: data.adjustSOL,
            adjustUSD: data.adjustUSD,
            prevBalance: data.prevBalance,
            prevBalanceUSD: data.prevBalanceUSD,
            currentBalance: data.currentBalance,
            currentBalanceUSD: data.currentBalanceUSD,
            usdtBalance: data.usdtBalance,
            usdtBalanceUSD: data.usdcBalance,
          };
        }),
      // Remove a wallet by its name
      removeWalletData: (id) =>
        set((state) => ({
          walletData: state.walletData.filter((wallet) => wallet.id !== id),
        })),
      // Delete all wallets
      deleteAllWallets: () =>
        set(() => ({
          walletData: [],
        })),
      // Add balance to a wallet by its id
      addBalance: (id, balance) =>
        set((state) => {
          const wallet = state.walletData.find((wallet) => wallet.id === id);
          if (wallet) {
            wallet.walletBalance = balance;
          }
          return {
            walletData: state.walletData,
          };
        }),
    }),
    {
      name: "wallet-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
