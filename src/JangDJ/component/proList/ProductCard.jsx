import {useState} from "react";
import {FaHeart, FaRegHeart, FaShoppingBag} from "react-icons/fa";
import {LucideHeart, ShoppingBag} from 'lucide-react';

function ProductCard({ image, name, price, salePrice, onCartClick }) {

    const [like, setLike] = useState(false);

    // 찜하기 클릭 이벤트
    const handleLike = () => {
        setLike(!like); // 찜 버튼 누르면 반대로 상태 바꿔줌
        console.log(`${name} 찜 상태: ${!like}`);
    };

    // 장바구니 클릭 이벤트
    const handleAddCart = () => {
        onCartClick({ image, name, price, salePrice });
        console.log(`${name} 장바구니 담기`);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="relative bg-[#F7F7F7] rounded-2xl overflow-hidden hover:shadow">
                <img src={image} alt={name} className="w-full h-auto object-contain" />
            {/*    하트, 장바구니 버튼*/}
                <div className="absolute top-1.5 right-1 flex gap-1.5 pr-1 ">
                    <button onClick={handleLike} className="p-1">
                        {like ? (
                            // 하트 누를 시 빨간색으로 가득차게 변경
                            <FaHeart className="text-red-500" size={23} />
                        ) : (
                            // 기본 하트는 테두리만 있음
                            <LucideHeart className="text-gray-600" strokeWidth={1.5} size={23} />
                        )}
                    </button>
                    <button onClick={handleAddCart} className="p-1">
                        <ShoppingBag className="text-gray-600" strokeWidth={1.5} size={23} />
                    </button>
                </div>
            </div>

        {/*    상품 정보 영역*/}
            <div className="flex flex-col gap-1 mt-4">
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

export default ProductCard