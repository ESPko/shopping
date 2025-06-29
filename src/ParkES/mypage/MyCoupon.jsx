import React from 'react';
import Header from "../../knh/components/Header.jsx";
import Footer from "../../JangDJ/Footer.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const MyCoupon = () => {
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

                {/* 구분선 */}
                <div className="h-[1px] bg-gray-200 mb-6"></div>

                {/* 포인트/쿠폰 탭 가운데 정렬 */}
                <div className="flex justify-center gap-8 text-lg font-medium mb-4">
                    <div
                        className="text-gray-500 cursor-pointer"
                        onClick={() => navigate('/mypoint')}
                    >
                        적립금
                    </div>
                    <div className="relative cursor-pointer" onClick={() => navigate('/mycoupon')}>
                        <span>쿠폰</span>
                        <div className="h-1 bg-black mt-1 w-full"></div>
                    </div>
                </div>

                <hr className="border-t border-gray-200 mb-4" />

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

            <Footer />
        </div>
    );
};

export default MyCoupon;
