import React from 'react';
import TabMenu from "../components/TabMenu.jsx";

function mypageMainHome() {
    return (
        <>
            <main className="pt-[120px] max-w-4xl mx-auto px-4 text-gray-800 text-sm min-h-screen">
                {/* 제목 및 네비게이션 */}
                <TabMenu />

                {/* 인사 메시지 */}
                <div className="border-y py-7">
                    <span className="text-[#1B3C5C] font-semibold">정성윤</span>님 반갑습니다. 고객님은{" "}
                    <span className="text-[#1B3C5C] font-semibold">일반회원 / 배송비 무료</span> 등급입니다.
                </div>

                {/* 적립금, 쿠폰 */}
                <div className="border-b py-7 flex gap-8">
                    <div className="flex flex-1 items-center">
                        <strong className="font-semibold w-40">적립금</strong>
                        <a href="#" className="text-[#1B3C5C] font-medium text-left flex-1">3,000원</a>
                    </div>
                    <div className="flex flex-1 items-center">
                        <strong className="font-semibold w-40">쿠폰</strong>
                        <a href="#" className="text-[#1B3C5C] font-medium text-left flex-1">1장</a>
                    </div>
                </div>


                {/* 메뉴 블럭 */}
                <div className="grid md:grid-cols-2 gap-6 border-b py-7">
                    <div className={'flex flex-1 items-center'}>
                        <strong className="font-semibold w-40">주문조회</strong>
                        <div className="flex flex-1 gap-4">
                            <a href="#" className="hover:font-bold">주문내역</a>
                            <a href="#" className="hover:font-bold">교환/반품조회</a>
                        </div>
                    </div>
                    <div className={'flex flex-1 items-center'}>
                        <strong className="font-semibold w-40">활동정보</strong>
                        <div className="flex flex-1 gap-4">
                            <a href="#" className="hover:font-bold">관심상품</a>
                            <a href="#" className="hover:font-bold">리뷰</a>
                            <a href="#" className="hover:font-bold">Q&A</a>
                        </div>
                    </div>
                    <div className={'flex flex-1 items-center'}>
                        <strong className="font-semibold w-40">혜택정보</strong>
                        <div className="flex flex-1 gap-4">
                            <a href="#" className="hover:font-bold">적립금</a>
                            <a href="#" className="hover:font-bold">예치금</a>
                            <a href="#" className="hover:font-bold">쿠폰</a>
                            <a href="#" className="hover:font-bold">회원혜택안내</a>
                        </div>
                    </div>
                    <div className={'flex flex-1 items-center'}>
                        <strong className="font-semibold w-40">회원정보</strong>
                        <div className="flex flex-1 gap-4">
                            <a href="#" className="hover:font-bold">회원정보수정</a>
                            <a href="#" className="hover:font-bold">배송주소록관리</a>
                        </div>
                    </div>
                </div>

                {/* 주문 상태 */}
                <div className="grid md:grid-cols-2 text-sm border-b border-gray-300">
                    {["입금전", "배송준비중", "배송중", "배송완료"].map((label, index) => {
                        const isTop = index < 2;
                        const isLeft = index % 2 === 0;
                        const isRight = !isLeft;
                        return(
                            <div
                                key={index}
                                className={`flex flex-1 items-center py-3 h-44 text-sm
                                  ${isLeft ? "border-r" : ""}
                                  ${isTop ? "border-b" : ""}
                                  border-gray-300
                                  ${isRight ? "pl-3" : ""}
                                `}
                            >
                                    <strong className="text-black w-40">{label}</strong>
                                    <span className="text-xl font-bold flex-1">0</span>
                                </div>
                                )
                                })}
                </div>

                {/* 로그아웃 */}
                <div className={'text-right pt-4'}>
                    <button className={`border px-10 py-2 rounded-full font-bold transition ml-4 bg-[#1B3C5C] text-white border-[#1B3C5C]`}>로그아웃</button>
                </div>

            </main>
        </>
    )
}

export default mypageMainHome;