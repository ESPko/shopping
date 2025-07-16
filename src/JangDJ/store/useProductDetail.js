import {create} from "zustand";

// 상품 상세페이지 상태 관리
const useProductDetail = create((set) => ({
    images: [
        "/images/diadoraProduct.jpg",
        "/images/diadoraProduct.jpg",
        "/images/diadoraProduct.jpg",
        "/images/diadoraProduct.jpg",
        "/images/diadoraProduct.jpg",
    ],
    selectedSize: "S",
    count: 1,

    currentImg: 0,  // 현재 메인 이미지 인덱스
    setImages: (imgs) => set({ images:imgs }),  // 현재 이미지 배열 상태 업데이트
    setCurrentImg: (idx) => set({ currentImg: idx }),  // 선택한 이미지를 현재 메인 이미지 인덱스로
    nextImg: () => set((state) => ({
        currentImg: (state.currentImg + 1) % state.images.length
    })),   // 다음 이미지로 넘기기
    prevImg: () => set((state) => ({
        currentImg: (state.currentImg - 1 + state.images.length) % state.images.length
    })),   // 이전 이미지로 넘기기

    setSize: (size) => set({ selectedSize: size}),
    addCount: () => set((state) => ({ count: state.count + 1 })),
    minusCount: () => set((state) => ({ count: Math.max(1, state.count - 1) })),

}));

export default useProductDetail;