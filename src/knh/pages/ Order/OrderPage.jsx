import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../../JangDJ/Footer.jsx";
import { CheckoutPage } from "../../../ParkES/payment/checkout.jsx";
import OrderList from "./OrderList.jsx";
import OrderAddr from "../../components/OrderAddr.jsx";
import OrderSummary from "../../components/OrderSummary.jsx";
import useCartStore from "../../Store/useCartStore.jsx";
import useAddrStore from "../../Store/useAddrStore.jsx";
import useOrderStore from "../../Store/useOrderStore.jsx";

const OrderPage = () => {
    const location = useLocation();
    const orderItem = location.state?.orderItem || null;
    const orderItemsFromState = location.state?.orderItems || null;

    const address = useAddrStore(state => state.address);
    const cartItems = useCartStore(state => state.cartItems);
    const setOrderedItems = useOrderStore(state => state.setOrderedItems);

    const orderItems = useMemo(() => {
        let items = [];

        if (orderItemsFromState) {
            items = orderItemsFromState;
        } else if (orderItem) {
            items = [...cartItems, orderItem];
        } else {
            items = cartItems;
        }

        // 중복 제거 (productId + size or selectedSize 기준)
        const uniqueItems = Array.from(
            new Map(
                items.map(item => {
                    const size = item.size || item.selectedSize || "none";
                    return [`${item.productId}_${size}`, item];
                })
            ).values()
        );

        return uniqueItems;
    }, [orderItemsFromState, orderItem, cartItems]);

    useEffect(() => {
        setOrderedItems(orderItems);
    }, [orderItems, setOrderedItems]);

    const orderRequestDto = {
        receiverName: address.name,
        receiverPhone: `${address.phone1}-${address.phone2}-${address.phone3}`,
        zipCode: address.postcode,
        address1: address.address1,
        address2: address.address2,
        deliveryMessage: address.message,
    };

    return (
        <>
            <Header isDefaultBlack={true} />
            <section className="py-40 max-w-[800px] mx-auto mobile:px-4 mobile:py-10">
                <h2 className="flex justify-center text-3xl font-bold pb-4">주문하기</h2>
                <OrderList orderItems={orderItems} />
                <OrderAddr />
                <OrderSummary orderItems={orderItems} />
                <CheckoutPage
                    orderItems={orderItems}
                    orderRequestDto={orderRequestDto}
                />
            </section>
            <Footer />
        </>
    );
};

export default OrderPage;
