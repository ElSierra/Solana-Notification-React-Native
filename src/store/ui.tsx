import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand/react";
import { zustandStorage } from "./wallet";

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
interface ModeState {
  mode: "light" | "dark";
  toggleMode: () => void;
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

export const useMode = create<ModeState>()(
  persist(
    (set) => ({
      mode: "dark",
      toggleMode: () =>
        set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
    }),
    {
      name: "mode",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

type AnimationFinished = {
  animationFinished: boolean;
  setAnimationFinished: (animationFinished: boolean) => void;
};

export const useAnimationFinished = create<AnimationFinished>((set) => ({
  animationFinished: false,
  setAnimationFinished: (animationFinished) => set({ animationFinished }),
}));
