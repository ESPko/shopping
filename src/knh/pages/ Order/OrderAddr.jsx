import React, { useRef, useState, useEffect } from "react";
import useOrderAddrStore from "../../Store/useAddrStore.jsx";

const FormRow = ({ label, required, children }) => (
    <div className="flex items-start gap-4">
        <label className="w-32 text-gray-700 mt-2">
            {label}
            {required && <span className="text-blue-600">*</span>}
        </label>
        <div className="flex-1">{children}</div>
    </div>
);

const OrderAddr = () => {
    const { address, updateAddress, resetAddressToMember } = useOrderAddrStore();

    const [selectedOption, setSelectedOption] = useState("member"); // 기본은 회원 정보

    const address2Ref = useRef(); // 나머지 주소 자동 포커싱용

    // 회원 기본정보 초기 적용
    useEffect(() => {
        if (selectedOption === "member") {
            resetAddressToMember();
        }
    }, [selectedOption, resetAddressToMember]);

    const openPostcodePopup = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                const fullAddress = data.address;
                const zoneCode = data.zonecode;

                updateAddress("postcode", zoneCode);
                updateAddress("address1", fullAddress);
                updateAddress("address2", "");

                setTimeout(() => {
                    address2Ref.current?.focus();
                }, 0);
            },
        }).open();
    };

    // 최근 배송지 예시 (필요 시 useOrderAddrStore에서 가져오면 됨)
    const recentAddr = {
        label: "회사",
        name: "홍길동",
        postcode: "12345",
        address1: "서울특별시 강남구 테헤란로 123",
        address2: "3층 프론트",
        phone1: "010",
        phone2: "1234",
        phone3: "5678",
        message: "회사로 보내주세요",
    };

    // 최근 배송지 선택 시 처리
    const selectRecentAddr = () => {
        Object.entries(recentAddr).forEach(([key, value]) => {
            updateAddress(key, value);
        });
    };

    // 라디오 변경 시
    const onOptionChange = (e) => {
        setSelectedOption(e.target.value);
        if (e.target.value === "member") {
            resetAddressToMember();
        } else if (e.target.value === "recent") {
            selectRecentAddr();
        }
    };

    return (
        <>
            <h3 className="border-b pb-1 border-b-black">배송정보</h3>
            <form className="space-y-6 max-w-3xl mx-auto my-10">
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                        <input
                            type="radio"
                            name="addressOption"
                            value="member"
                            checked={selectedOption === "member"}
                            onChange={onOptionChange}
                            className="accent-[#1B3C5C]"
                        />
                        회원 정보와 동일
                    </label>
                    <label className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                        <input
                            type="radio"
                            name="addressOption"
                            value="recent"
                            checked={selectedOption === "recent"}
                            onChange={onOptionChange}
                            className="accent-[#1B3C5C]"
                        />
                        최근 배송지
                    </label>
                </div>

                <button type="button" className="border text-sm p-3 rounded">
                    주소록 관리
                </button>

                <FormRow label="배송지명" required>
                    <input
                        type="text"
                        value={address.label}
                        onChange={(e) => updateAddress("label", e.target.value)}
                        className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                    />
                </FormRow>

                <FormRow label="이름" required>
                    <input
                        type="text"
                        value={address.name}
                        onChange={(e) => updateAddress("name", e.target.value)}
                        className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                    />
                </FormRow>

                <FormRow label="주소" required>
                    <div className="space-y-2 w-full">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="우편번호"
                                value={address.postcode}
                                onChange={(e) => updateAddress("postcode", e.target.value)}
                                className="bg-gray-100 rounded px-3 text-sm py-3 w-40 border-none focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={openPostcodePopup}
                                className="bg-[#1B3C5C] text-white rounded px-4 py-2 text-sm"
                            >
                                우편번호 찾기
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="기본주소"
                            value={address.address1}
                            onChange={(e) => updateAddress("address1", e.target.value)}
                            className="bg-gray-100 rounded px-3 text-sm py-3 w-full border-none focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="나머지 주소"
                            ref={address2Ref}
                            value={address.address2}
                            onChange={(e) => updateAddress("address2", e.target.value)}
                            className="bg-gray-100 rounded px-3 text-sm py-3 w-full border-none focus:outline-none"
                        />
                    </div>
                </FormRow>

                <FormRow label="휴대전화" required>
                    <div className="flex gap-2 items-center">
                        <select
                            value={address.phone1}
                            onChange={(e) => updateAddress("phone1", e.target.value)}
                            className="bg-gray-100 rounded px-2 py-2 w-20 border-none focus:outline-none"
                        >
                            <option>010</option>
                            <option>011</option>
                            <option>016</option>
                            <option>017</option>
                        </select>
                        <span>-</span>
                        <input
                            type="text"
                            value={address.phone2}
                            onChange={(e) => updateAddress("phone2", e.target.value)}
                            className="bg-gray-100 rounded px-3 py-2 w-24 border-none focus:outline-none"
                        />
                        <span>-</span>
                        <input
                            type="text"
                            value={address.phone3}
                            onChange={(e) => updateAddress("phone3", e.target.value)}
                            className="bg-gray-100 rounded px-3 py-2 w-24 border-none focus:outline-none"
                        />
                    </div>
                </FormRow>

                <FormRow label="배송 메세지">
          <textarea
              value={address.message}
              onChange={(e) => updateAddress("message", e.target.value)}
              className="bg-gray-100 rounded px-3 py-2 w-full h-32 border-none resize-none focus:outline-none"
          />
                </FormRow>
            </form>
        </>
    );
};

export default OrderAddr;
