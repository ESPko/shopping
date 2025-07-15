import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TabMenu from "../components/TabMenu.jsx";

function MypageMainHome() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 유저 정보 불러오기
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/auth/me', {
                    withCredentials: true,
                });
                setUser(res.data);
            } catch (err) {
                console.error("로그인 정보 없음 또는 세션 만료", err);
                // 필요시 로그인 페이지로 이동
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // 로그아웃 처리
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/auth/logout', {}, {
                withCredentials: true,
            });
            setUser(null);
            window.location.href = "/"; // 홈이나 로그인 페이지로 이동
        } catch (err) {
            console.error("로그아웃 실패", err);
        }
    };

    if (loading) return <div className="pt-[120px] text-center">로딩 중...</div>;

    return (
        <main className="pt-[120px] max-w-4xl mx-auto px-4 text-gray-800 text-sm min-h-screen">
            <TabMenu />

            {/* 유저 정보가 없을 때 */}
            {!user ? (
                <div className="py-10 text-center text-red-500">로그인이 필요합니다.</div>
            ) : (
                <>
                    {/* 인사 메시지 */}
                    <div className="border-y py-7">
                        <span className="text-[#1B3C5C] font-semibold">{user.nickname}</span>님 반갑습니다. 고객님은{" "}
                        <span className="text-[#1B3C5C] font-semibold">일반회원 / 배송비 무료</span> 등급입니다.
                    </div>

                    {/* 적립금, 쿠폰 - 추후 연동 */}
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
                        {/* 메뉴 항목들 그대로 유지 */}
                        {/* ...생략된 부분 동일 */}
                    </div>

                    {/* 주문 상태 */}
                    <div className="grid md:grid-cols-2 text-sm border-b border-gray-300">
                        {["입금전", "배송준비중", "배송중", "배송완료"].map((label, index) => {
                            const isTop = index < 2;
                            const isLeft = index % 2 === 0;
                            const isRight = !isLeft;
                            return (
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
                            );
                        })}
                    </div>

                    {/* 로그아웃 */}
                    <div className={'text-right pt-4'}>
                        <button
                            onClick={handleLogout}
                            className={`border px-10 py-2 rounded-full mb-5 font-bold transition ml-4 bg-[#1B3C5C] text-white border-[#1B3C5C]`}>
                            로그아웃
                        </button>
                    </div>
                </>
            )}
        </main>
    );
}

export default MypageMainHome;
