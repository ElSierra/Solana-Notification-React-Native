import { create } from "zustand/react";

interface ModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

export const useModalState = create<ModalState>((set) => ({
  open: false,

  setOpen: (open: boolean) => set({ open }),
  toggle: () => set((state) => ({ open: !state.open })),
}));
