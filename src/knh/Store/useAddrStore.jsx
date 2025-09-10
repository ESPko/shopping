import { create } from 'zustand';
import useAuthStore from "./UserAuthStore.js";

const defaultMemberInfo = {
    label: '우리집',
    name: '',
    postcode: '',
    address1: '',
    address2: '',
    phone1: '',
    phone2: '',
    phone3: '',
    message: '문앞에 놔두세요',
};

const useAddrStore = create((set, get) => {
    // 로그인 유저 정보 가져오기 (get 사용하여 항상 최신 상태 반영)
    const getInitialAddress = () => {
        const user = useAuthStore.getState().user;
        if (!user) return defaultMemberInfo;

        const phones = user.mobile ? user.mobile.split('-') : [];
        return {
            label: '우리집',
            name: user.nickname || '',
            postcode: user.zipCode || '',
            address1: user.address1 || '',
            address2: user.address2 || '',
            phone1: phones[0] || '',
            phone2: phones[1] || '',
            phone3: phones[2] || '',
            message: '문앞에 놔두세요',
        };
    };

    return {
        // 주문 상품 관련 상태 (필요시 추가 가능)

        address: getInitialAddress(),

        updateAddress: (field, value) =>
            set((state) => ({
                address: {
                    ...state.address,
                    [field]: value,
                },
            })),

        resetAddressToMember: () => {
            set({ address: getInitialAddress() });
        },
    };
});

export default useAddrStore;
