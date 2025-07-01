import {create} from "zustand";

// 필터 선택한 값
const useFilterList = create((set) => ({
    // 컬러
    color: [],
    setColor: (colors) => set({color: colors}),

    // 금액대
    priceRange: [10000, 500000],
    setPriceRange: (range) => set({ priceRange: range }),

    // 리셋
    resetFilter: () =>
        set({
            color: null,
            priceRange: [10000, 500000],
        }),
}));

export default useFilterList;