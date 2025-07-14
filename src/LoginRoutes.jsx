import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Home from "./JungSY/Home";
import Auth from "./JungSY/Auth";
import Profile from "./JungSY/Profile";
import Signup from "./JungSY/SignUp.jsx";

function LoginRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />  {/* /login */}
            <Route path="kakao/callback" element={<Auth />} />
            <Route path="naver/callback" element={<Auth />} />
            <Route path="profile" element={<Profile />} />
            <Route path="signup" element={<Signup />} />
        </Routes>
    );
}

export default LoginRoutes;
