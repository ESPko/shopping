import React from "react";
import useProductDetail from "../../useProductDetail.js";
import { ShoppingBag } from "lucide-react";
import useAuthStore from "../../../JungSY/UserAuthStore.js";
import useCartStore from "../../../knh/components/UserCartStore.jsx";
import {FaTimes} from "react-icons/fa";

function ProDeBuy({ productId, name, price }) {
    const {
        selectedSizes,
        addSize,
        removeSize,
        addCount,
        minusCount,
        resetSelectedSizes,
    } = useProductDetail();

    const { user } = useAuthStore();
    const addToCart = useCartStore(state => state.addToCart);

    const sizes = ["S", "M", "L", "XL"];

    const handleAddToCart = () => {
        // console.log("addToCart 호출", { productId, size, selectedSizes[size] });
        console.log("추가할 productId:", productId); // 콘솔에 찍어서 확인

        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (Object.keys(selectedSizes).length === 0) {
            alert("사이즈를 선택해주세요.");
            return;
        }

        for (const size in selectedSizes) {
            addToCart(productId, size, selectedSizes[size]);
        }
        alert("장바구니에 추가되었습니다.");
    };

    const total = Object.entries(selectedSizes).reduce(
        (sum, [_, count]) => sum + price * count,
        0
    );

    // (buyNow 함수 동일하게 유지)

    return (
        <div className="pl-8 pt-10">
            <h2 className="text-2xl font-bold mb-5">{name}</h2>
            <p className="text-xl font-bold mb-8">{price.toLocaleString()} 원</p>

            {/*사이즈 선택*/}
            <div className="mb-6">
                <p className="mb-3 text-sm font-bold">사이즈 선택</p>
                <div className="flex gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => addSize(size)}
                            className="text-center w-16 h-8 rounded-full border border-[#1B3C5C] text-black"
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/*선택된 사이즈 수량 변경*/}
            {Object.entries(selectedSizes).map(([size, count]) => (
                <div
                    key={size}
                    className="flex items-center justify-between border rounded px-4 py-4 mb-4"
                >
                    <div className="flex items-center gap-4">
                        <span className="font-medium w-12">{size}</span>
                        <div className="flex items-center border rounded">
                            <button onClick={minusCount(size)} className="px-3 py-1">-</button>
                            <span className="px-4">{count}</span>
                            <button onClick={addCount(size)} className="px-3 py-1">+</button>
                        </div>
                        <span className="ml-4 text-gray-500">
                            {(price * count).toLocaleString()} 원
                        </span>
                    </div>
                    <button onClick={() => removeSize(size)} className="text-gray-500 hover:text-black">
                        <FaTimes size={20} />
                    </button>
                </div>
            ))}

            {/*총 금액*/}
            <div className="flex justify-between border-b-2 border-black pb-4 mb-10">
                <p className="font-semibold">총 결제금액</p>
                <p className="font-bold text-2xl">{total.toLocaleString()} 원</p>
            </div>

            {/*장바구니 바로구매 버튼*/}
            <div className="flex gap-4">
                <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#A0A0A0] rounded-full text-white"
                >
                    <ShoppingBag />
                    장바구니
                </button>
                <button
                    onClick={() => {/* buyNow 함수 호출 유지하세요 */}}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1B3C5C] text-white rounded-full"
                >
                    바로구매
                </button>
            </div>
        </div>
    );
}

export default ProDeBuy;
