import React from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../knh/Store/UserAuthStore.js";
import useProductDetail from "../../store/useProductDetail.js";
import useCartStore from "../../../knh/Store/UseCartStore.jsx";

function ProDeBuy({ product }) {
    const { selectedSize, setSize, count, addCount, minusCount } = useProductDetail();
    const { user } = useAuthStore();
    const addToCart = useCartStore(state => state.addToCart);
    const navigate = useNavigate();

    const sizes = ["S", "M", "L", "XL"];

    const { id: productId, name, price, infoImage } = product;

    console.log("product:", product);

    const handleAddToCart = () => {
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

    const buyNow = () => {
        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (!selectedSize) {
            alert("사이즈를 선택해주세요.");
            return;
        }

        // 현재 장바구니 아이템 가져오기 (최신 상태)
        const cartItems = useCartStore.getState().cartItems;

        const buyNowItem = {
            id: productId,
            productId: productId,
            name,
            price,
            selectedSize,
            quantity: count,
            info_image: infoImage || "/default-image.jpg",
        };

        let newCartItems = [...cartItems];
        const existingIndex = newCartItems.findIndex(
            (item) => item.productId === productId && item.selectedSize === selectedSize
        );

        if (existingIndex >= 0) {
            newCartItems[existingIndex] = {
                ...newCartItems[existingIndex],
                quantity: newCartItems[existingIndex].quantity + count,
            };
        } else {
            newCartItems.push(buyNowItem);
        }

        console.log("바로구매로 주문페이지에 넘기는 orderItems:", newCartItems);

        navigate("/order", {
            state: {
                orderItems: newCartItems,
            },
        });
    };

    return (
        <div className="pl-8 pt-10">
            <h2 className="text-2xl font-bold mb-5 mobile:text-xl mobile:mb-2">{name}</h2>
            <p className="text-xl font-bold mb-8">{price.toLocaleString()} 원</p>

            <div className="mb-6">
                <p className="mb-3 text-sm font-bold">사이즈 선택</p>
                <div className="flex gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSize(size)}
                            className={`text-center w-16 h-8 rounded-full ${
                                selectedSize === size
                                    ? "bg-[#1B3C5C] text-white"
                                    : "border border-[#1B3C5C] text-black"
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
                <p className="font-bold text-2xl mobile:text-xl">{(price * count).toLocaleString()} 원</p>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#A0A0A0] rounded-full text-white mobile:text-sm"
                >
                    <ShoppingBag />
                    장바구니
                </button>
                <button
                    onClick={buyNow}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1B3C5C] text-white rounded-full mobile:text-sm"
                >
                    바로구매
                </button>
            </div>
        </div>
    );
}

export default ProDeBuy;
