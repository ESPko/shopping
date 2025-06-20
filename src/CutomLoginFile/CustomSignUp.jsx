import React, {useState} from 'react';
import { useSignUp } from "@clerk/clerk-react";

function CustomSignUp({onSignUpSuccess }) {
    const { signUp, setSession, isLoaded } = useSignUp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            const res = await signUp.create({ identifier: email, password });
            if (res.status === "complete") {
                await setSession(res.createdSessionId);
                onSignUpSuccess && onSignUpSuccess();
            } else if (res.status === "needs_email_verification") {
                alert("이메일 인증이 필요합니다. 이메일을 확인해주세요.");
            }
        } catch (err) {
            setErrorMsg(err.errors?.[0]?.longMessage || "회원가입 실패");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>회원가입</h2>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <br/>
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <br/>
                <button type="submit">회원가입</button>
                {errorMsg && <p style={{color: "red"}}>{errorMsg}</p>}
            </form>
        </>
    )
}

export default CustomSignUp;