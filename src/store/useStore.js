import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: {},
  setUser: (data) => set({ user: data }),
}));

export const useThemeStore = create((set) => ({
  theme: {},
  setTheme: (data) => set({ user: data }),
}));
