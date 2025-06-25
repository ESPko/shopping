import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Home from "./JungSY/Home";
import Auth from "./JungSY/Auth";
import Profile from "./JungSY/Profile";

function LoginRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Home />} />  {/* /login */}
            <Route path="/login/auth/kakao/callback" element={<Auth />} />
            <Route path="/login/auth/naver/callback" element={<Auth />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default LoginRoutes;
