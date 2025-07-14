function login() {
    return (
        <div className="flex flex-col gap-3">
          <input
              type="text"
              placeholder="아이디"
              className="border border-gray-300 px-4 py-3 rounded-md"
          />
          <input
              type="password"
              placeholder="비밀번호"
              className="border border-gray-300 px-4 py-3 rounded-md"
          />

          <div className="text-sm text-right text-gray-600 mb-2">
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
    );
}

export default login