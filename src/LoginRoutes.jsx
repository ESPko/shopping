import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Home from "./JungSY/Home";
import Auth from "./JungSY/Auth";
import Profile from "./JungSY/Profile";

function LoginRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />  {/* /login */}
            <Route path="kakao/callback" element={<Auth />} />
            <Route path="naver/callback" element={<Auth />} />
            <Route path="profile" element={<Profile />} />
        </Routes>
    );
}

export default LoginRoutes;
