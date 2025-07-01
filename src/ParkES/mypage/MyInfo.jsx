import React, {useState} from "react";
import Header from "../../knh/components/Header.jsx";
import Footer from "../../JangDJ/Footer.jsx";
import {useNavigate} from "react-router-dom";
import MyInfoForm from "./MyInfoForm.jsx";
import TabMenu from "../../JungSY/mypage/components/TabMenu.jsx"; // ✅ 폼 컴포넌트 임포트

const MyInfo = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("회원정보수정");

    return (

            <div className="pt-[120px] max-w-4xl mx-auto px-4 text-gray-800 text-sm min-h-screen">
                {/* 상단 네비게이션 */}
                <TabMenu />


                <div className="h-[1px] bg-gray-200 mb-6"></div>

                {/* 탭 영역 */}
                <div className="flex justify-center gap-8 text-lg font-medium mb-4">
                    {["회원정보수정", "배송주소록관리"].map((tab) => {
                        const selected = activeTab === tab;
                        return (
                            <div
                                key={tab}
                                className="relative cursor-pointer w-40 text-center" // ✅ 고정 너비 + 가운데 정렬
                                onClick={() => {
                                    if (tab === "회원정보수정") setActiveTab(tab);
                                    if (tab === "배송주소록관리") navigate("/myaddr");
                                }}
                            >
                <span className={selected ? "font-semibold" : "text-gray-500"}>
                    {tab}
                </span>
                                {selected && (
                                    <div className="h-1 bg-[#1B3C5C] mt-1 w-full"></div> // ✅ 밑줄은 탭 전체 너비 기준
                                )}
                            </div>
                        );
                    })}
                </div>


                <div className="h-px bg-gray-200 mb-6"></div>

                {/* 안내 텍스트 */}
                <div className="mb-6 text-center text-gray-500 text-sm">
                    저희 쇼핑몰을 이용해 주셔서 감사합니다.<br/>
                    장다정 님은 [일반회원/배송비 무료] 회원이십니다.
                </div>

                {/* 회원정보수정 탭일 때 폼 표시 */}
                {activeTab === "회원정보수정" && <MyInfoForm/>}

                {/* 배송주소록관리 탭은 이후 구현 */}
            </div>
    );
};

export default MyInfo;
