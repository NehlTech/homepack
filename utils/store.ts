import { create } from "zustand";
import { persist } from "zustand/middleware";

const customStorage = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const store = create()(
  persist(
    (set) => ({
      currentUser: null,
      isLoading: true,
      cartProduct: [],
      favoriteProduct: [],

      getUserInfo: async (uid: any) => {
        if (!uid) return set({ currentUser: null, isLoading: false });
      },
    }),
    {
      name: "homepack-storage",
      storage: customStorage,
    }
  )
);
