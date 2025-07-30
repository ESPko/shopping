import { Routes, Route } from 'react-router-dom';
import MainPage from "./knh/pages/Home/MainPage.jsx";
import Qna from "./ParkES/Qna/Qna.jsx";
import LoginRoutes from "./LoginRoutes.jsx";
import { CheckoutPage } from "./ParkES/payment/checkout.jsx";
import { SuccessPage } from "./ParkES/payment/success.jsx";
import { FailPage } from "./ParkES/payment/fail.jsx";
import Community from "./ParkES/community/Community.jsx";
import QnaDetail from "./ParkES/Qna/QnaDetail.jsx";
import QnaEdit from "./ParkES/Qna/QnaEdit.jsx";
import QnaSecret from "./ParkES/Qna/QnaSecret.jsx";
import MyAddrUpdate from "./ParkES/mypage/MyAddrUpdate.jsx";
import ProductDetail from "./JangDJ/pages/proDetail/ProductDetail.jsx";
import MyPageRouter from "./JungSY/mypage/router/MyPageRouter.jsx";
import ProductList from "./JangDJ/pages/proList/ProductList.jsx";
import SearchPage from "./knh/pages/Search/SearchPage.jsx";
import QnaWrite from "./ParkES/Qna/QnaWrite.jsx";
import CartPage from "./knh/pages/Cart/CartPage.jsx";
import OrderPage from "./knh/pages/ Order/OrderPage.jsx";
import OrderCompletePage from "./knh/pages/OrderComplete/OrderCompletePage.jsx";
import PrivateRoute from "./JungSY/PrivateRoute.jsx";
import CommunityDetail from "./ParkES/community/CommunityDetail.jsx";
import ReviewForm from "./JangDJ/component/preDetail/ReviewFormModal.jsx";
import ProQnaWrite from "./JangDJ/component/preDetail/ProQnaWrite.jsx";
import ProQna from "./JangDJ/component/preDetail/ProQna.jsx";
import QnaList from "./ParkES/Qna/QnaList.jsx";
import ProQnaList from "./JangDJ/component/preDetail/ProQnaList.jsx";
import ProQnaSecret from "./JangDJ/component/preDetail/ProQnaSecret.jsx";
import ProQnaDetail from "./JangDJ/component/preDetail/ProQnaDetail.jsx";
import ProQnaEdit from "./JangDJ/component/preDetail/ProQnaEdit.jsx";


function App() {
        return (
            <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/list" element={<ProductList />} />
                    <Route path="/qna" element={<Qna />} />
                    <Route path="/qnadetail/:no" element={<QnaDetail />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/community/:id" element={<CommunityDetail />} />
                    <Route path="/qnawrite" element={<QnaWrite />} />
                    <Route path="/qnaedit/:no" element={<QnaEdit />} />
                    <Route path="/qnasecret/:id" element={<QnaSecret />} />
                    <Route path="/myaddrupdate" element={<MyAddrUpdate />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />

                    <Route path="/proqnawrite/:productId" element={<ProQnaWrite />} />
                    <Route path="/product/:productId/qnadetail/:id" element={<ProQnaDetail />} />
                    <Route path="/product/:productId/prosecret/:id" element={<ProQnaSecret />} />
                    <Route path="/product/:productId/qnaedit/:id" element={<ProQnaEdit />} />




                <Route path="/auth/*" element={<LoginRoutes />} />


                {/* ✅ 보호된 마이페이지 라우트 */}
                    <Route path="/mypage/*" element={
                            <PrivateRoute>
                                    <MyPageRouter />
                            </PrivateRoute>
                    } />

                    {/* ✅ 결제 관련 라우트 */}
                    <Route path="/pay" element={<CheckoutPage />} />
                    <Route path="/pay/success" element={<SuccessPage />} />
                    <Route path="/pay/fail" element={<FailPage />} />

                    {/* ✅ 주문 관련 라우트 */}
                    <Route path="/order" element={<OrderPage />} />
                    <Route path="/order/susccess" element={<OrderCompletePage />} />
            </Routes>
        );
}

export default App;
