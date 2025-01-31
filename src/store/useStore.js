import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: {},
  setUser: (data) => set({ user: data }),
}));
