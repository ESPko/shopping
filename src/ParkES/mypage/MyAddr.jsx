import React from "react";
import Header from "../../knh/components/Header.jsx";
import Footer from "../../JangDJ/Footer.jsx";
import {useNavigate} from "react-router-dom";
import TabMenu from "../../JungSY/mypage/components/TabMenu.jsx";

const MyAddr = () => {
    const navigate = useNavigate();

    const tabs = ["회원정보수정", "배송주소록관리"];
    const activeTab = "배송주소록관리";

    return (
        <div>

            <div className="pt-[120px] max-w-4xl mx-auto px-4 text-gray-800 text-sm min-h-screen">
                {/* 상단 네비게이션 */}
                <TabMenu />


                {/* 구분선 */}
                <div className="h-[1px] bg-gray-200 mb-6"></div>

                {/* 탭 영역 */}
                <div className="flex justify-center gap-8 text-lg font-medium mb-4">
                    {["회원정보수정", "배송주소록관리"].map((tab) => {
                        const selected = tab === "배송주소록관리"; // ✅ activeTab을 고정값으로 대체
                        return (
                            <div
                                key={tab}
                                className="relative cursor-pointer w-40 text-center"
                                onClick={() => {
                                    if (tab === "회원정보수정") navigate("/myinfo");
                                }}
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

                {/* 회색 줄 */}
                <div className="h-px bg-gray-200 mb-6"></div>

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
                        onClick={() => navigate("/myaddrupdate")} // ✅ 이동 기능 추가
                        className="bg-[#1B3C5C] text-white w-[350px] h-[50px] rounded-lg"
                    >
                        배송지 등록
                    </button>
                </div>
            </div>


        </div>
    );
};

export default MyAddr;
