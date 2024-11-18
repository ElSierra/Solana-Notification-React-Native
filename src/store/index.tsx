import { create } from "zustand/react";

interface ModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

interface HideTabBarState {
  hide: boolean;
  setHide: (hide: boolean) => void;
}
export const useModalState = create<ModalState>((set) => ({
  open: false,

  setOpen: (open: boolean) => set({ open }),
  toggle: () => set((state) => ({ open: !state.open })),
}));

export const useHideTabBar = create<HideTabBarState>((set) => ({
  hide: false,
  setHide: (hide: boolean) => set({ hide }),
}));
