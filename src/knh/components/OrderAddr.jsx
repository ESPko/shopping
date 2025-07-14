import React, { useRef, useState, useEffect } from "react";
import useOrderAddrStore from "../Store/useAddrStore.jsx";

// ✅ 정렬 유연하게 대응
const FormRow = ({ label, required, children, alignTop = false }) => (
    <div className={`flex ${alignTop ? 'items-start' : 'items-center'} gap-4`}>
        <label className={`w-32 text-gray-700 ${alignTop ? 'mt-1' : ''}`}>
            {label}
            {required && <span className="text-blue-600">*</span>}
        </label>
        <div className="flex-1">{children}</div>
    </div>
);

const OrderAddr = ({ readOnly = false }) => {
    const { address, updateAddress, resetAddressToMember } = useOrderAddrStore();
    const [selectedOption, setSelectedOption] = useState("member");
    const address2Ref = useRef();

    useEffect(() => {
        if (!readOnly && selectedOption === "member") {
            resetAddressToMember();
        }
    }, [selectedOption, readOnly, resetAddressToMember]);

    const openPostcodePopup = () => {
        if (readOnly) return;
        new window.daum.Postcode({
            oncomplete: function (data) {
                updateAddress("postcode", data.zonecode);
                updateAddress("address1", data.address);
                updateAddress("address2", "");
                setTimeout(() => address2Ref.current?.focus(), 0);
            },
        }).open();
    };

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

    const selectRecentAddr = () => {
        Object.entries(recentAddr).forEach(([key, value]) => {
            updateAddress(key, value);
        });
    };

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

                {!readOnly && (
                    <>
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
                    </>
                )}

                <FormRow label="배송지명" required>
                    {readOnly ? (
                        <p>{address.label}</p>
                    ) : (
                        <input
                            type="text"
                            value={address.label}
                            onChange={(e) => updateAddress("label", e.target.value)}
                            className="bg-gray-100 rounded px-3 py-2 w-full"
                        />
                    )}
                </FormRow>

                <FormRow label="이름" required>
                    {readOnly ? (
                        <p>{address.name}</p>
                    ) : (
                        <input
                            type="text"
                            value={address.name}
                            onChange={(e) => updateAddress("name", e.target.value)}
                            className="bg-gray-100 rounded px-3 py-2 w-full"
                        />
                    )}
                </FormRow>

                <FormRow label="주소" required alignTop>
                    <div className="space-y-2 w-full">
                        {readOnly ? (
                            <>
                                <p>{address.postcode}</p>
                                <p>{address.address1}</p>
                                <p>{address.address2}</p>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="우편번호"
                                        value={address.postcode}
                                        onChange={(e) => updateAddress("postcode", e.target.value)}
                                        className="bg-gray-100 rounded px-3 text-sm py-3 w-40"
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
                                    className="bg-gray-100 rounded px-3 text-sm py-3 w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="나머지 주소"
                                    ref={address2Ref}
                                    value={address.address2}
                                    onChange={(e) => updateAddress("address2", e.target.value)}
                                    className="bg-gray-100 rounded px-3 text-sm py-3 w-full"
                                />
                            </>
                        )}
                    </div>
                </FormRow>

                <FormRow label="휴대전화" required>
                    {readOnly ? (
                        <p>{`${address.phone1}-${address.phone2}-${address.phone3}`}</p>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <select
                                value={address.phone1}
                                onChange={(e) => updateAddress("phone1", e.target.value)}
                                className="bg-gray-100 rounded px-2 py-2 w-20"
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
                                className="bg-gray-100 rounded px-3 py-2 w-24"
                            />
                            <span>-</span>
                            <input
                                type="text"
                                value={address.phone3}
                                onChange={(e) => updateAddress("phone3", e.target.value)}
                                className="bg-gray-100 rounded px-3 py-2 w-24"
                            />
                        </div>
                    )}
                </FormRow>

                <FormRow label="배송 메세지" alignTop>
                    {readOnly ? (
                        <p>{address.message}</p>
                    ) : (
                        <textarea
                            value={address.message}
                            onChange={(e) => updateAddress("message", e.target.value)}
                            className="bg-gray-100 rounded px-3 py-2 w-full h-32 resize-none"
                        />
                    )}
                </FormRow>
            </form>
        </>
    );
};

export default OrderAddr;
