import React, { useState } from 'react';
import TabMenu from "../../JungSY/mypage/components/TabMenu.jsx";

const MyBenefits = () => {
    const [activeTab, setActiveTab] = useState("point"); // 초기 탭

    return (
        <div className="pt-[120px] max-w-4xl mx-auto px-4 text-gray-800 text-sm min-h-screen mobile:pt-10">
            {/* 상단 탭 */}
            <TabMenu />


            {/* 포인트/쿠폰 탭 */}
            <div className="flex justify-center gap-8 text-lg font-medium mb-4 mobile:text-sm">
                <div
                    className={`cursor-pointer ${activeTab === "point" ? "text-black font-bold border-b-2 border-black" : "text-gray-500"}`}
                    onClick={() => setActiveTab("point")}
                >
                    적립금
                </div>
                <div
                    className={`cursor-pointer ${activeTab === "coupon" ? "text-black font-bold border-b-2 border-black" : "text-gray-500"}`}
                    onClick={() => setActiveTab("coupon")}
                >
                    쿠폰
                </div>
            </div>


            {/* 탭 콘텐츠 */}
            {activeTab === "point" && (
                <div>

                    <div className="h-px bg-gray-200 mb-6"></div>

                    <div className="text-center mb-1 text-sm text-gray-500">사용가능 적립금</div>
                    <div className="text-center text-3xl font-bold mb-6 mobile:text-xl">3,000원</div>

                    <div className="h-px bg-gray-200 mb-6"></div>

                    <div className="grid grid-cols-4 text-center text-sm text-gray-500 mb-2 mobile:text-xs">
                        <div>총 적립금</div>
                        <div>사용된 적립금</div>
                        <div>미가용 적립금</div>
                        <div>환불예정 적립금</div>
                    </div>
                    <div className="grid grid-cols-4 text-center text-lg font-bold mb-6">
                        <div>3,000원</div>
                        <div>0원</div>
                        <div>0원</div>
                        <div>0원</div>
                    </div>

                    <div className="grid grid-cols-4 text-sm text-gray-500 mb-3">
                        <div>주문날짜</div>
                        <div>적립금</div>
                        <div>관련주문</div>
                        <div>내용</div>
                    </div>

                    <div className="h-px bg-gray-200 mb-3"></div>

                    <div className="grid grid-cols-4 text-sm mb-1 mobile:text-xs">
                        <div>2025-06-20</div>
                        <div className="font-bold">3,000원</div>
                        <div className="text-gray-600"> </div>
                        <div className="text-gray-600">
                            SMS 수신동의 + 이메일 수신 동의 적립
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <span className="px-6 py-2">&lt;&nbsp;&nbsp;1&nbsp;&nbsp;&gt;</span>
                    </div>
                </div>
            )}

            {activeTab === "coupon" && (
                <div>


                    {/* 사용가능 쿠폰 수 (상단 여백 추가) */}
                    <div className="text-right text-sm text-gray-500 mt-6 mb-2">
                        사용가능 쿠폰 : 1장
                    </div>

                    <hr className="border-t border-gray-200 mb-4" />

                    {/* 쿠폰 목록 테이블 */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center">
                            <thead>
                            <tr className="text-gray-700">
                                <th className="py-2">번호</th>
                                <th>쿠폰명</th>
                                <th>쿠폰적용상품</th>
                                <th>구매금액</th>
                                <th>결제수단</th>
                                <th>쿠폰혜택</th>
                                <th>사용가능기간</th>
                            </tr>
                            </thead>

                            {/* 🔽 thead와 tbody 사이 회색 구분선 추가 */}
                            <tbody>
                            <tr>
                                <td colSpan="7">
                                    <hr className="border-t border-gray-200" />
                                </td>
                            </tr>

                            <tr className="border-b text-gray-700">
                                <td className="py-2">1</td>
                                <td>[회원] 신규가입 5% 할인 쿠폰</td>
                                <td>전체상품</td>
                                <td>제한없음</td>
                                <td>제한없음</td>
                                <td>5.0% 할인</td>
                                <td>2025.06.20 13:36:40 ~ 2025.06.27 13:36:40</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>



                    {/* 페이지네이션 */}
                    <div className="text-center mb-10 mt-10">
                        <span className="px-6 py-1">{`<  1  >`}</span>
                    </div>

                    {/* 쿠폰번호 입력 */}
                    <div className="flex flex-col items-center gap-3 mb-6">
                        <input
                            type="text"
                            className="bg-gray-100 border border-transparent rounded-md px-4 py-2 text-center w-60 text-sm"
                        />
                        <button
                            className="text-white font-bold rounded-md px-4 py-2 w-60 text-sm"
                            style={{ backgroundColor: "#1B3C5C" }}
                        >
                            쿠폰번호 인증
                        </button>
                    </div>

                    {/* 안내문구 (작은 폰트, 가운데 정렬) */}
                    <div className="text-center text-[12px] text-gray-600 space-y-1 mb-3">
                        <p>디아도라의 공식 유통사인 '하이라이트 브랜즈'에서 발행한 쿠폰만 등록이 가능합니다.</p>
                        <p className="font-semibold">(10~35자, 입력 시 '-' 기호 제외)</p>
                        <p>일부 상의 경우 쿠폰 사용이 제한될 수 있습니다.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBenefits;
