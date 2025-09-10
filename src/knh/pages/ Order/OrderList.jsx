import OrderItem from "../../components/OrderItem.jsx";
import React from "react";

const OrderList = React.memo(({ orderItems }) => {

    const totalOrderPrice = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shippingFee = totalOrderPrice >= 50000 ? 0 : 3000; // 예시: 5만원 이상 무료배송

    const totalPayAmount = totalOrderPrice + shippingFee;

    return (
        <>
            {orderItems.map((item) => (
                <OrderItem key={`${item.productId}_${item.selectedSize || item.size}`} item={item} />
            ))}


            <div className="font-thin text-sm py-2 text-right">
                상품 구매 금액 <span>{totalOrderPrice.toLocaleString()}원 </span> + 배송비 <span>{shippingFee.toLocaleString()}원</span> =
                합계 <span>{totalPayAmount.toLocaleString()}원</span>
            </div>
        </>
    );

});

export default OrderList;
