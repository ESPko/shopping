// src/components/OrderComplete/Savings.jsx
import React, { useEffect, useState } from "react";
import useOrderStore from "../../Store/useOrderStore.jsx";

const Savings = () => {
    const {
        usablePoints,
        usedPoints,
        updateUsedPoints,
    } = useOrderStore();

    const [inputValue, setInputValue] = useState("0");

    const handleUsedPointsChange = (e) => {
        const raw = e.target.value.replace(/[^0-9]/g, "");
        const numeric = Number(raw);

        if (numeric > usablePoints) {
            alert(`사용 가능한 적립금은 ${usablePoints.toLocaleString()}P 까지입니다.`);
            return;
        }

        setInputValue(raw);
        updateUsedPoints(numeric);
    };

    useEffect(() => {
        setInputValue(usedPoints.toString());
    }, [usedPoints]);

    return (
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
                <label className="w-32 text-gray-700 mt-2">
                    (총 사용 가능 적립금:{usablePoints.toLocaleString()} 원)
                </label>
            </div>
        </div>
    );
};

export default Savings;
