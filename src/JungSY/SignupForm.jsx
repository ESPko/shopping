import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormRow = ({ label, required, children }) => (
    <div className="flex items-start gap-4">
        <label className="w-32 text-gray-700 mt-2">
            {label}
            {required && <span className="text-blue-600">*</span>}
        </label>
        <div className="flex-1">{children}</div>
    </div>
);

const SignupForm = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [smsReceive, setSmsReceive] = useState('yes');
    const [emailReceive, setEmailReceive] = useState('yes');
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [phoneArea, setPhoneArea] = useState('02');
    const [phoneMiddle, setPhoneMiddle] = useState('');
    const [phoneLast, setPhoneLast] = useState('');
    const [mobileArea, setMobileArea] = useState('010');
    const [mobileMiddle, setMobileMiddle] = useState('');
    const [mobileLast, setMobileLast] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // 필수 항목 체크
        if (!userId || !password || !confirmPassword || !nickname || !email) {
            return setError('❗ 모든 필수 정보를 입력해주세요.');
        }
        if (password !== confirmPassword) {
            return setError('❗ 비밀번호가 일치하지 않습니다.');
        }

        try {
            const res = await axios.post('http://localhost:8080/api/auth/register', {
                userId,
                password,
                nickname,
                email,
                smsReceive,
                emailReceive,
                birthDate: `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`,
                address: {
                    zipCode,
                    address1,
                    address2,
                },
                phone: `${phoneArea}-${phoneMiddle}-${phoneLast}`,
                mobile: `${mobileArea}-${mobileMiddle}-${mobileLast}`
            });

            alert('✅ 회원가입 성공!');
            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data || '회원가입 실패');
        }
    };

    return (
        <form className="max-w-3xl mx-auto space-y-6" onSubmit={handleSignup}>
            <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>

            <FormRow label="아이디" required>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="bg-gray-100 rounded px-3 py-2 w-full"
                />
            </FormRow>

            <FormRow label="비밀번호" required>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16자"
                    className="bg-gray-100 rounded px-3 py-2 w-full"
                />
            </FormRow>

            <FormRow label="비밀번호 확인" required>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-100 rounded px-3 py-2 w-full"
                />
            </FormRow>

            <FormRow label="닉네임" required>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="bg-gray-100 rounded px-3 py-2 w-full"
                />
            </FormRow>

            <FormRow label="이메일" required>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-100 rounded px-3 py-2 w-full"
                />
            </FormRow>

            <FormRow label="SMS 수신" required>
                <div className="space-y-1">
                    <div className="flex gap-4">
                        <label className="flex gap-1 items-center">
                            <input
                                type="radio"
                                name="sms"
                                value="yes"
                                checked={smsReceive === 'yes'}
                                onChange={() => setSmsReceive('yes')}
                            /> 수신함
                        </label>
                        <label className="flex gap-1 items-center">
                            <input
                                type="radio"
                                name="sms"
                                value="no"
                                checked={smsReceive === 'no'}
                                onChange={() => setSmsReceive('no')}
                            /> 수신안함
                        </label>
                    </div>
                    <small className="text-gray-400 text-xs">
                        쇼핑몰에서 제공하는 유익한 이벤트 소식을 SMS로 받을 수 있습니다.
                    </small>
                </div>
            </FormRow>

            <FormRow label="이메일 수신" required>
                <div className="space-y-1">
                    <div className="flex gap-4">
                        <label className="flex gap-1 items-center">
                            <input
                                type="radio"
                                name="emailReceive"
                                value="yes"
                                checked={emailReceive === 'yes'}
                                onChange={() => setEmailReceive('yes')}
                            /> 수신함
                        </label>
                        <label className="flex gap-1 items-center">
                            <input
                                type="radio"
                                name="emailReceive"
                                value="no"
                                checked={emailReceive === 'no'}
                                onChange={() => setEmailReceive('no')}
                            /> 수신안함
                        </label>
                    </div>
                    <small className="text-gray-400 text-xs">
                        쇼핑몰에서 제공하는 유익한 이벤트 소식을 이메일로 받을 수 있습니다.
                    </small>
                </div>
            </FormRow>

            <FormRow label="생년월일">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="1998"
                        maxLength={4}
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value.replace(/\D/,''))}
                        className="bg-gray-100 rounded px-3 py-2 w-20 border-none focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="11"
                        maxLength={2}
                        value={birthMonth}
                        onChange={(e) => setBirthMonth(e.target.value.replace(/\D/,''))}
                        className="bg-gray-100 rounded px-3 py-2 w-16 border-none focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="18"
                        maxLength={2}
                        value={birthDay}
                        onChange={(e) => setBirthDay(e.target.value.replace(/\D/,''))}
                        className="bg-gray-100 rounded px-3 py-2 w-16 border-none focus:outline-none"
                    />
                </div>
            </FormRow>

            <FormRow label="주소">
                <div className="space-y-2 w-full">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="우편번호"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="bg-gray-100 rounded px-3 py-2 w-40 border-none focus:outline-none"
                        />
                        <button
                            type="button"
                            className="bg-[#1B3C5C] text-white rounded px-4 py-2 text-sm"
                            onClick={() => alert('우편번호 찾기 API 연동 필요')}
                        >
                            우편번호 찾기
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="기본주소"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                        className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="나머지 주소"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        className="bg-gray-100 rounded px-3 py-2 w-full border-none focus:outline-none"
                    />
                </div>
            </FormRow>

            <FormRow label="일반전화">
                <div className="flex gap-2 items-center">
                    <select
                        className="bg-gray-100 rounded px-2 py-2 w-20 border-none focus:outline-none"
                        value={phoneArea}
                        onChange={(e) => setPhoneArea(e.target.value)}
                    >
                        <option>02</option>
                        <option>031</option>
                        <option>032</option>
                        <option>010</option>
                    </select>
                    <span>-</span>
                    <input
                        type="text"
                        value={phoneMiddle}
                        onChange={(e) => setPhoneMiddle(e.target.value.replace(/\D/,''))}
                        className="bg-gray-100 rounded px-3 py-2 w-24 border-none focus:outline-none"
                    />
                    <span>-</span>
                    <input
                        type="text"
                        value={phoneLast}
                        onChange={(e) => setPhoneLast(e.target.value.replace(/\D/,''))}
                        className="bg-gray-100 rounded px-3 py-2 w-24 border-none focus:outline-none"
                    />
                </div>
            </FormRow>

            <FormRow label="휴대전화" required>
                <div className="flex gap-2 items-center">
                    <select
                        className="bg-gray-100 rounded px-2 py-2 w-20 border-none focus:outline-none"
                        value={mobileArea}
                        onChange={(e) => setMobileArea(e.target.value)}
                    >
                        <option>010</option>
                        <option>011</option>
                        <option>016</option>
                    </select>
                    <span>-</span>
                    <input
                        type="text"
                        value={mobileMiddle}
                        onChange={(e) => setMobileMiddle(e.target.value.replace(/\D/,''))}
                        className="bg-gray-100 rounded px-3 py-2 w-24 border-none focus:outline-none"
                    />
                    <span>-</span>
                    <input
                        type="text"
                        value={mobileLast}
                        onChange={(e) => setMobileLast(e.target.value.replace(/\D/,''))}
                        className="bg-gray-100 rounded px-3 py-2 w-24 border-none focus:outline-none"
                    />
                </div>
            </FormRow>

            {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div className="flex justify-center mt-10">
                <button
                    type="submit"
                    className="bg-[#1B3C5C] text-white font-semibold px-8 py-3 rounded-md"
                >
                    회원가입
                </button>
            </div>
        </form>
    );
};

export default SignupForm;
