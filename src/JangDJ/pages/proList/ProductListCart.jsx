import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../knh/Store/UserAuthStore.js";
import useCartStore from "../../../knh/Store/UseCartStore.jsx";

function ProductListCart({ product, onClose }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [count, setCount] = useState(1);

    const navigate = useNavigate();
    const { user } = useAuthStore();
    const addToCart = useCartStore((state) => state.addToCart);

    const price = product.salePrice || product.price;
    const sizes = ["S", "M", "L", "XL"];

    const handleAddToCart = () => {
        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (!selectedSize) {
            alert("사이즈를 선택해주세요.");
            return;
        }

        addToCart(product.id, selectedSize, count);
        alert("장바구니에 담겼습니다.");
        onClose();
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

        // 장바구니 아이템 현재 상태 가져오기
        const cartItems = useCartStore.getState().cartItems;

        const buyNowItem = {
            id: product.id,
            productId: product.id,
            name: product.name,
            price,
            selectedSize,
            quantity: count,
            info_image: product.image || "/default-image.jpg",
        };

        let newCartItems = [...cartItems];
        const existingIndex = newCartItems.findIndex(
            (item) => item.productId === product.id && item.selectedSize === selectedSize
        );

        if (existingIndex >= 0) {
            newCartItems[existingIndex] = {
                ...newCartItems[existingIndex],
                quantity: newCartItems[existingIndex].quantity + count,
            };
        } else {
            newCartItems.push(buyNowItem);
        }

        navigate("/order", {
            state: {
                orderItems: newCartItems,
            },
        });
    };

    const increaseCount = () => setCount((c) => c + 1);
    const decreaseCount = () => setCount((c) => (c > 1 ? c - 1 : 1));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl w-full max-w-md relative overflow-hidden">
                {/* 헤더 */}
                <div className="bg-[#1B3C5C] text-white px-6 py-4 relative">
                    <span className="text-lg font-bold mobile:text-base">옵션 선택</span>
                    <button onClick={onClose} className="absolute top-3 right-4 text-3xl">
                        ×
                    </button>
                </div>

                {/* 상품 정보 */}
                <div className="flex gap-4 mb-4 p-6 mobile:mb-0">
                    <img src={product.image} alt={product.name} className="h-20 w-20 object-contain" />
                    <div className="flex flex-col justify-center">
                        <h2 className="font-semibold">{product.name}</h2>
                        <p className="text-[#1B3C5C] font-bold">{price.toLocaleString()}원</p>
                    </div>
                </div>

                {/* 사이즈 선택 */}
                <div className="px-6 pt-6">
                    <div className="font-medium mb-2">사이즈 선택</div>
                    <div className="flex gap-2 flex-wrap">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 py-1 rounded border ${
                                    selectedSize === size ? "bg-[#1B3C5C] text-white" : "bg-white hover:bg-gray-100"
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 수량 선택 */}
                <div className="px-6 pt-6 flex items-center gap-4">
                    <span className="font-medium">수량</span>
                    <div className="flex items-center border rounded">
                        <button onClick={decreaseCount} className="px-3 py-1">
                            -
                        </button>
                        <span className="px-4">{count}</span>
                        <button onClick={increaseCount} className="px-3 py-1">
                            +
                        </button>
                    </div>
                </div>

                {/* 총 결제금액 */}
                <div className="px-6 pt-6 pb-4 border-b text-gray-700 font-medium flex justify-between">
                    <span>총 결제금액</span>
                    <span className="text-2xl font-semibold mobile:text-xl">
            {(price * count).toLocaleString()} 원
          </span>
                </div>

                {/* 버튼 영역 */}
                <div className="flex flex-col p-6 gap-2">
                    <button
                        onClick={buyNow}
                        className="bg-[#1B3C5C] text-lg text-white py-2 rounded h-16 mobile:text-base mobile:h-10"
                    >
                        바로구매
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className="border border-[#1B3C5C] font-semibold py-2 text-lg rounded h-16 mobile:text-base mobile:h-10"
                    >
                        장바구니 담기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductListCart;
