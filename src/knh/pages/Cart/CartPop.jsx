import { useState, useEffect } from "react";
import useCartStore from "../../Store/UseCartStore.jsx";

const CartPop = ({ onClose, item }) => {
    // item.selectedSize가 null인 경우 기본값으로 'S'를 사용
    const [tempSelectedSize, setTempSelectedSize] = useState(item.selectedSize || 'S');

    // useCartStore에서 changeSize, addToCart 함수 가져오기
    const { changeSize, addToCart } = useCartStore();

    // 스크롤 잠금
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // 사이즈 변경 핸들러
    const handleSizeChange = (e) => {
        console.log("Selected Size: ", e.target.value); // 선택된 사이즈 확인
        setTempSelectedSize(e.target.value);
    };

    // 기존 상품의 옵션(사이즈)만 변경
    const handleSaveOption = () => {
        console.log("handleSaveOption called with size:", tempSelectedSize); // tempSelectedSize 값 확인

        if (tempSelectedSize !== item.selectedSize) {
            // 사이즈 변경
            changeSize(item.id, tempSelectedSize);  // useCartStore의 changeSize 사용
        }
        onClose();
    };

    // 동일 상품이라도 사이즈 다르면 새로 추가
    const handleAddToCart = () => {
        console.log("handleAddToCart called with size:", tempSelectedSize); // tempSelectedSize 값 확인
        console.log("Item:", item);  // item 객체 확인

        // 기존 아이템의 id를 사용하여 사이즈만 변경된 아이템을 추가
        // addToCart에서 size와 quantity 값을 전달
        addToCart(item, tempSelectedSize, 1);  // 1은 기본 수량
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl w-full max-w-md relative">
                {/* 상단 헤더 */}
                <div className="bg-[#1B3C5C] text-white px-6 py-4">
                    <span className="text-lg font-bold">옵션 선택</span>
                    <button onClick={onClose} className="absolute top-3 right-4 text-3xl">×</button>
                </div>

                {/* 상품 정보 */}
                <div className="mb-4 p-5 border-b">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <div className="text-sm text-gray-500">[옵션: {item.selectedSize}]</div>
                    {/* 가격 추가 */}
                    <div className="mt-4 text-xl font-bold">
                        가격: {item.price.toLocaleString()} 원
                    </div>
                </div>

                {/* 사이즈 선택 */}
                <div className="mb-4 p-5">
                    <label htmlFor="size-select" className="block text-sm font-medium text-gray-700 mb-1">
                        사이즈
                    </label>
                    <select
                        id="size-select"
                        value={tempSelectedSize}
                        onChange={handleSizeChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>

                {/* 버튼 영역 */}
                <div className="flex flex-col p-6 gap-2">
                    <button
                        onClick={handleAddToCart}
                        className="bg-[#1B3C5C] text-white py-2 rounded h-16"
                    >
                        추가
                    </button>
                    <button
                        onClick={handleSaveOption}
                        className="border py-2 rounded h-16"
                    >
                        변경
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPop;
