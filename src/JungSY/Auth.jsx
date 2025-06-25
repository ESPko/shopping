import React, {useEffect, useRef, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Auth() {
    const location = useLocation();
    const nv = useNavigate();
    const [error, setError] = useState(null);
    const hasRun = useRef(false);


    useEffect(() => {

        if(hasRun.current) return;
        hasRun.current = true;

        const code = new URLSearchParams(location.search).get('code');
        const state = new URLSearchParams(location.search).get('state');
        if (!code) {
            setError("인가 코드가 없습니다.");
            return;
        }

        const pathname = location.pathname;
        const provider = pathname.includes('kakao')
            ? 'kakao'
            : pathname.includes('naver')
                ? 'naver'
                : null;

        if (!provider) {
            setError("지원하지 않는 로그인 경로입니다.");
            return;
        }

        const UserInfo = async () => {
            try {
                let url = `http://localhost:8080/oauth/${provider}?code=${code}`;
                if (provider === 'naver' && state) {
                    url += `&state=${state}`;
                }
                const res = await axios.get(url);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                console.log('로그인 결과:', res.data);
                nv('/profile');
            } catch (err) {
                setError('로그인 실패: ' + err.message);
            }
        };

        UserInfo();
    }, [location, nv]);

    if (error) return <div>{error}</div>;
    return <div>로그인 처리 중입니다...</div>;
}

export default Auth;
