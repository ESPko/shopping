import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from "./knh/pages/Home/MainPage.jsx";
import Board from "./ParkES/Board.jsx";
import LoginRoutes from "./LoginRoutes.jsx";
import ProductList from "./JangDJ/ProductList.jsx";

function Home() {
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
                    onClick={() => navigate('/login')}
                    className="w-full px-4 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

function App() {
    return (
        <Routes>
            {/*<Route path="/" element={<Home />} />*/}
            <Route path="/main" element={<MainPage />} />
            <Route path="/list" element={<ProductList/>} />
            <Route path="/board" element={<Board />} />
            <Route path="/login/*" element={<LoginRoutes />} />
        </Routes>
    );
}

export default App;
