import React, { useEffect, useState } from 'react';
import TabMenu from "../components/TabMenu.jsx";
import axios from "axios";
import useAuthStore from "../../../knh/Store/UserAuthStore.js";
import ProductCard from "../../../JangDJ/component/proList/ProductCard.jsx";

function MypageMainActivity() {
    const [activeTab, setActiveTab] = useState("관심상품");
    const { user } = useAuthStore();
    const userId = user?.id;

    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        if (activeTab === "관심상품" && userId) {
            axios.get(`http://localhost:8080/api/likes/products`, {
                params: { userId },
            })
                .then(res => {
                    setLikedProducts(res.data);
                })
                .catch(err => {
                    console.error("관심상품 불러오기 실패", err);
                });
        }
    }, [activeTab, userId]);

    return (
        <>
            <main className="pt-[120px] max-w-4xl mx-auto px-4 text-gray-800 text-sm min-h-screen mobile:pt-10">
                <TabMenu />

                {/* 중단 탭 메뉴 */}
                <div className="flex border-b text-center text-sm font-semibold mb-6">
                    {["관심상품", "리뷰", "Q&A"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 ${
                                activeTab === tab
                                    ? "border-b-2 border-black text-black"
                                    : "text-gray-500"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* 탭별 콘텐츠 */}
                {activeTab === "관심상품" && (
                    <>
                        {likedProducts.length === 0 ? (
                            <p className="text-center py-20 text-gray-500">관심상품이 없습니다.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-6">

                                {likedProducts.map(product => {
                                    return (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            image={product.info_image || product.image}
                                            name={product.name}
                                            price={product.price}
                                            salePrice={product.salePrice}
                                        />
                                    );
                                })}
                            </div>
                        )}
                        {/* 필요하면 하단 버튼들 추가 가능 */}
                    </>
                )}

                {/* 리뷰, Q&A는 준비 중 메시지 */}
                {activeTab !== "관심상품" && (
                    <div className="text-center text-gray-500 py-20">
                        <p>{activeTab} 내용이 없습니다.</p>
                    </div>
                )}
            </main>
        </>
    );
}

export default MypageMainActivity;
