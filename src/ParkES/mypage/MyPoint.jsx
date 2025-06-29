import React from 'react';
import Header from "../../knh/components/Header.jsx";
import Footer from "../../JangDJ/Footer.jsx";
import {useLocation, useNavigate} from 'react-router-dom';

const MyPoint = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 현재 경로에 따라 currentPage 값 설정
    // 예를 들어 /myinfo면 "회원정보", /mypoint면 "혜택정보"로 매핑
    const pathToPageName = {
        "/": "홈",
        "/주문조회": "주문조회",
        "/활동정보": "활동정보",
        "/mypoint": "혜택정보",
        "/mycoupon": "혜택정보",  // 추가
        "/myinfo": "회원정보",
    };

    // location.pathname 에서 현재 페이지 이름 가져오기 (없으면 빈 문자열)
    const currentPage = pathToPageName[location.pathname] || '';

    return (
        <div>
            <Header isDefaultBlack={true} />

            <div className="max-w-5xl mx-auto px-6 pt-36 pb-16">
                {/* 상단 네비게이션 */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My page</h2>
                    <div className="flex gap-2">
                        {["홈", "주문조회", "활동정보", "혜택정보", "회원정보"].map((item) => {
                            // 이동 경로 지정
                            let path = "/";
                            if (item === "혜택정보") path = "/mypoint";
                            else if (item === "회원정보") path = "/myinfo";
                            else path = `/${item.toLowerCase()}`; // 필요하면 조정

                            // 현재 페이지와 같으면 활성 스타일
                            const isActive = item === currentPage;

                            return (
                                <span
                                    key={item}
                                    onClick={() => navigate(path)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                                        isActive
                                            ? "bg-[#001F3F] text-white"
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

                {/* 포인트/쿠폰 탭 가운데 정렬 */}
                <div className="flex justify-center gap-8 text-lg font-medium mb-4">
                    <div className="relative cursor-pointer" onClick={() => navigate('/mypoint')}>
                        <span>적립금</span>
                        <div className="h-1 bg-black mt-1 w-full"></div>
                    </div>
                    <div
                        className="text-gray-500 cursor-pointer"
                        onClick={() => navigate('/mycoupon')}
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

            <Footer />
        </div>
    );
};

export default MyPoint;
