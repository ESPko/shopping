import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { LucideHeart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductCard({ id, image, name, price, salePrice, onCartClick }) {
    const [like, setLike] = useState(false);
    const navigate = useNavigate();

    const handleLike = () => {
        setLike(!like);
        console.log(`${name} 찜 상태: ${!like}`);
    };

    const handleAddCart = () => {
        onCartClick({ id, image, name, price, salePrice });
        console.log(`${name} 장바구니 담기`);
    };

    // 이미지 클릭 시 상세 페이지 이동 함수
    const goToDetail = () => {
        navigate(`/product/${id}`); // 경로는 라우터 설정에 따라 변경 가능
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
                            <FaHeart className="text-red-500" size={23} />
                        ) : (
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
                <span className="font-bold">{name}</span>
                {salePrice ? (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through">{price.toLocaleString()}원</span>
                        <span className="font-bold text-lg text-[#00883F]">{Math.round(((price - salePrice) / price) * 100)}% OFF</span>
                        <span className="text-black font-bold text-lg">{salePrice.toLocaleString()}원</span>
                    </div>
                ) : (
                    <span className="text-black font-bold text-lg">{price.toLocaleString()}원</span>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
