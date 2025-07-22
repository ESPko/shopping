import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            setUser: (userData) => {
                set({ user: userData, isLoggedIn: true });
            },
            setIsLoggedIn: (flag) => set({ isLoggedIn: flag }),
            logout: () => {
                set({ user: null, isLoggedIn: false });
            },
        }),
        {
            name: 'auth-storage', // localStorage 키
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;
