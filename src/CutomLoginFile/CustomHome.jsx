import React, {useState} from 'react';
import CustomSignUp from "./CustomSignUp.jsx";
import CustomSignIn from "./CustomSignIn.jsx";

function CustomHome() {
    const [isSignUp, setIsSignUp] = useState(false);
    const handleLoginSuccess = () => {
        alert("로그인 성공!");
        // 예: navigate("/dashboard") 등 원하는 이동 가능
    };
    return (
        <>
            <div>
                {isSignUp ? (
                    <>
                        <CustomSignUp onSignUpSuccess={handleLoginSuccess}/>
                        <button onClick={() => setIsSignUp(false)}>로그인 하러 가기</button>
                    </>
                ) : (
                    <>
                        <CustomSignIn onSignInSuccess={handleLoginSuccess}/>
                        <button onClick={() => setIsSignUp(true)}>회원가입 하러 가기</button>
                    </>
                )}
            </div>
        </>
    )
}

export default CustomHome;