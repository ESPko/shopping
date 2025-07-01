import {create} from "zustand";

// 상품 상세페이지 상태 관리
const useProductDetail = create((set) => ({
    selectedSize: "S",
    count: 1,
    setSize: (size) => set({ selectedSize: size}),
    addCount: () => set((state) => ({ count: state.count + 1 })),
    minusCount: () => set((state) => ({ count: Math.max(1, state.count - 1) })),
}));

export default useProductDetail;