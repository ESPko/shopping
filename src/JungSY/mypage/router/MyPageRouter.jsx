import React from 'react';
import {Routes, Route} from "react-router-dom";
import Header from "../../../knh/components/Header.jsx";
import Footer from "../../../JangDJ/Footer.jsx";
import MypageMainHome from "../layout/mypageMainHome.jsx";
import MypageMainOrderList from "../layout/mypageMainOrderList.jsx";
import MypageMainActivity from "../layout/mypageMainActivity.jsx";
import MypageMainBenefits from "../layout/mypageMainBenefits.jsx";
import MypageMainUserInfo from "../layout/mypageMainUserInfo.jsx";

function MyPageRouter() {
    return (
        <>
            <Header isDefaultBlack={true} />

            <Routes>
                <Route path={'/'} element={<MypageMainHome />} />
                <Route path={'orders'} element={<MypageMainOrderList />} />
                <Route path={'activity'} element={<MypageMainActivity />} />
                <Route path={'benefits'} element={<MypageMainBenefits />} />
                <Route path={'userinfo'} element={<MypageMainUserInfo />} />
            </Routes>

            <Footer />
        </>
    )
}

export default MyPageRouter;