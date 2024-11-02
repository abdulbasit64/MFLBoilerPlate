import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null, // Initially no user is logged in

      // Function to set user on login
      setUser: (userData) => set({ user: userData }),

      // Function to clear user on logout
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // Key for localStorage
      partialize: (state) => ({ user: state.user }), // Only persist the `user` part
    }
  )
);

export default useUserStore;
