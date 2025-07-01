import {create} from "zustand";

const useProductReview = create((set) => ({
    reviews: [],
    currentPage: 1,
    totalPage: 5, // 이것도 댓글 수 에 맞게 생성되게 바꿀수 있는지 확인
    selectedSort: "latest",
    photoOnly: false, // 이거 뭔지 확인

    setReviews: (data) => set({ reviews: data }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setSelectedSort: (sort) => set({ selectedSort : sort }),
    clickPhotoOnly: () => set((state) => ({ photoOnly: !state.photoOnly })),
}));

export default useProductReview;