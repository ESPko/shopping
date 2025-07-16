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
                { quantityDiff: delta }  // quantityDiff로 변경
            );

            const updatedItem = res.data;

            if (updatedItem === null) {
                // 아이템이 삭제되었을 경우 상태에서 해당 아이템을 제거
                set(state => ({
                    cartItems: state.cartItems.filter(i => i.id !== itemId)
                }));
            } else {
                // 수량이 변경된 아이템 상태 업데이트
                set(state => ({
                    cartItems: state.cartItems.map(i =>
                        i.id === itemId ? { ...i, quantity: updatedItem.quantity } : i
                    ),
                }));
            }
            console.log("Updated CartItems:", get().cartItems); // 상태 업데이트 확인

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

            // 상태를 바로 업데이트
            set(state => ({
                cartItems: state.cartItems.filter(item => item.id !== itemId),
            }));
        } catch (error) {
            console.error("아이템 삭제 실패", error);
        }
    },

    // 사이즈 변경
    changeSize: async (itemId, newSize) => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        try {
            console.log("사이즈 변경 시 호출된 itemId:", itemId, "새로운 사이즈:", newSize);

            // 사이즈 변경 API 호출
            const res = await axios.put(
                `http://localhost:8080/api/cart/${user.id}/item/${itemId}/size`,
                { newSize: newSize }
            );

            console.log("API 응답 데이터:", res.data);  // 응답 확인

            const updatedItem = res.data;  // 변경된 CartItem

            // 상태 업데이트
            set(state => ({
                cartItems: state.cartItems.map(i =>
                    i.id === itemId ? { ...i, selectedSize: updatedItem.selectedSize } : i
                ),
            }));

            console.log("사이즈 변경 후 장바구니 상태:", get().cartItems);
        } catch (error) {
            console.error("사이즈 변경 실패", error);
        }
    },


    // 장바구니에 상품 추가
    addToCart: async (product, size, quantity) => {
        console.log("addToCart called with productId =", product.productId);  // product.productId 사용
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
                { productId: product.productId, selectedSize: size, quantity: quantity },  // 필요한 값만 전달
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
