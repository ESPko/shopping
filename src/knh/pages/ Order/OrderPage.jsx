import { useLocation } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../../JangDJ/Footer.jsx";
import { CheckoutPage } from "../../../ParkES/payment/checkout.jsx";
import OrderList from "./OrderList.jsx";
import OrderAddr from "../../components/OrderAddr.jsx";
import OrderSummary from "../../components/OrderSummary.jsx";
import { useState, useEffect } from "react";
import useOrderStore from "../../Store/useAddrStore.jsx";
import useCartStore from "../../Store/useCartStore.jsx";  // zustand 장바구니 상태 임포트

const OrderPage = () => {
    const location = useLocation();
    const { orderItem } = location.state || {};
    const cartItems = useCartStore((state) => state.cartItems); // zustand 장바구니 데이터
    const [orderItems, setOrderItems] = useState([]);
    const address = useOrderStore((state) => state.address); // 유저 배송지 정보

    useEffect(() => {
        if (orderItem) {
            setOrderItems([orderItem]); // 단일 상품 주문일 경우
        } else {
            setOrderItems(cartItems);   // 장바구니 전체 주문일 경우
        }
    }, [orderItem, cartItems]);

    const orderRequestDto = {
        receiverName: address.name,
        receiverPhone: `${address.phone1}-${address.phone2}-${address.phone3}`,
        zipCode: address.postcode,
        address1: address.address1,
        address2: address.address2,
        deliveryMessage: address.message,
    };

    useEffect(() => {
        console.log("orderItems:", orderItems);
        console.log("orderRequestDto:", orderRequestDto);
    }, [orderItems, orderRequestDto]);

    return (
        <>
            <Header isDefaultBlack={true} />
            <section className="py-40 max-w-[800px] mx-auto mobile:px-4 mobile:py-10">
                <h2 className={'flex justify-center text-3xl font-bold pb-4'}>주문하기</h2>
                <OrderList orderItems={orderItems} />
                <OrderAddr />
                <OrderSummary orderItems={orderItems} />
                <CheckoutPage
                    orderItems={orderItems}
                    orderRequestDto={orderRequestDto} // 전달
                />
            </section>
            <Footer />
        </>
    );
};

export default OrderPage;
