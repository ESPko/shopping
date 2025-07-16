import {create} from "zustand";

const useProDeInfo = create((set) => ({
    // 더미
    images: [
        "https://product-image.wconcept.co.kr/images/upload/board/302709295/2024012612552028.jpg",
        "https://product-image.wconcept.co.kr/images/upload/board/302709295/2024020709410878.jpg",
    ],
    setImages: (newImages) => set({ images: newImages }),
}));

export default useProDeInfo;