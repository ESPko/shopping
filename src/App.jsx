import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./JungSY/Home.jsx";
import Auth from "./JungSY/Auth.jsx";
import Profile from "./JungSY/Profile.jsx";


function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Home/>} />
                    <Route path={'/auth/kakao/callback'} element={<Auth />} />
                    <Route path={'/auth/naver/callback'} element={<Auth />} />
                    <Route path={'/profile'} element={<Profile/>} />
                    <Route path={'*'} element={<Navigate to={'/'} replace={true} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
