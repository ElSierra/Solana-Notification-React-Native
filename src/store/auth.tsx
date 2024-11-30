import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand/react";
import { zustandStorage } from "./wallet";

type AuthState = {
  type: "guest" | "user" | null;
  setType: (type: "guest" | "user" | null) => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      type: null,
      setType: (type) => set({ type }),
    }),
    {
      name: "mode",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
