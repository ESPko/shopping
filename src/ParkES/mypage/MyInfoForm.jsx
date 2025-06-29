import React from "react";

const FormRow = ({ label, required, children }) => (
    <div className="flex items-start gap-4">
        <label className="w-32 text-gray-700 mt-2">
            {label}
            {required && <span className="text-blue-600">*</span>}
        </label>
        <div className="flex-1">{children}</div>
    </div>
);

const MyInfoForm = () => {
    return (
        <form className="max-w-3xl mx-auto space-y-6">

            <FormRow label="아이디" required>
                <input
                    type="text"
                    defaultValue="user123"
                    readOnly
                    className="bg-gray-100 text-gray-700 rounded px-3 py-2 w-full border-none focus:outline-none"
                />
            </FormRow>

            <FormRow label="비밀번호" required>
                <div className="flex flex-col w-full">
                    <input
                        type="password"
                        placeholder="영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16자"
                        className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                    />
                    <small className="text-gray-400 text-xs mt-1">
                        (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16)
                    </small>
                </div>
            </FormRow>

            <FormRow label="비밀번호 확인" required>
                <input
                    type="password"
                    className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                />
            </FormRow>

            <FormRow label="이름" required>
                <input
                    type="text"
                    className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                />
            </FormRow>

            <FormRow label="주소">
                <div className="space-y-2 w-full">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="우편번호"
                            className="bg-gray-100 rounded px-3 py-2 w-40 border-none focus:outline-none"
                        />
                        <button
                            type="button"
                            className="bg-[#1B3C5C] text-white rounded px-4 py-2 text-sm"
                        >
                            우편번호 찾기
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="기본주소"
                        className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="나머지 주소"
                        className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                    />
                </div>
            </FormRow>

            <FormRow label="일반전화">
                <div className="flex gap-2 items-center">
                    <select className="bg-gray-100 rounded px-2 py-2 w-20 border-none focus:outline-none">
                        <option>02</option>
                        <option>031</option>
                    </select>
                    <span>-</span>
                    <input type="text" className="bg-gray-100 rounded px-3 py-2 w-24 border-none focus:outline-none" />
                    <span>-</span>
                    <input type="text" className="bg-gray-100 rounded px-3 py-2 w-24 border-none focus:outline-none" />
                </div>
            </FormRow>

            <FormRow label="휴대전화" required>
                <div className="flex gap-2 items-center">
                    <select className="bg-gray-100 rounded px-2 py-2 w-20 border-none focus:outline-none">
                        <option>010</option>
                        <option>011</option>
                    </select>
                    <span>-</span>
                    <input type="text" className="bg-gray-100 rounded px-3 py-2 w-24 border-none focus:outline-none" />
                    <span>-</span>
                    <input type="text" className="bg-gray-100 rounded px-3 py-2 w-24 border-none focus:outline-none" />
                </div>
            </FormRow>

            <FormRow label="SMS 수신" required>
                <div className="space-y-1">
                    <div className="flex gap-4">
                        <label className="flex gap-1">
                            <input type="radio" name="sms" value="yes" /> 수신함
                        </label>
                        <label className="flex gap-1">
                            <input type="radio" name="sms" value="no" /> 수신안함
                        </label>
                    </div>
                    <small className="text-gray-400">
                        쇼핑몰에서 제공하는 유익한 이벤트 소식을 sms로 받을 수 있습니다.
                    </small>
                </div>
            </FormRow>

            <FormRow label="이메일" required>
                <div className="space-y-1">
                    <div className="flex gap-4">
                        <label className="flex gap-1">
                            <input type="radio" name="email" value="yes" /> 수신함
                        </label>
                        <label className="flex gap-1">
                            <input type="radio" name="email" value="no" /> 수신안함
                        </label>
                    </div>
                    <small className="text-gray-400">
                        쇼핑몰에서 제공하는 유익한 이벤트 소식을 이메일로 받을 수 있습니다.
                    </small>
                </div>
            </FormRow>

            <FormRow label="생년월일">
                <div className="flex gap-2">
                    <input type="text" placeholder="1998" className="bg-gray-100 rounded px-3 py-2 w-20 border-none focus:outline-none" />
                    <input type="text" placeholder="11" className="bg-gray-100 rounded px-3 py-2 w-16 border-none focus:outline-none" />
                    <input type="text" placeholder="18" className="bg-gray-100 rounded px-3 py-2 w-16 border-none focus:outline-none" />
                </div>
            </FormRow>

            {/* 버튼 영역 */}
            <div className="flex justify-center gap-4 mt-10">
                <button
                    type="submit"
                    className="bg-[#1B3C5C] text-white font-semibold px-8 py-3 rounded-md"
                >
                    회원정보 수정
                </button>
                <button
                    type="button"
                    className="border border-[#1B3C5C] text-black font-semibold px-8 py-3 rounded-md bg-white"
                >
                    회원탈퇴
                </button>
            </div>
        </form>
    );
};

export default MyInfoForm;
