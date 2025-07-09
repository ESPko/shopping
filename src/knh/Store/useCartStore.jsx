// src/store/cartStore.js
import { create } from 'zustand';

const useCartStore = create((set,get) => ({
    cartItems: [
        {
            id: 1,
            image: '/images/diadoraProduct.jpg',
            name: '경량 러닝 볼캡 CHARCOAL GREY',
            price: 59000,
            quantity: 1,
            size: ['S','M','L','XL'],
            selected: false,
            selectedSize: 'M',
        },
        {
            id: 2,
            image: 'https://diadorakorea.com/web/product/medium/202504/10a3d09ff0322b3bbdd4382599fac016.jpg',
            name: '경량 러닝 볼캡 CHARCOAL GREY',
            price: 59000,
            quantity: 1,
            size: ['S','M','L'],
            selected: false,
            selectedSize: 'M',
        },
    ],
    // 상품추가
    addToCart: (item) =>
        set((state) => {
            const exists = state.cartItems.find((i) => i.id === item.id);
            if (exists) {
                // 이미 있는 상품이면 수량만 증가 (사이즈는 변경 안 함)
                return {
                    cartItems: state.cartItems.map((i) =>
                        i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
                    ),
                };
            } else {
                // 새로운 상품이면 cartItems에 추가하면서 selectedSize 초기화
                return {
                    cartItems: [
                        ...state.cartItems,
                        {
                            ...item,
                            quantity: 1,
                            // selectedSize 초기화 로직:
                            // 1. item 자체에 selectedSize가 있다면 그 값을 사용 (예: 상품 상세에서 특정 사이즈를 선택하고 담았을 때)
                            // 2. 없다면, item.size 배열이 있고 비어있지 않으면 첫 번째 값을 기본값으로 설정
                            // 3. 그것도 없으면 undefined 또는 null (혹은 오류 처리)
                            selectedSize: item.selectedSize || (item.size && item.size.length > 0 ? item.size[0] : undefined),
                        },
                    ],
                };
            }
        }),

    // 총합계 (상품 * 수량)
    totalPrice: () =>
        get().cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),

    // 배송비
    shippingFee: 3000,
    // 배송비 설정
    setShippingFee: (fee) => set({ shippingFee: fee }),

    // 총합계 (배송비 포함)
    totalAmount: () => get().totalPrice() + get().shippingFee,



    toggleSelect: (id) =>
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item
            ),
        })),

    // 수량 버튼
    changeQty: (id, diff) =>
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + diff) }
                    : item
            ),
        })),

    // 개별 상품 삭제
    removeItem: (id) =>
        set((state) => ({
            cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

    // 선택 상품 삭제
    removeSelected: () =>
        set((state) => ({
            cartItems: state.cartItems.filter((item) => !item.selected),
        })),

    // 모든 상품 삭제
    removeAll: () => set({ cartItems: [] }),

    // 옵션변경
    changeSize: (id, newSize) =>
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.id === id ? { ...item, selectedSize: newSize } : item
            ),
        })),


}));

export default useCartStore;
