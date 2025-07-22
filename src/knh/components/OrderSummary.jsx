import React from "react";
import useOrderStore from "../Store/useOrderStore.jsx";
import Savings from "../pages/ Order/Savings.jsx"; // ✅ 추가

const OrderSummary = ({showSavings = true }) => {
    const {
        totalOrderPrice,
        shippingFee,
        totalPayAmount,
        usedPoints,
    } = useOrderStore();

    return (
        <div className=" mx-auto mt-10 space-y-6">
            <h3 className="border-b pb-1 border-b-black">결제 정보</h3>

            {showSavings && <Savings />}

            <div className=" pt-4 space-y-2 text-sm text-gray-800">
                <div className="flex justify-between">
                    <span>상품 금액</span>
                    <span>{totalOrderPrice().toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                    <span>배송비</span>
                    <span>{shippingFee().toLocaleString()}원</span>
                </div>
                {usedPoints !== 0 && usedPoints !== undefined && (
                    <div className="flex justify-between">
                        <span>적립금 할인</span>
                        <span>-{usedPoints.toLocaleString()}원</span>
                    </div>
                )}
                <div className="flex justify-between text-lg font-semibold border-t pt-2 pb-10 mobile:text-base">
                    <span>총 결제 금액</span>
                    <span className="text-[#1B3C5C]">
                        {totalPayAmount().toLocaleString()}원
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
