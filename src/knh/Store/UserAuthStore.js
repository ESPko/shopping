import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null, // user 객체는 초기값으로 null
            isLoggedIn: false, // 로그인 상태
            setUser: (userData) => {
                set({ user: userData, isLoggedIn: true }); // userData에 role 포함되도록 설정
            },
            setIsLoggedIn: (flag) => set({ isLoggedIn: flag }),
            logout: () => {
                set({ user: null, isLoggedIn: false }); // 로그아웃 시 user를 null로 초기화
            },
        }),
        {
            name: 'auth-storage', // localStorage 키
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;
