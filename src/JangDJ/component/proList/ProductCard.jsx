import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { LucideHeart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ProductListCart from "../../pages/proList/ProductListCart.jsx";
import useAuthStore from "../../../knh/Store/UserAuthStore.js";

function ProductCard({ id, image, name, price, salePrice }) {
    const [like, setLike] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuthStore();
    const userId = user?.id;

    useEffect(() => {
        const fetchLikeStatus = async () => {
            if (!userId) return;
            try {
                const res = await axios.get("http://localhost:8080/api/likes/status", {
                    params: { userId, productId: id },
                });
                setLike(res.data);
            } catch (err) {
                console.error("찜 상태 불러오기 실패", err);
            }
        };
        fetchLikeStatus();
    }, [userId, id]);

    const handleClickLike = async (e) => {
        e.stopPropagation();
        if (!isLoggedIn || !userId) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            setLike((prev) => !prev);
            await axios.post("http://localhost:8080/api/likes", {
                userId,
                productId: id,
            });
        } catch (error) {
            console.error("찜하기 실패", error);
            alert("찜하기 처리에 실패했습니다.");
            setLike((prev) => !prev); // 복구
        }
    };

    const handleClickAddToCart = (e) => {
        e.stopPropagation();
        if (!isLoggedIn || !userId) {
            alert("로그인이 필요합니다.");
            return;
        }
        setShowCartModal(true);
    };

    const goToDetail = () => {
        navigate(`/product/${id}`);
    };

    return (
        <>
            <div className="flex flex-col gap-2 cursor-pointer" onClick={goToDetail}>
                <div className="relative bg-[#F7F7F7] rounded-2xl overflow-hidden hover:shadow">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-auto object-contain"
                    />
                    <div className="absolute top-1.5 right-1 flex gap-1.5 pr-1">
                        <button onClick={handleClickLike} className="p-1" type="button">
                            {like ? (
                                <FaHeart className="text-red-500" size={23} />
                            ) : (
                                <LucideHeart className="text-gray-600" strokeWidth={1.5} size={23} />
                            )}
                        </button>
                        <button onClick={handleClickAddToCart} className="p-1" type="button">
                            <ShoppingBag className="text-gray-600" strokeWidth={1.5} size={23} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-1 mt-4">
                    <span className="font-bold mobile:text-sm">{name}</span>
                    {salePrice != null && price != null ? (
                        <div className="flex items-center gap-2 mobile:block">
                            <span className="text-gray-400 line-through mobile:text-sm">
                                {price.toLocaleString()}원
                            </span>
                            <span className="font-bold text-lg text-[#00883F] mobile:text-sm mobile:pl-1">
                                {Math.round(((price - salePrice) / price) * 100)}% OFF
                            </span>
                            <span className="text-black font-bold text-lg mobile:text-base mobile:block">
                                {salePrice.toLocaleString()}원
                            </span>
                        </div>
                    ) : price != null ? (
                        <span className="text-black font-bold text-lg mobile:text-base">
                            {price.toLocaleString()}원
                        </span>
                    ) : (
                        <span className="text-gray-500 mobile:text-base">가격 정보 없음</span>
                    )}
                </div>
            </div>

            {showCartModal && (
                <ProductListCart
                    product={{ id, image, name, price, salePrice }}
                    onClose={() => setShowCartModal(false)}
                />
            )}
        </>
    );
}

export default ProductCard;
