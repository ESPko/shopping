import QtySelector from "./QtySelector.jsx";
import { X } from 'lucide-react';
import useCartStore from "../store/useCartStore.jsx";
import { useState } from "react";
import CartPop from "../pages/Cart/CartPop.jsx";

const CartItem = () => {
    const {
        cartItems,
        toggleSelect,
        changeQty,
        removeItem,
        changeSize,
        addToCart,
    } = useCartStore();

    // 팝업 열려 있는 상품 ID
    const [openItemPop, setOpenItemPop] = useState(null);

    // 팝업 열기
    const handleOptChange = (itemId) => {
        setOpenItemPop(itemId);
    };

    // 팝업 닫기
    const handleClosePop = () => {
        setOpenItemPop(null);
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-40 text-gray-500 text-basic">
                장바구니가 비어있습니다.
            </div>
        );
    }

    return (
        <div className="mt-10 mb-3">
            {cartItems.map((item) => (
                <div
                    key={`${item.id}-${item.selectedSize}`} // 같은 상품이라도 사이즈 다르면 key 다르게
                    className="flex gap-10 items-center justify-center border-b border-b-gray-200 py-4"
                >
                    <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleSelect(item.id)}
                        className="w-5 h-5 border-gray-300 rounded outline-none focus:ring-0 bg-[#1B3C5C]"
                    />
                    <div className="max-w-[120px]">
                        <img src={item.image} alt={item.name} className="w-full object-cover" />
                    </div>
                    <div className="mr-32">
                        <h2 className="font-bold">{item.name}</h2>
                        {item.selectedSize && (
                            <p className="text-sm text-gray-600">
                                옵션: {item.selectedSize}
                            </p>
                        )}
                        <button
                            onClick={() => handleOptChange(item.id)}
                            className="text-sm underline mt-1"
                        >
                            옵션 변경
                        </button>

                        {/* 옵션 변경 팝업 */}
                        {openItemPop === item.id && (
                            <CartPop
                                onClose={handleClosePop}
                                item={item}
                                changeSize={changeSize}
                                addToCart={addToCart}
                            />
                        )}

                        <p className="mt-2">{item.price.toLocaleString()}원</p>
                    </div>
                    <QtySelector
                        quantity={item.quantity}
                        onDecrease={() => changeQty(item.id, -1)}
                        onIncrease={() => changeQty(item.id, 1)}
                    />
                    <button onClick={() => removeItem(item.id)}>
                        <X size={'25px'} color={'gray'} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CartItem;
