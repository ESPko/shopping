import { useNavigate } from "react-router-dom";
import useOrderStore from "../../Store/useOrderStore.jsx";
import useCartStore from "../../Store/UseCartStore.jsx";

const CartSummary = () => {
    const nav = useNavigate();
    const {
        removeSelected,
        removeAll,
        totalAmount,
        shippingFee,
        totalPrice,
        cartItems,
    } = useCartStore();

    const { orderSelected, orderAll } = useOrderStore();

    // 선택된 상품 체크 함수
    const hasSelectedItems = cartItems.some((item) => item.selected);

    const handleOrderSelected = () => {
        if (!hasSelectedItems) {
            alert("선택한 상품이 없습니다.");
            return;
        }
        orderSelected(); // 실제 주문 데이터 설정
        nav("/order"); // 페이지 이동
    };

    const handleOrderAll = () => {
        if (cartItems.length === 0) {
            alert("장바구니에 상품이 없습니다.");
            return;
        }
        orderAll();
        nav("/order");
    };

    return (
        <div>
            <div className="flex flex-wrap gap-4 justify-between mb-8">
                <div className={"flex gap-3"}>
                    <button onClick={removeSelected} className="border border-black px-6 py-2 rounded">
                        선택삭제
                    </button>
                    <button onClick={removeAll} className="border border-black px-6 py-2 rounded">
                        전체삭제
                    </button>
                </div>
                <div className={"flex gap-3"}>
                    <button onClick={handleOrderSelected} className="border border-black px-6 py-2 rounded">
                        선택상품 주문
                    </button>
                    <button onClick={handleOrderAll} className="border border-black px-6 py-2 rounded">
                        전체상품 주문
                    </button>
                </div>
            </div>

            <div className="text-right space-y-2 pt-20 text-gray-700">
                <div className={"border-b"}>
                    <div className="flex justify-between items-center gap-4 pb-3">
                        <span>주문금액</span>
                        <span>{totalPrice().toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between items-center gap-4 pb-3">
                        <span>배송비</span>
                        <span>{shippingFee.toLocaleString()}원</span>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-4 pt-5 font-bold text-xl text-black">
                    <span>합계</span>
                    <span>{totalAmount().toLocaleString()}원</span>
                </div>
            </div>

            {/* 주문하기 버튼 */}
            <button
                onClick={handleOrderAll}
                className="w-full bg-[#1B3C5C] text-white py-3 mt-6 text-lg rounded"
            >
                주문하기
            </button>
        </div>
    );
};

export default CartSummary;
