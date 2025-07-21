import React from "react";
import { ShoppingBag } from "lucide-react";
import useAuthStore from "../../../JungSY/UserAuthStore.js";
import useCartStore from "../../../knh/components/UserCartStore.jsx";
import useProductDetail from "../../store/useProductDetail.js";

function ProDeBuy({ productId, name, price }) {
    const { selectedSize, setSize, count, addCount, minusCount } = useProductDetail();
    const { user } = useAuthStore();
    const addToCart = useCartStore(state => state.addToCart);

    const sizes = ["S", "M", "L", "XL"];

    const handleAddToCart = () => {
        console.log("addToCart 호출", { productId, selectedSize, count });
        console.log("추가할 productId:", productId); // 콘솔에 찍어서 확인

        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (!selectedSize) {
            alert("사이즈를 선택해주세요.");
            return;
        }
        addToCart(productId, selectedSize, count);
    };

    // (buyNow 함수 동일하게 유지)

    return (
        <div className="pl-8 pt-10">
            <h2 className="text-2xl font-bold mb-5">{name}</h2>
            <p className="text-xl font-bold mb-8">{price.toLocaleString()} 원</p>

            <div className="mb-6">
                <p className="mb-3 text-sm font-bold">사이즈 선택</p>
                <div className="flex gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSize(size)}
                            className={`text-center w-16 h-8 rounded-full ${
                                selectedSize === size ? "bg-[#1B3C5C] text-white" : "border border-[#1B3C5C] text-black"
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4 mb-10">
                <p className="font-medium">수량</p>
                <div className="flex items-center border rounded">
                    <button onClick={minusCount} className="px-3 py-1">-</button>
                    <span className="px-4">{count}</span>
                    <button onClick={addCount} className="px-3 py-1">+</button>
                </div>
            </div>

            <div className="flex justify-between border-b-2 border-black pb-4 mb-10">
                <p className="font-semibold">총 결제금액</p>
                <p className="font-bold text-2xl">{(price * count).toLocaleString()} 원</p>
            </div>

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
