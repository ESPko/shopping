import { create } from "zustand";
import axios from "axios";
import useAuthStore from "../../JungSY/UserAuthStore.js"; // 로그인 정보 훅

const useCartStore = create((set, get) => ({
    cartItems: [],

    // 장바구니 항목 불러오기
    fetchCartItems: async () => {
        const user = useAuthStore.getState().user;
        console.log("fetchCartItems() 호출됨", user);

        if (!user) return;

        try {
            // API 호출
            const res = await axios.get(`http://localhost:8080/api/cart/${user.id}`);
            console.log("장바구니 데이터:", res.data);

            // items만 추출해서 상태에 저장
            set({ cartItems: res.data.items });
        } catch (error) {
            console.error("장바구니 불러오기 실패", error);
        }
    },

    // 아이템 선택 상태 변경
    toggleSelect: (itemId, selectedSize) => {
        const cartItems = get().cartItems.map(item =>
            item.id === itemId && item.selectedSize === selectedSize
                ? { ...item, selected: !item.selected }
                : item
        );
        set({ cartItems });
    },

    // 수량 변경
    changeQty: async (itemId, delta) => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        const item = get().cartItems.find(i => i.id === itemId);
        if (!item) return;

        const newQty = item.quantity + delta;
        if (newQty < 1) return;

        try {
            // 수량 변경 API 호출
            const res = await axios.put(
                `http://localhost:8080/api/cart/${user.id}/item/${itemId}`,
                { quantity: newQty }
            );
            const updatedItem = res.data;
            const cartItems = get().cartItems.map(i =>
                i.id === itemId ? { ...i, quantity: updatedItem.quantity } : i
            );
            set({ cartItems });
        } catch (error) {
            console.error("수량 변경 실패", error);
        }
    },

    // 아이템 삭제
    removeItem: async (itemId) => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        try {
            // 아이템 삭제 API 호출
            await axios.delete(`http://localhost:8080/api/cart/${user.id}/item/${itemId}`);
            const cartItems = get().cartItems.filter(item => item.id !== itemId);
            set({ cartItems });
        } catch (error) {
            console.error("아이템 삭제 실패", error);
        }
    },

    // 사이즈 변경
    changeSize: async (itemId, newSize) => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        try {
            // 사이즈 변경 API 호출
            const res = await axios.put(
                `http://localhost:8080/api/cart/${user.id}/item/${itemId}/size`,
                { selectedSize: newSize }
            );
            const updatedItem = res.data;
            const cartItems = get().cartItems.map(i =>
                i.id === itemId ? { ...i, selectedSize: updatedItem.selectedSize } : i
            );
            set({ cartItems });
        } catch (error) {
            console.error("사이즈 변경 실패", error);
        }
    },

    // 장바구니에 상품 추가
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
            // 장바구니에 아이템 추가 API 호출
            await axios.post(
                `http://localhost:8080/api/cart/${user.id}/item`,
                { productId, selectedSize: size, quantity },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            // 추가 후 장바구니 재조회
            await get().fetchCartItems();
            alert("장바구니에 추가되었습니다.");
        } catch (error) {
            console.error("장바구니 추가 실패", error);
            alert("장바구니 추가 실패");
        }
    },
}));

export default useCartStore;
