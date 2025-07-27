import { create } from "zustand";

const usePhotoReviewModal = create((set) => ({
    isOpen: false,
    selectedReview: null,
    currentImageIndex: 0,

    openModal: (review) => set({ isOpen: true, selectedReview: review, currentImageIndex: 0 }),
    closeModal: () => set({ isOpen: false, selectedReview: null }),
    nextImage: () =>
        set((state) => ({
            currentImageIndex:
                (state.currentImageIndex + 1) % (state.selectedReview?.images_list.length || 1),  // images_list로 변경
        })),
    prevImage: () =>
        set((state) => ({
            currentImageIndex:
                (state.currentImageIndex - 1 + (state.selectedReview?.images_list.length || 1)) %
                (state.selectedReview?.images_list.length || 1),  // images_list로 변경
        })),
}));

export default usePhotoReviewModal;
