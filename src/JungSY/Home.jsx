import React from 'react';
import {useNavigate} from "react-router-dom";
import {KAKAO_AUTH_URL, NAVER_AUTH_URL} from "./LoginAPIConfig.js";
import useAuthStore from "../store/useAuthStore.js";
import naverbtn from '../assets/naver_login_btn.png';

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
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <a href={KAKAO_AUTH_URL}>
                <div>카카오로 로그인하기</div>
            </a>

            <a href={NAVER_AUTH_URL}>
                <img src={naverbtn} alt="네이버 로그인" style={{height: '45px'}}/>
            </a>
        </div>
    );
}

export default Home;