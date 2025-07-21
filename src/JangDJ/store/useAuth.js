import {create} from "zustand";

const useAuth = create((set) => ({
    isLogin: false,
    user: null,
    login: (userData) => set({ isLogin: true, user: userData }),
    logout: () => set({ isLogin: false, user: null }),
}));

export default useAuth