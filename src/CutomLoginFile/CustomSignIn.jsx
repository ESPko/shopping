import React, { useState } from "react";
import { useAuth, useSignIn } from "@clerk/clerk-react";

function CustomSignIn({ onSignInSuccess }) {
    const { isSignedIn, signOut } = useAuth();
    const { signIn, setSession, isLoaded } = useSignIn();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // 소셜 로그인 버튼 클릭 시 실행
    const handleOAuthSignIn = async (provider) => {
        if (!isLoaded) return;
        try {
            await signIn.authenticateWithRedirect({ strategy: provider });
        } catch (err) {
            console.error("소셜 로그인 에러:", err);
            setErrorMsg("소셜 로그인 중 오류가 발생했습니다.");
        }
    };

    if (isSignedIn) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md text-center">
                <p className="mb-4">이미 로그인되어 있습니다.</p>
                <button
                    onClick={() => signOut()}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    로그아웃
                </button>
            </div>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            const res = await signIn.create({ identifier: email, password });

            if (res.status === "complete") {
                await setSession(res.createdSessionId);
                if (onSignInSuccess) {
                    onSignInSuccess();
                }
            } else {
                setErrorMsg("로그인에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (err) {
            console.error("Clerk 로그인 에러:", err);

            const errorCode = err.errors?.[0]?.code;
            const fallbackMsg =
                err.errors?.[0]?.message || err.message || "로그인 중 알 수 없는 오류가 발생했습니다.";

            const errorMap = {
                form_identifier_not_found: "등록되지 않은 이메일입니다.",
                form_password_incorrect: "비밀번호가 올바르지 않습니다.",
                form_identifier_exists: "이미 가입된 이메일입니다.",
                form_password_pwned: "이 비밀번호는 보안상 안전하지 않습니다.",
            };

            setErrorMsg(errorMap[errorCode] || fallbackMsg);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                >
                    로그인
                </button>
                {errorMsg && <p className="mt-3 text-red-500 text-center">{errorMsg}</p>}
            </form>

            <div className="mt-6 border-t pt-6">
                <p className="text-center mb-4 text-gray-600">소셜 로그인</p>
                <button
                    onClick={() => handleOAuthSignIn("oauth_google")}
                    className="w-full mb-3 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                    Google 계정으로 로그인
                </button>
                <button
                    onClick={() => handleOAuthSignIn("oauth_kakao")}
                    className="w-full py-3 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
                >
                    Kakao 계정으로 로그인
                </button>
            </div>
        </div>
    );
}

export default CustomSignIn;
