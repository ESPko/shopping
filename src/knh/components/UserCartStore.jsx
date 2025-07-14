import { create } from "zustand";
import axios from "axios";

const useCartStore = create((set, get) => ({
    cartItems: [],

    fetchCartItems: async (userId) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/cart/${userId}`);
            set({ cartItems: res.data.items });
        } catch (error) {
            console.error("장바구니 불러오기 실패", error);
        }
    },

    toggleSelect: (itemId) => {
        const cartItems = get().cartItems.map(item =>
            item.id === itemId ? { ...item, selected: !item.selected } : item
        );
        set({ cartItems });
    },

    changeQty: async (itemId, delta, userId) => {
        const item = get().cartItems.find(item => item.id === itemId);
        if (!item) return;

        const newQty = item.quantity + delta;
        if (newQty < 1) return;

        try {
            const res = await axios.put(`http://localhost:8080/api/cart/${userId}/item/${itemId}`, {
                quantity: newQty,
            });
            const updatedItem = res.data;
            const cartItems = get().cartItems.map(i =>
                i.id === itemId ? updatedItem : i
            );
            set({ cartItems });
        } catch (error) {
            console.error("수량 변경 실패", error);
        }
    },

    removeItem: async (itemId, userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/cart/${userId}/item/${itemId}`);
            const cartItems = get().cartItems.filter(item => item.id !== itemId);
            set({ cartItems });
        } catch (error) {
            console.error("아이템 삭제 실패", error);
        }
    },

    changeSize: async (itemId, newSize, userId) => {
        try {
            const res = await axios.put(`http://localhost:8080/api/cart/${userId}/item/${itemId}/size`, {
                selectedSize: newSize,
            });
            const updatedItem = res.data;
            const cartItems = get().cartItems.map(i =>
                i.id === itemId ? updatedItem : i
            );
            set({ cartItems });
        } catch (error) {
            console.error("사이즈 변경 실패", error);
        }
    },

    addToCart: (newItem) => {
        // 장바구니 추가 로직 (백엔드 API 연동 필요 시 추가)
    },
}));

export default useCartStore;
