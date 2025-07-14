import { useEffect, useState } from "react";
import axios from "axios";
import QtySelector from "./QtySelector.jsx";
import { X } from 'lucide-react';
import useCartStore from "../store/useCartStore.jsx";
import CartPop from "../pages/Cart/CartPop.jsx";

const CartItem = () => {
    const {
        cartItems,
        setCartItems,
        toggleSelect,
        changeQtyLocally,
        removeItemLocally,
        changeSizeLocally,
    } = useCartStore();

    const [openItemPop, setOpenItemPop] = useState(null);
    const userId = 1; // 예시 유저 ID, 실제 로그인 정보로 교체

    // 백엔드에서 장바구니 아이템 가져오기
    useEffect(() => {
        axios.get(`http://localhost:8080/api/cart/${userId}`)
            .then(res => {
                const items = res.data.items.map(item => ({
                    id: item.id,
                    productId: item.productId,
                    name: item.productName,
                    image: item.productImage,
                    price: item.productPrice,
                    quantity: item.quantity,
                    selectedSize: item.selectedSize,
                    selected: item.selected,
                }));
                setCartItems(items);
            })
            .catch(err => {
                console.error("장바구니 불러오기 실패:", err);
            });
    }, []);

    // 옵션 변경 팝업 열기
    const handleOptChange = (itemId) => {
        setOpenItemPop(itemId);
    };

    // 팝업 닫기
    const handleClosePop = () => {
        setOpenItemPop(null);
    };

    // 수량 변경 (API 요청 + 상태 업데이트)
    const changeQty = (itemId, diff) => {
        const item = cartItems.find(i => i.id === itemId);
        if (!item) return;

        const newQty = item.quantity + diff;
        if (newQty < 1) return; // 1 미만 방지

        axios.put(`http://localhost:8080/api/cart/${userId}/item/${itemId}`, {
            quantity: newQty
        }).then(() => {
            // 성공하면 로컬 상태 동기화
            changeQtyLocally(itemId, diff);
        }).catch(err => {
            console.error("수량 변경 실패", err);
        });
    };

    // 아이템 삭제 (API 요청 + 상태 업데이트)
    const removeItem = (itemId) => {
        axios.delete(`http://localhost:8080/api/cart/${userId}/item/${itemId}`)
            .then(() => {
                removeItemLocally(itemId);
            }).catch(err => {
            console.error("아이템 삭제 실패", err);
        });
    };

    // 옵션 변경 저장 (API 요청 + 상태 업데이트)
    const saveOptionChange = (itemId, newSize) => {
        axios.put(`http://localhost:8080/api/cart/${userId}/item/${itemId}/size`, {
            selectedSize: newSize
        }).then(() => {
            changeSizeLocally(itemId, newSize);
            setOpenItemPop(null);
        }).catch(err => {
            console.error("옵션 변경 실패", err);
        });
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
                    key={`${item.id}-${item.selectedSize}`}
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

                        {openItemPop === item.id && (
                            <CartPop
                                onClose={handleClosePop}
                                item={item}
                                saveOptionChange={saveOptionChange}
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
