import {create} from "zustand";

const usePhotoReviewModal = create((set) => ({
    isOpen: false,
    selectedReview: null,
    currentImageIndex: 0,

    openModal : (review) => set({ isOpen: true, selectedReview: review, currentImageIndex: 0}),
    closeModal: () => set({ isOpen: false, selectedReview: null }),
    nextImage: () =>
        set((state) => ({
            currentImageIndex:
                (state.currentImageIndex + 1) % (state.selectedReview?.images.length || 1),
        })),
    prevImage: () =>
        set((state) => ({
            currentImageIndex:
                (state.currentImageIndex - 1 + (state.selectedReview?.images.length || 1)) %
                (state.selectedReview?.images.length || 1),
        })),
}));

export default usePhotoReviewModal;