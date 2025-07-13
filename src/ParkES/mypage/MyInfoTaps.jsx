import React, { useState } from "react";
import TabMenu from "../../JungSY/mypage/components/TabMenu.jsx";
import MyInfoForm from "./MyInfoForm.jsx";

const MyInfoTabs = () => {
    const [activeTab, setActiveTab] = useState("회원정보수정");

    return (
        <div className="pt-[120px] max-w-4xl mx-auto px-4 text-gray-800 text-sm min-h-screen">
            {/* 상단 네비게이션 */}
            <TabMenu />

            <div className="h-[1px] bg-gray-200 mb-6"></div>

            {/* 탭 메뉴 */}
            <div className="flex justify-center gap-8 text-lg font-medium mb-4">
                {["회원정보수정", "배송주소록관리"].map((tab) => {
                    const selected = activeTab === tab;
                    return (
                        <div
                            key={tab}
                            className="relative cursor-pointer w-40 text-center"
                            onClick={() => setActiveTab(tab)}
                        >
              <span className={selected ? "font-semibold" : "text-gray-500"}>
                {tab}
              </span>
                            {selected && (
                                <div className="h-1 bg-[#1B3C5C] mt-1 w-full"></div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="h-px bg-gray-200 mb-6"></div>

            {/* 안내 텍스트 */}
            {activeTab === "회원정보수정" && (
                <div className="mb-6 text-center text-gray-500 text-sm">
                    저희 쇼핑몰을 이용해 주셔서 감사합니다.<br />
                    장다정 님은 [일반회원/배송비 무료] 회원이십니다.
                </div>
            )}

            {/* 회원정보수정 탭 */}
            {activeTab === "회원정보수정" && <MyInfoForm />}

            {/* 배송주소록관리 탭 */}
            {activeTab === "배송주소록관리" && (
                <div>
                    {/* 주소 목록 헤더 */}
                    <div className="flex text-sm text-gray-500 mb-2 text-center font-medium">
                        <div className="flex-1">배송지명</div>
                        <div className="flex-1">수령인</div>
                        <div className="flex-1">일반전화</div>
                        <div className="flex-1">휴대전화</div>
                        <div className="flex-[3] text-left px-2">주소</div>
                        <div className="flex-1">수정</div>
                    </div>

                    {/* 빈 상태 텍스트 */}
                    <div className="text-center text-gray-400 text-sm space-y-1 mt-10">
                        <p>등록된 주소가 없습니다.</p>
                    </div>

                    {/* 배송지 등록 버튼 */}
                    <div className="flex justify-center mt-12">
                        <button
                            type="button"
                            className="bg-[#1B3C5C] text-white w-[350px] h-[50px] rounded-lg"
                            onClick={() => alert("배송지 등록 페이지로 연결 예정")}
                            // 👉 실제로는 모달을 띄우거나, 추가 폼을 열 수도 있음
                        >
                            배송지 등록
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyInfoTabs;
