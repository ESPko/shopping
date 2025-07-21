import {create} from "zustand";

const useProductReview = create((set) => ({
    reviews: [],
    currentPage: 1,
    reviewsPerPage: 5, // 페이지당 보여줄 리뷰 갯수
    selectedSort: "latest",
    photoOnly: false, // 포토리뷰 모아보기

    setReviews: (data) => set({ reviews: data }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setSelectedSort: (sort) => set({ selectedSort : sort }),
    clickPhotoOnly: () => set((state) => ({ photoOnly: !state.photoOnly })),
}));

export default useProductReview;