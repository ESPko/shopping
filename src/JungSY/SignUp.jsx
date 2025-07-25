import React from "react";
import SignupForm from "./SignupForm";
import Header from "../knh/components/Header.jsx";
import Footer from "../JangDJ/Footer.jsx";

const Signup = () => {
    return (
        <>
            <Header isDefaultBlack={true} />

            <div className="pt-[120px] max-w-3xl mx-auto px-4 text-gray-800 min-h-screen mb-5 mobile:pt-10">

                {/* 회원가입 폼 삽입 */}
                <SignupForm />
            </div>

            <Footer />
        </>
    );
};

export default Signup;
