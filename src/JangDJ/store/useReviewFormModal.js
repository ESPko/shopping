import { create } from "zustand";

const useReviewFormModal = create((set) => ({
    isFormOpen: false, // 모달 상태 (열림/닫힘)
    closeFormModal: () => set({ isFormOpen: false }), // 모달 닫기
    openFormModal: () => set({ isFormOpen: true }), // 모달 열기
}));

export default useReviewFormModal;
