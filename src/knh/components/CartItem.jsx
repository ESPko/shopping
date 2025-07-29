import { useState } from "react";
import QtySelector from "./QtySelector.jsx";
import { X } from "lucide-react";
import CartPop from "../pages/Cart/CartPop.jsx";
import useAuthStore from "../Store/UserAuthStore.js";
import useCartStore from "../Store/UseCartStore.jsx";
import * as res from "autoprefixer";

const CartItem = ({ item }) => {

    const user = useAuthStore(state => state.user);
    const {
        toggleSelect,
        changeQty,
        removeItem,
        changeSize,
    } = useCartStore();

    const [openItemPop, setOpenItemPop] = useState(false);

    const handleOptChange = () => setOpenItemPop(true);
    const handleClosePop = () => setOpenItemPop(false);

    // 사이즈 변경을 위한 함수
    const saveOptionChange = (newSize) => {
        if (!user?.id) return;
        changeSize(item.id, newSize);  // 새로운 사이즈로 변경
        setOpenItemPop(false);
    };



    // 기본 이미지 설정
    const imageUrl = item.info_image ? item.info_image : "/images/default-product-image.jpg";  // info_image로 수정

    return (
        <div className="flex gap-10 items-center justify-center border-b border-b-gray-200 py-4 mobile:block">
            {/* 선택 체크박스 */}
            <input
                type="checkbox"
                checked={item.selected}
                onChange={() => toggleSelect(item.id, item.selectedSize)}  // selectedSize도 함께 보내기
                className="w-5 h-5 border-gray-300 rounded outline-none focus:ring-0 bg-[#1B3C5C]"
            />

            <div className="max-w-[120px] mobile:pb-5">
                <img src={imageUrl} alt={item.name} className="w-full object-cover" />
            </div>
            <div className="mr-32 mobile:mr-0">
                <h2 className="font-bold">{item.name}</h2>
                {item.selectedSize && (
                    <p className="text-sm text-gray-600">옵션: {item.selectedSize}</p>
                )}

                <button onClick={handleOptChange} className="text-sm underline mt-1">
                    옵션 변경
                </button>

                {/* 옵션 변경 팝업 */}
                {openItemPop && (
                    <CartPop onClose={handleClosePop} item={item} saveOptionChange={saveOptionChange} />
                )}

                <p className="mt-2">{item.price.toLocaleString()}원</p>
            </div>

            {/* 수량 선택 */}
            <QtySelector
                quantity={item.quantity}
                onDecrease={() => changeQty(item.id, -1)}  // 수량 감소
                onIncrease={() => changeQty(item.id, 1)}  // 수량 증가
            />

            {/* 삭제 버튼 */}
            <button
                className={'mobile:pt-5'}
                onClick={() => removeItem(item.id)}>
                <X size={"25px"} color={"gray"} />
            </button>
        </div>
    );
};

export default CartItem;
