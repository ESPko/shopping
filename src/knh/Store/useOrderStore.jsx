// src/store/useOrderStore.jsx
import { create } from 'zustand';
import useCartStore from "./UseCartStore.jsx";

const useOrderStore = create((set, get) => ({
    orderedItems: [],

    // 선택된 항목만 주문 항목으로 설정
    orderSelected: () => {
        const { cartItems } = useCartStore.getState();
        const selected = cartItems.filter(item => item.selected);
        const processed = selected.map(item => ({
            ...item,
            image: item.info_image
                ? item.info_image.startsWith("http")
                    ? item.info_image
                    : `/upload/${item.info_image}`
                : "/images/default-product-image.jpg"
        }));
        set({ orderedItems: processed });
    },

    // 전체 장바구니 항목 주문으로 설정
    orderAll: () => {
        const { cartItems } = useCartStore.getState();
        const processed = cartItems.map(item => ({
            ...item,
            image: item.info_image
                ? item.info_image.startsWith("http")
                    ? item.info_image
                    : `/upload/${item.info_image}`
                : "/images/default-product-image.jpg"
        }));
        set({ orderedItems: processed });
    },

    // 주문 상품 가격 합계
    totalOrderPrice: () => {
        const items = get().orderedItems;
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    // 배송비 계산 (조건부 무료배송 예시)
    shippingFee: () => {
        const total = get().totalOrderPrice();
        return total >= 50000 ? 0 : 3000;
    },

    // 상품 * 수량
    itemTotalPrice: (item) =>
        item.price * item.quantity,

    // 상태 추가
    usablePoints: 10000, // 사용자 보유 포인트
    usedPoints: 0,       // 꼭 0으로 초기화할 것!

    updateUsedPoints: (value) => {
        const { usablePoints, totalOrderPrice } = get();
        const maxValid = Math.min(usablePoints, totalOrderPrice());
        const safeValue = Math.max(0, Math.min(value, maxValid));
        set({ usedPoints: safeValue });
    },

    totalPayAmount: () => {
        const total = get().totalOrderPrice();
        const shipping = get().shippingFee();
        const used = get().usedPoints;
        return Math.max(0, total + shipping - used);
    },
}));

export default useOrderStore;
