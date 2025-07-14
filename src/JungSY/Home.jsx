import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from "./LoginAPIConfig.js";
import naverbtn from '../assets/naver_login_btn.png';
import Header from "../knh/components/Header.jsx";
import Footer from "../JangDJ/Footer.jsx";
import useAuthStore from "./UserAuthStore.js";

function Home() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const { setUser, setIsLoggedIn } = useAuthStore();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', {
                userId,
                password
            });

            const userData = res.data;
            // 로그인 성공 시
            setUser(userData);            // 전역 상태 저장
            setIsLoggedIn(true);
            setErrorMsg('');
            navigate('/');                // 홈 또는 마이페이지 이동
        } catch (err) {
            console.error(err);
            setErrorMsg('❌ 로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
        }
    };

    const handleSignup = () => {
        navigate('/auth/signup'); // 회원가입 페이지로 이동
    };

    return (
        <>
            <Header isDefaultBlack={true} />
            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <div className="w-full max-w-md">
                    <h2 className="text-center text-3xl font-bold mb-10">로그인</h2>

                    <div className="flex flex-col gap-2 mb-6">
                        <input
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="bg-gray-100 px-4 py-3"
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-100 px-4 py-3"
                        />

                        <div className="text-sm text-right text-gray-600 mb-3">
                            <a href="#" className="hover:underline">
                                아이디/비밀번호 찾기
                            </a>
                        </div>

                        {errorMsg && (
                            <div className="text-sm text-red-500">{errorMsg}</div>
                        )}

                        <button
                            className="w-full py-3 bg-[#1E3A5F] text-white rounded-md font-semibold"
                            onClick={handleLogin}
                        >
                            로그인
                        </button>

                        <button
                            className="w-full py-3 border border-gray-300 rounded-md font-semibold"
                            onClick={handleSignup}
                        >
                            회원가입
                        </button>
                    </div>

                    {/* 소셜 로그인 */}
                    <div className="flex flex-col gap-2">
                        <a href={KAKAO_AUTH_URL}>
                            <button className="w-full py-3 bg-yellow-400 text-black rounded-md font-semibold flex items-center justify-center gap-2">
                                <span>💬</span> 카카오 로그인
                            </button>
                        </a>
                        <a href={NAVER_AUTH_URL}>
                            <div className="w-full flex justify-center rounded-md bg-[#20C806]">
                                <img
                                    src={naverbtn}
                                    alt="네이버 로그인"
                                    className="h-[45px] rounded-md object-cover"
                                />
                            </div>
                        </a>
                    </div>

                    <div className="text-sm text-right mt-4 text-gray-600">
                        <a href="#" className="hover:underline">
                            비회원 주문 조회
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;
