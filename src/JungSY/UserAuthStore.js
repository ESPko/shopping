import { create } from 'zustand';

// 로컬스토리지에 저장된 유저 정보 불러오기 (없으면 null)
const getStoredUser = () => {
    try {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};

const useAuthStore = create((set) => ({
    user: getStoredUser(),
    isLoggedIn: !!getStoredUser(),
    setUser: (userData) => {
        localStorage.setItem('user', JSON.stringify(userData)); // 저장
        set({ user: userData, isLoggedIn: true });
    },
    setIsLoggedIn: (flag) => set({ isLoggedIn: flag }),
    logout: () => {
        localStorage.removeItem('user'); // 삭제
        set({ user: null, isLoggedIn: false });
    },
}));

export default useAuthStore;
