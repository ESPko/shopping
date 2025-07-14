import React from 'react';
import {useNavigate} from "react-router-dom";
import {KAKAO_AUTH_URL, NAVER_AUTH_URL} from "./LoginAPIConfig.js";
import useAuthStore from "../store/useAuthStore.js";
import naverbtn from '../assets/naver_login_btn.png';
import Header from "../knh/components/Header.jsx";
import Footer from "../JangDJ/Footer.jsx";

function Home() {

    const {isLoggedIn} = useAuthStore();
    const nv = useNavigate();
    const onClickBtn = () => {
        nv('/auth/profile');
    };

    return (
        <>
            <div>
                <p>Welcome!</p>
                <div>
                    {isLoggedIn ? (
                        <button onClick={() => onClickBtn()}>마이페이지</button>
                    ) : (
                        <Login/>
                    )}
                </div>
            </div>
        </>
    )
}

function Login() {
    return (
        <>
            <Header isDefaultBlack={true} />
            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <div className="w-full max-w-md">
                    <h2 className="text-center text-3xl font-bold mb-10">로그인</h2>
                    {/*일반 로그인*/}
                    <div className="flex flex-col gap-2 mb-6">
                        <input
                            type="text"
                            placeholder="아이디"
                            className="bg-gray-100 px-4 py-3"
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            className="bg-gray-100 px-4 py-3"
                        />

                        <div className="text-sm text-right text-gray-600 mb-3">
                            <a href="#" className="hover:underline">
                                아이디/비밀번호 찾기
                            </a>
                        </div>

                        <button className="w-full py-3 bg-[#1E3A5F] text-white rounded-md font-semibold">
                            로그인
                        </button>

                        <button className="w-full py-3 border border-gray-300 rounded-md font-semibold">
                            회원가입
                        </button>
                    </div>
                    {/*쇼셜 로그인*/}
                    <div className="flex flex-col gap-2">
                        <a href={KAKAO_AUTH_URL}>
                            <button className="w-full py-3 bg-yellow-400 text-black rounded-md font-semibold flex items-center justify-center gap-2">
                                <span>💬</span> 카카오 로그인
                            </button>
                            {/*<div>카카오로 로그인하기</div>*/}
                        </a>

                        <a href={NAVER_AUTH_URL}>
                            <div className="w-full flex justify-center rounded-md bg-[#20C806]">
                                <img
                                    src={naverbtn}
                                    alt="네이버 로그인"
                                    className=" h-[45px] rounded-md object-cover"
                                />
                            </div>

                        </a>
                    </div>
                {/*    비회원 주문 조회*/}
                    <div className="text-sm text-right mt-4 text-gray-600">
                        <a href="#" className="hover:underline">
                            비회원 주문 조회
                        </a>
                    </div>
                </div>
            </div>
        {/*// <div className="min-h-screen flex items-center justify-center bg-white px-4">*/}
        {/*//     <div className="w-full max-w-md">*/}
        {/*//         <h2 className="text-center text-3xl font-bold mb-10">로그인</h2>*/}
        {/*//         <Login />*/}
        {/*//         <SocialLogin />*/}
        {/*//         <GuestOrder />*/}
        {/*//     </div>*/}
        {/*// </div>*/}
            <Footer />
        </>
    );
}

export default Home;