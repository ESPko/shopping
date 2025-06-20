import React from 'react';
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";

function TestHome() {
    return (
        <>
            <div>
                <h1 class={"text-3xl font-bold"}>홈</h1>
                <SignedIn>
                    <p>로그인 상태</p>
                    <UserButton/>
                </SignedIn>
                <br/>
                <hr/>
                <br/>
                <SignedOut>
                    <p>로그인 해주세요,,,,</p>
                    <SignInButton mode={'modal'}/>
                </SignedOut>
            </div>
        </>
    )
}

export default TestHome;