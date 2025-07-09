// Store/useOrderStore.jsx

import { create } from 'zustand';

const memberInfo = {
    label: '우리집',          // 배송지명
    name: '김나현',           // 받는 사람
    postcode: '1134',
    address1: '부산광역시 해운대',
    address2: '1112호',
    phone1: '010',
    phone2: '9898',
    phone3: '1234',
    message: '문앞에 놔두세요',
};

const useOrderStore = create((set) => ({
    // 기존 주문 상품 관련 상태...

    // 배송지 정보 상태 초기값을 memberInfo로 설정
    address: { ...memberInfo },

    // 배송지 정보 업데이트 함수
    updateAddress: (field, value) =>
        set((state) => ({
            address: {
                ...state.address,
                [field]: value,
            },
        })),

    // 회원 정보(기본 주소)로 배송지 리셋 함수
    resetAddressToMember: () =>
        set(() => ({
            address: { ...memberInfo },
        })),
}));

export default useOrderStore;
