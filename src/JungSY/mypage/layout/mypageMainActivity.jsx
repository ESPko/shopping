import React, { useState } from 'react';
import TabMenu from "../components/TabMenu.jsx";

function mypageMainActivity() {
    const [activeTab, setActiveTab] = useState("관심상품");

    return (
        <>
            <main className="pt-[120px] max-w-4xl mx-auto px-4 text-gray-800 text-sm min-h-screen">
                <TabMenu />

                {/* 중단 탭 메뉴 */}
                <div className="flex border-b text-center text-sm font-semibold mb-6">
                    {["관심상품", "리뷰", "Q&A"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 ${
                                activeTab === tab
                                    ? "border-b-2 border-black text-black"
                                    : "text-gray-500"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* 탭별 콘텐츠 */}
                {activeTab === "관심상품" && (
                    <>
                        {/* 상품 항목 */}
                        <div className="flex items-center justify-between border-b py-4">
                            {/* 체크박스 + 이미지 */}
                            <div className="flex items-start gap-3">
                                <input type="checkbox" className="self-center" />
                                <img
                                    src="/images/diadoraProduct.jpg"
                                    alt="관심상품"
                                    className="w-32 h-32 object-cover"
                                />
                            </div>

                            {/* 상품정보 */}
                            <div className="flex items-start">
                                <div>
                                    <div className="font-semibold mb-1 text-lg">경량 러닝 볼캡 CHARCOAL GREY</div>
                                    <a href="#" className="text-xs underline text-gray-500 hover:text-black transition">옵션변경</a>
                                </div>
                            </div>

                            {/* 가격 */}
                            <div className="flex items-start">
                                <div className="text-base font-semibold">59,000원</div>
                            </div>

                            {/* 버튼들 */}
                            <div className="text-center text-sm space-y-2">
                                <div className="text-xs text-gray-700 flex flex-col space-y-2">
                                    <a href="#" className="underline hover:text-black transition">주문하기</a>
                                    <a href="#" className="underline hover:text-black transition">장바구니담기</a>
                                    <a href="#" className="underline hover:text-red-500 transition">삭제</a>
                                </div>
                            </div>
                        </div>

                        {/* 하단 버튼 */}
                        <div className="flex gap-2 mt-6">
                            <button className="border px-4 py-2 rounded">선택삭제</button>
                            <button className="border px-4 py-2 rounded">선택담기</button>
                            <button className="border px-4 py-2 rounded">전체주문</button>
                        </div>
                    </>
                )}

                {/* 리뷰, Q&A는 준비 중 메시지 */}
                {activeTab !== "관심상품" && (
                    <div className="text-center text-gray-500 py-20">
                        <p>{activeTab} 내용이 없습니다.</p>
                    </div>
                )}
            </main>
        </>
    );
}

export default mypageMainActivity;
