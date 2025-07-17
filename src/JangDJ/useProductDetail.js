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

    currentImg: 0,  // 현재 메인 이미지 인덱스
    setImages: (imgs) => set({ images:imgs }),  // 현재 이미지 배열 상태 업데이트
    setCurrentImg: (idx) => set({ currentImg: idx }),  // 선택한 이미지를 현재 메인 이미지 인덱스로
    nextImg: () => set((state) => ({
        currentImg: (state.currentImg + 1) % state.images.length
    })),   // 다음 이미지로 넘기기
    prevImg: () => set((state) => ({
        currentImg: (state.currentImg - 1 + state.images.length) % state.images.length
    })),   // 이전 이미지로 넘기기

//     사이즈 선택 후 수량 조절 (사이즈 다중 선택)
    selectedSizes: {},

    addSize: (size) =>
        set((state) => {
            if (state.selectedSizes[size]) return state;
            return {
                selectedSizes: {
                    ...state.selectedSizes,
                    [size]: 1,
                },
            };
        }),

    // x 버튼 클릭시 사이즈 삭제
    removeSize: (size) =>
        set((state) => {
            const updated = { ...state.selectedSize };
            delete updated[size];
            return { selectedSizes: updated };
        }),

    // 수량 +
    addCount: (size) =>
        set((state) => ({
            selectedSizes: {
                ...state.selectedSizes,
                [size]: state.selectedSizes[size] + 1,
            },
        })),

    // 수량 -
    minusCount: (size) =>
        set((state) => ({
            selectedSizes: {
                ...state.selectedSizes,
                [size]: Math.max(1, state.selectedSizes[size] - 1),
            },
        })),

    resetSelectedSizes: () => set({ selectedSizes: {} }),
}));

export default useProductDetail;