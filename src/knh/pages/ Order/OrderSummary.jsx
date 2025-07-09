import React, { useState, useEffect } from "react";
import useOrderStore from "../../Store/useOrderStore.jsx";

const OrderSummary = () => {
    const {
        totalOrderPrice,
        shippingFee,
        totalPayAmount,
        usablePoints,
        usedPoints,
        updateUsedPoints,
    } = useOrderStore();

    const [inputValue, setInputValue] = useState("0");

    const handleUsedPointsChange = (e) => {
        const raw = e.target.value.replace(/[^0-9]/g, ""); // 숫자만
        const numeric = Number(raw);

        // 제한 조건: 사용 가능 적립금 초과
        if (numeric > usablePoints) {
            alert(`사용 가능한 적립금은 ${usablePoints.toLocaleString()}P 까지입니다.`);
            return;
        }

        // 조건 충족 시 반영
        setInputValue(raw);
        updateUsedPoints(numeric);
    };

    // 외부에서 store 값이 변경된 경우에도 동기화
    useEffect(() => {
        setInputValue(usedPoints.toString());
    }, [usedPoints]);

    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <h3 className="border-b pb-1 border-b-black">결제 정보</h3>





            <div className="flex items-start gap-4">
                <label className="w-32 text-gray-700 mt-2">사용할 적립금</label>
                <div className="flex-1">
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        value={inputValue}
                        onChange={handleUsedPointsChange}
                        className="bg-gray-100 rounded px-3 py-2 w-40 border-none focus:outline-none text-right"
                    />
                    <label className="w-32 text-gray-700 mt-2"> (총 사용 가능 적립금:{usablePoints.toLocaleString()} 원)</label>
                </div>
            </div>

            <div className="border-t pt-4 space-y-2 text-sm text-gray-800">
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
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
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
