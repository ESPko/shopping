import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./JungSY/Home";
import Auth from "./JungSY/Auth";
import Profile from "./JungSY/Profile";

function LoginRoutes() {
    return (
        <Routes>
            <Route path="" element={<Home />} />  {/* /login */}
            <Route path="/auth/kakao/callback" element={<Auth />} />
            <Route path="/auth/naver/callback" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default LoginRoutes;
