import React, { useState } from 'react';
import TabMenu from "../components/TabMenu.jsx";

function mypageMainOrderList() {
    const [activeTab, setActiveTab] = useState("주문내역");

    const orderStatusOptions = [
        "전체 주문처리상태",
        "입금전",
        "배송준비중",
        "배송중",
        "배송완료",
        "취소",
        "교환",
        "반품",
    ];

    return (
        <>
            <main className="pt-[120px] max-w-4xl mx-auto px-4 text-gray-800 text-sm min-h-screen">
                <TabMenu />

                {/* 상단 탭 */}
                <div className="flex border-b text-center text-sm font-semibold mb-8">
                    {["주문내역", "교환/반품조회"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 ${
                                activeTab === tab
                                    ? "border-b-2 border-black text-black"
                                    : "text-gray-500"
                            }`}
                        >
                            {tab} (0)
                        </button>
                    ))}
                </div>

                {/* 날짜 필터 및 검색 (select는 주문내역 탭에서만 표시) */}
                <div className="flex justify-between items-center gap-2 mb-6">
                    {activeTab === "주문내역" && (
                        <div className="relative min-w-max">
                            <select
                                className="border px-3 pr-6 h-11 text-sm rounded bg-white appearance-none"
                                defaultValue="전체 주문처리상태"
                            >
                                {orderStatusOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            {/* ▼ 커스텀 화살표 */}
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                ▼
                            </div>
                        </div>
                    )}

                    {["오늘", "1주일", "1개월", "3개월", "6개월"].map((label) => (
                        <button
                            key={label}
                            className="px-2 py-2 bg-white hover:bg-gray-50 h-11 min-w-max"
                        >
                            {label}
                        </button>
                    ))}

                    <input
                        type="date"
                        className="border px-3 h-11 rounded text-sm min-w-[150px]"
                        defaultValue="2025-03-29"
                    />
                    <span className="text-gray-500">~</span>
                    <input
                        type="date"
                        className="border px-3 h-11 rounded text-sm min-w-[150px]"
                        defaultValue="2025-06-27"
                    />
                    <button className="px-4 h-11 bg-black text-white rounded min-w-max">
                        조회
                    </button>
                </div>



                {/* 안내 문구 */}
                <ul className="text-xs text-gray-500 mb-6 space-y-1">
                    <li>· 기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 지난 주문내역도 조회하실 수 있습니다.</li>
                    <li>· 주문번호를 클릭하시면 해당 주문에 대한 상세내역을 확인하실 수 있습니다.</li>
                </ul>


                {/* 테이블 헤더 */}
                <div className="grid grid-cols-4 text-center bg-gray-100 py-2 font-semibold border border-gray-300 text-sm mobile:text-xs">
                    <div>주문일자 [주문번호]</div>
                    <div>상품</div>
                    <div>주문처리상태</div>
                    <div>취소/교환/반품</div>
                </div>

                {/* 내용 */}
                <div className="py-10 text-center text-gray-500 border-b">
                    {activeTab === "주문내역"
                        ? "주문 내역이 없습니다."
                        : "교환/반품 내역이 없습니다."}
                </div>

                {/* 페이지네이션 */}
                <div className="flex justify-center py-6 text-sm space-x-3">
                    <button className="text-gray-400">&lt;</button>
                    <span className="font-bold text-black">1</span>
                    <button className="text-gray-400">&gt;</button>
                </div>
            </main>
        </>
    );
}

export default mypageMainOrderList;
