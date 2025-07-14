// store/useAuthStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (userData) => set({ user: userData }),
    setIsLoggedIn: (flag) => set({ isLoggedIn: flag }),
    logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useAuthStore;
