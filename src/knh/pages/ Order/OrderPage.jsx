import { useLocation } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../../JangDJ/Footer.jsx";
import { CheckoutPage } from "../../../ParkES/payment/checkout.jsx";
import OrderList from "./OrderList.jsx";
import OrderAddr from "../../components/OrderAddr.jsx";
import OrderSummary from "../../components/OrderSummary.jsx";
import { useState, useEffect } from "react";

const OrderPage = () =>  {
    const location = useLocation();
    const { orderItem } = location.state || {};  // 바로구매 혹은 장바구니 주문 정보

    // 주문 목록 상태 (복수 주문 처리 가능)
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        if (orderItem) {
            setOrderItems([orderItem]);  // 바로구매 단일 상품 전달
        } else {
            // TODO: 장바구니에서 주문시, 장바구니 항목들 세팅 로직 필요
            setOrderItems([]);
        }
    }, [orderItem]);

    return (
        <>
            <Header isDefaultBlack={true} />
            <section className="py-40 max-w-[800px] mx-auto">
                <h2 className={'flex justify-center text-3xl font-bold pb-4'}>주문하기</h2>
                <OrderList orderItems={orderItems} />
                <OrderAddr />
                <OrderSummary orderItems={orderItems} />
                <CheckoutPage orderItems={orderItems} />
            </section>
            <Footer />
        </>
    );
}
export default OrderPage;
