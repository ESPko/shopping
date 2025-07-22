import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./UserAuthStore.js"; // 로그인 정보 훅

const useCartStore = create((set, get) => ({
    cartItems: [],

    fetchCartItems: async () => {
        const user = useAuthStore.getState().user;
        console.log("fetchCartItems() 호출됨", user);
        if (!user) return;

        try {
            const res = await axios.get(`http://localhost:8080/api/cart/${user.id}`);
            console.log("장바구니 데이터:", res.data);
            set({ cartItems: res.data.items });
        } catch (error) {
            console.error("장바구니 불러오기 실패", error);
        }
    },

    toggleSelect: (itemId, selectedSize) => {
        const cartItems = get().cartItems.map(item =>
            item.id === itemId && item.selectedSize === selectedSize
                ? { ...item, selected: !item.selected }
                : item
        );
        set({ cartItems });
    },

    changeQty: async (itemId, delta) => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        const item = get().cartItems.find(i => i.id === itemId);
        if (!item) return;

        const newQty = item.quantity + delta;
        if (newQty < 1) return;

        try {
            const res = await axios.put(
                `http://localhost:8080/api/cart/${user.id}/item/${itemId}`,
                { quantityDiff: delta }
            );

            const updatedItem = res.data;

            if (updatedItem === null) {
                set(state => ({
                    cartItems: state.cartItems.filter(i => i.id !== itemId)
                }));
            } else {
                set(state => ({
                    cartItems: state.cartItems.map(i =>
                        i.id === itemId ? { ...i, quantity: updatedItem.quantity } : i
                    ),
                }));
            }
        } catch (error) {
            console.error("수량 변경 실패", error);
        }
    },

    removeItem: async (itemId) => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        try {
            await axios.delete(`http://localhost:8080/api/cart/${user.id}/item/${itemId}`);
            set(state => ({
                cartItems: state.cartItems.filter(item => item.id !== itemId),
            }));
        } catch (error) {
            console.error("아이템 삭제 실패", error);
        }
    },

    changeSize: async (itemId, newSize) => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        try {
            const res = await axios.put(
                `http://localhost:8080/api/cart/${user.id}/item/${itemId}/size`,
                { newSize }
            );

            const updatedItem = res.data;

            set(state => ({
                cartItems: state.cartItems.map(i =>
                    i.id === itemId ? { ...i, selectedSize: updatedItem.selectedSize } : i
                ),
            }));
        } catch (error) {
            console.error("사이즈 변경 실패", error);
        }
    },

    // ✅ productId를 직접 받도록 수정
    addToCart: async (productId, size, quantity) => {
        console.log("addToCart called with productId =", productId);
        console.log("size =", size);
        console.log("quantity =", quantity);

        const user = useAuthStore.getState().user;
        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/api/cart/${user.id}/item`,
                { productId, selectedSize: size, quantity },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            await get().fetchCartItems();
            alert("장바구니에 추가되었습니다.");
        } catch (error) {
            console.error("장바구니 추가 실패", error);
            alert("장바구니 추가 실패");
        }
    },
}));

export default useCartStore;
