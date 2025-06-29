import React from "react";
import Header from "../../knh/components/Header.jsx";
import Footer from "../../JangDJ/Footer.jsx";
import { useNavigate } from "react-router-dom";

const FormRow = ({ label, required, children }) => (
    <div className="flex items-start gap-4">
        <label className="w-32 text-gray-700 mt-2">
            {label}
            {required && <span className="text-blue-600">*</span>}
        </label>
        <div className="flex-1">{children}</div>
    </div>
);

const MyAddrUpdate = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header isDefaultBlack={true} />

            <div className="max-w-5xl mx-auto px-6 pt-36 pb-16">
                {/* 상단 제목 및 탭 */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My page</h2>
                    <div className="flex gap-2">
                        {["홈", "주문조회", "활동정보", "혜택정보", "회원정보"].map((item) => {
                            const isActive = item === "회원정보";
                            return (
                                <span
                                    key={item}
                                    onClick={() => {
                                        if (item === "회원정보") navigate("/myinfo");
                                        else if (item === "혜택정보") navigate("/mypoint");
                                        else navigate(`/${item.toLowerCase()}`);
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                                        isActive ? "bg-[#1B3C5C] text-white" : "bg-gray-200 text-gray-700"
                                    }`}
                                >
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                </div>

                <div className="h-[1px] bg-gray-200 mb-6"></div>

                {/* 탭 (배송주소록관리 활성화 상태) */}
                <div className="flex justify-center gap-8 text-lg font-medium mb-4">
                    {["회원정보수정", "배송주소록관리"].map((tab) => (
                        <div
                            key={tab}
                            onClick={() => {
                                if (tab === "회원정보수정") navigate("/myinfo");
                            }}
                            className="relative cursor-pointer w-40 text-center"
                        >
                            <span className={tab === "배송주소록관리" ? "font-semibold" : "text-gray-500"}>
                                {tab}
                            </span>
                            {tab === "배송주소록관리" && (
                                <div className="h-1 bg-[#1B3C5C] mt-1 w-full"></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="h-px bg-gray-200 mb-8"></div>

                {/* 배송지 등록 폼 */}
                <form className="space-y-6 max-w-3xl mx-auto">
                    <FormRow label="배송지명" required>
                        <input
                            type="text"
                            className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                        />
                    </FormRow>

                    <FormRow label="이름" required>
                        <input
                            type="text"
                            className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                        />
                    </FormRow>

                    <FormRow label="주소" required>
                        <div className="space-y-2 w-full">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="우편번호"
                                    className="bg-gray-100 rounded px-3 py-2 w-40 border-none focus:outline-none"
                                />
                                <button
                                    type="button"
                                    className="bg-[#1B3C5C] text-white rounded px-4 py-2 text-sm"
                                >
                                    우편번호 찾기
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="기본주소"
                                className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="나머지 주소"
                                className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                            />
                        </div>
                    </FormRow>

                    <FormRow label="휴대전화" required>
                        <div className="flex gap-2 items-center">
                            <select className="bg-gray-100 rounded px-2 py-2 w-20 border-none focus:outline-none">
                                <option>010</option>
                                <option>011</option>
                            </select>
                            <span>-</span>
                            <input type="text" className="bg-gray-100 rounded px-3 py-2 w-24 border-none focus:outline-none" />
                            <span>-</span>
                            <input type="text" className="bg-gray-100 rounded px-3 py-2 w-24 border-none focus:outline-none" />
                        </div>
                    </FormRow>

                    {/* 기본 배송지 체크 */}
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="default" className="accent-[#1B3C5C]" />
                        <label htmlFor="default" className="text-gray-700 text-sm">
                            기본 배송지로 저장
                        </label>
                    </div>

                    {/* 버튼 영역 */}
                    <div className="flex flex-col gap-4 mt-10 w-1/3 mx-auto">
                        <button
                            type="button"
                            onClick={() => navigate("/myaddr")}
                            className="w-full bg-gray-200 text-black py-3 rounded-md font-medium"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-[#1B3C5C] text-white py-3 rounded-md font-medium"
                        >
                            등록
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default MyAddrUpdate;
