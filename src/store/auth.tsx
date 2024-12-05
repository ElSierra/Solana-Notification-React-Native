import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand/react";
import { zustandStorage } from "./wallet";

import * as SecureStore from "expo-secure-store";

type user = {
  name: string;
  email: string;
  id: string;
  picture: string;
};
type AuthState = {
  type: "guest" | "user" | null;
  user: {
    name: string;
    email: string;
    id: string;
    picture: string;
  } | null;
  setAuth: (type: "guest" | "user" | null, user?: user) => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      type: null as "guest" | "user" | null,
      user: null as {
        name: string;
        email: string;
        id: string;
        picture: string;
      } | null,
      setAuth: (type: "guest" | "user" | null, user?: user) =>
        set({ type, user: user || null }),
    }),
    {
      name: "mode",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
type TokenState = {
  token: string | null;
  isTokenReady: boolean;
  setToken: () => void;
  clearToken: () => void;
};


export const useTokenStore = create<TokenState>((set) => ({
  token: null,
  isTokenReady: false,
  setToken: async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        set({ token, isTokenReady: true });
      } else {
        set({ isTokenReady: true }); // Even if no token is found, mark it ready
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
      set({ isTokenReady: true }); // Avoid blocking the app on error
    }
  },
  clearToken: () => set({ token: null, isTokenReady: false }),
}));
