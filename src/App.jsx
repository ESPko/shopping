import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from "./knh/pages/Home/MainPage.jsx";
import Board from "./ParkES/Board.jsx";
import LoginRoutes from "./LoginRoutes.jsx";
import ProductList from "./JangDJ/pages/proList/ProductList.jsx";
import {CheckoutPage} from "./ParkES/checkout.jsx";
import {SuccessPage} from "./ParkES/success.jsx";
import {FailPage} from "./ParkES/fail.jsx";
import Home from "./JungSY/Home.jsx";
import ProductDetail from "./JangDJ/pages/proDetail/ProductDetail.jsx";

function Menu() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-8 px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">페이지 선택</h1>
            <div className="space-y-4 w-full max-w-xs">
                <button
                    onClick={() => navigate('/main')}
                    className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                >
                    MainPage
                </button>
                <button
                    onClick={() => navigate('/list')}
                    className="w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                >
                    ProductList
                </button>
                <button
                    onClick={() => navigate('/board')}
                    className="w-full px-4 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition"
                >
                    Board
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="w-full px-4 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate('/pay')}
                    className="w-full px-4 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition"
                >
                    Pay
                </button>
                <button
                    onClick={() => navigate('/detail')}
                    className="w-full px-4 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition"
                >
                    ProductDetail
                </button>
            </div>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/menu" element={<Menu />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/list" element={<ProductList/>} />
            <Route path="/board" element={<Board />} />
            <Route path="/*" element={<LoginRoutes />} />
            <Route path="/detail" element={<ProductDetail />} />

            {/* ✅ /pay 하위 경로 */}
            <Route path="/pay" element={<CheckoutPage />} />
            <Route path="/pay/success" element={<SuccessPage />} />
            <Route path="/pay/fail" element={<FailPage />} />
        </Routes>
    );
}

export default App;
