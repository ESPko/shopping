import React from 'react';
import {useNavigate} from 'react-router-dom';
import TabMenu from "../../JungSY/mypage/components/TabMenu.jsx";

const MyPoint = () => {
    const navigate = useNavigate();


    return (
        <div>

            <div className="pt-[120px] max-w-4xl mx-auto px-4 text-gray-800 text-sm min-h-screen">
                {/* 상단 네비게이션 */}
                <TabMenu />


                <div className="h-[1px] bg-gray-200 mb-6"></div>

                {/* 포인트/쿠폰 탭 가운데 정렬 */}
                <div className="flex justify-center gap-8 text-lg font-medium mb-4">
                    <div className="relative cursor-pointer" onClick={() => navigate('/mypage/mypoint')}>
                        <span>적립금</span>
                        <div className="h-1 bg-black mt-1 w-full"></div>
                    </div>
                    <div
                        className="text-gray-500 cursor-pointer"
                        onClick={() => navigate('/mypage/mycoupon')}
                    >
                        쿠폰
                    </div>
                </div>

                <div className="h-px bg-gray-200 mb-6"></div>

                <div className="text-center mb-1 text-sm text-gray-500">사용가능 적립금</div>
                <div className="text-center text-3xl font-bold mb-6">3,000원</div>

                <div className="h-px bg-gray-200 mb-6"></div>

                <div className="grid grid-cols-4 text-center text-sm text-gray-500 mb-2">
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

                <div className="h-px bg-gray-200 mb-6"></div>

                <div className="grid grid-cols-4 text-sm text-gray-500 mb-3">
                    <div>주문날짜</div>
                    <div>적립금</div>
                    <div>관련주문</div>
                    <div>내용</div>
                </div>

                <div className="h-px bg-gray-200 mb-3"></div>

                <div className="grid grid-cols-4 text-sm mb-1">
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

        </div>
    );
};

export default MyPoint;
