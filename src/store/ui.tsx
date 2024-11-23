import { create } from "zustand/react";

interface AddWalletState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}
interface ViewWalletState {
  wallet: {
    open: boolean;
    name: string;
    address: string;
    balance: string;
    emoji: string;
  } | null;
  setSate: (
    wallet: {
      open: boolean;
      name: string;
      address: string;
      balance: string;
      emoji: string;
    } | null
  ) => void;
}
interface EmojiBottomSheetState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  openSheet: () => void;
  closeSheet: () => void;
}

interface HideTabBarState {
  hide: boolean;
  setHide: (hide: boolean) => void;
}
export const useAddWalletBottomSheet = create<AddWalletState>((set) => ({
  open: false,

  setOpen: (open: boolean) => set({ open }),
  toggle: () => set((state) => ({ open: !state.open })),
}));

export const useViewWalletBottomSheet = create<ViewWalletState>((set) => ({
  wallet: null,
  setSate: (wallet) => set({ wallet }),
}));

export const useHideTabBar = create<HideTabBarState>((set) => ({
  hide: false,
  setHide: (hide: boolean) => set({ hide }),
}));

export const useEmojiBottomSheet = create<EmojiBottomSheetState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  toggle: () => set((state) => ({ open: !state.open })),
  openSheet: () => set({ open: true }),
  closeSheet: () => set({ open: false }),
}));
