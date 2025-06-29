import React, {useState} from "react";
import Header from "../../knh/components/Header.jsx";
import Footer from "../../JangDJ/Footer.jsx";
import {useNavigate} from "react-router-dom";
import MyInfoForm from "./MyInfoForm.jsx"; // ✅ 폼 컴포넌트 임포트

const MyInfo = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("회원정보수정");

    return (
        <div>
            <Header isDefaultBlack={true}/>

            <div className="max-w-5xl mx-auto px-6 pt-36 pb-16">
                {/* 상단 네비게이션 */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My page</h2>
                    <div className="flex gap-2">
                        {["홈", "주문조회", "활동정보", "혜택정보", "회원정보"].map((item) => {
                            const isActive = item === "회원정보";
                            return (
                                <span
                                    key={item}
                                    onClick={() => {
                                        if (item === "회원정보") return;
                                        if (item === "혜택정보") navigate("/mypoint");
                                        else navigate(`/${item.toLowerCase()}`);
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                                        isActive
                                            ? "bg-[#1B3C5C] text-white"
                                            : "bg-gray-200 text-gray-700"
                                    }`}
                                >
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                </div>

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

            <Footer/>
        </div>
    );
};

export default MyInfo;
