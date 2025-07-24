import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { LucideHeart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductCard({ id, image, name, price, salePrice, onCartClick }) {
    const [like, setLike] = useState(false);
    const navigate = useNavigate();

    // 찜하기 클릭 이벤트
    const handleLike = () => {
        setLike(!like);
        console.log(`${name} 찜 상태: ${!like}`);
    };

    // 장바구니 클릭 이벤트
    const handleAddCart = () => {
        onCartClick({ id, image, name, price, salePrice });
        console.log(`${name} 장바구니 담기`);
    };

    // 이미지 클릭 시 상세 페이지 이동 함수
    const goToDetail = () => {
        navigate(`/product/${id}`); // 라우터 설정에 따라 경로 변경 가능
    };

    return (
        <div className="flex flex-col gap-2 cursor-pointer">
            <div className="relative bg-[#F7F7F7] rounded-2xl overflow-hidden hover:shadow">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-auto object-contain"
                    onClick={goToDetail} // 이미지 클릭 시 상세 페이지 이동
                />
                {/* 하트, 장바구니 버튼 */}
                <div className="absolute top-1.5 right-1 flex gap-1.5 pr-1 ">
                    <button onClick={handleLike} className="p-1" type="button">
                        {like ? (
                            // 하트 누를 시 빨간색으로 가득차게 변경
                            <FaHeart className="text-red-500" size={23} />
                        ) : (
                            // 기본 하트는 테두리만 있음
                            <LucideHeart className="text-gray-600" strokeWidth={1.5} size={23} />
                        )}
                    </button>
                    <button onClick={handleAddCart} className="p-1" type="button">
                        <ShoppingBag className="text-gray-600" strokeWidth={1.5} size={23} />
                    </button>
                </div>
            </div>

            {/* 상품 정보 영역 */}
            <div className="flex flex-col gap-1 mt-4" onClick={goToDetail}>
                <span className="font-bold mobile:text-sm">{name}</span>
                {salePrice != null && price != null ? (
                    <div className="flex items-center gap-2 mobile:block">
                        <span className="text-gray-400 line-through mobile:text-sm">{price.toLocaleString()}원</span>
                        <span className="font-bold text-lg text-[#00883F] mobile:text-sm mobile:pl-1">
                            {price ? Math.round(((price - salePrice) / price) * 100) : 0}% OFF
                        </span>
                        <span className="text-black font-bold text-lg mobile:text-base mobile:block">{salePrice.toLocaleString()}원</span>
                    </div>
                ) : price != null ? (
                    <span className="text-black font-bold text-lg mobile:text-base">{price.toLocaleString()}원</span>
                ) : (
                    <span className="text-gray-500 mobile:text-base">가격 정보 없음</span>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
