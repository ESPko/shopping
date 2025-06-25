const KAKAO_REST_API_KEY = 'a27204ea690d3ab5843d456e316188a1';
const KAKAO_REDIRECT_URI = 'http://localhost:5173/auth/kakao/callback';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const NAVER_CLIENT_ID = '48PBYBZSarndcewDcrh3';
const NAVER_REDIRECT_URI = 'http://localhost:5173/auth/naver/callback';
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=random1234`;




export {KAKAO_REST_API_KEY, KAKAO_AUTH_URL, KAKAO_REDIRECT_URI, NAVER_CLIENT_ID, NAVER_REDIRECT_URI, NAVER_AUTH_URL};