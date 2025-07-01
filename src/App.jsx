import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from "./knh/pages/Home/MainPage.jsx";
import Board from "./ParkES/board/Board.jsx";
import LoginRoutes from "./LoginRoutes.jsx";
import ProductList from "./JangDJ/ProductList.jsx";
import {CheckoutPage} from "./ParkES/payment/checkout.jsx";
import {SuccessPage} from "./ParkES/payment/success.jsx";
import {FailPage} from "./ParkES/payment/fail.jsx";
import ProductList from "./JangDJ/pages/proList/ProductList.jsx";
import {CheckoutPage} from "./ParkES/checkout.jsx";
import {SuccessPage} from "./ParkES/success.jsx";
import {FailPage} from "./ParkES/fail.jsx";
import Home from "./JungSY/Home.jsx";
import Community from "./ParkES/community/Community.jsx";
import Write from "./ParkES/board/Write.jsx";
import BoardDetail from "./ParkES/board/BoardDetail.jsx";
import EditPage from "./ParkES/board/EditPage.jsx";
import BoardSecret from "./ParkES/board/BoardSecret.jsx";
import MyPoint from "./ParkES/mypage/MyPoint.jsx";
import MyCoupon from "./ParkES/mypage/MyCoupon.jsx";
import MyInfo from "./ParkES/mypage/MyInfo.jsx";
import MyAddr from "./ParkES/mypage/MyAddr.jsx";
import MyAddrUpdate from "./ParkES/mypage/MyAddrUpdate.jsx";
import SearchPage from "./knh/pages/Search/SearchPage.jsx";
import ProductDetail from "./JangDJ/pages/proDetail/ProductDetail.jsx";
import MyPageRouter from "./JungSY/mypage/router/MyPageRouter.jsx";

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
                    onClick={() => navigate('/auth')}
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
                    onClick={() => navigate('/mypoint')}
                    className="w-full px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition"
                >
                    MyPage
                </button>

                <button
                    onClick={() => navigate('/detail')}
                    className="w-full px-4 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition"
                >
                    ProductDetail
                </button>
                <button
                    onClick={() => navigate('/mypage')}
                    className="w-full px-4 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
                >
                    Mypage
                </button>
            </div>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/list" element={<ProductList/>} />
            <Route path="/board" element={<Board />} />
            <Route path="/boarddetail/:no" element={<BoardDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/write" element={<Write/>} />
            <Route path="/edit/:no" element={<EditPage/>} />
            <Route path="/boardsecret/:id" element={<BoardSecret />} />
            <Route path="/mypoint" element={<MyPoint />} />
            <Route path="/mycoupon" element={<MyCoupon />} />
            <Route path="/myinfo" element={<MyInfo />} />
            <Route path="/myaddr" element={<MyAddr />} />
            <Route path="/myaddrupdate" element={<MyAddrUpdate />} />


            <Route path="/auth/*" element={<LoginRoutes />} />

            <Route path='/search' element={<SearchPage />} />
            <Route path="/*" element={<LoginRoutes />} />
            <Route path="/detail" element={<ProductDetail />} />
            <Route path="/auth/*" element={<LoginRoutes />} />
            <Route path={'/mypage/*'} element={<MyPageRouter />} />

            {/* ✅ /pay 하위 경로 */}
            <Route path="/pay" element={<CheckoutPage />} />
            <Route path="/pay/success" element={<SuccessPage />} />
            <Route path="/pay/fail" element={<FailPage />} />
        </Routes>
    );
}

export default App;
