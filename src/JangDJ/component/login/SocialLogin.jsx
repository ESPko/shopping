import {KAKAO_AUTH_URL, NAVER_AUTH_URL} from "../../../JungSY/LoginAPIConfig.js";
import naverbtn from '../../../assets/naver_login_btn.png';

function SocialLogin() {
    return (
        <div className="flex flex-col gap-3">
          <a href={KAKAO_AUTH_URL}>
            <button className="w-full py-3 bg-yellow-400 text-black rounded-md font-semibold flex items-center justify-center gap-2">
              <span>💬</span> 카카오 로그인
            </button>
          </a>

          <a href={NAVER_AUTH_URL}>
            <img
                src={naverbtn}
                alt="네이버 로그인"
                className="w-full h-[45px] rounded-md object-cover"
            />
          </a>
        </div>
    );
}

export default SocialLogin