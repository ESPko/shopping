import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/scrollbar";

const BestItem = ({ mainContentTit }) => {
    const categories = [
        { label: "Shoes", value: "shoes" },
        { label: "Clothing", value: "clothing" },
        { label: "Acc.", value: "acc" },
        { label: "Sports", value: "sports" },
    ];

    const [activeCate, setActiveCate] = useState("shoes");
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/products/best-by-cate?cate=${activeCate}`)
            .then((res) => setItems(res.data))
            .catch((err) => console.error("카테고리별 상품 로딩 실패:", err));
    }, [activeCate]);

    return (
        <section className="main-best pt-40">
            <div className="flex justify-between items-center px-3">
                <div>
                    {(() => {
                        const item = mainContentTit.find((content) => content.id === 1);
                        return item ? (
                            <div key={item.id}>
                                <h1 className="text-4xl font-[700]">{item.title}</h1>
                                <p className="text-lg font-thin">{item.subtitle}</p>
                            </div>
                        ) : null;
                    })()}
                </div>

                <div>
                    {categories.map((cate) => (
                        <button
                            key={cate.value}
                            onClick={() => setActiveCate(cate.value)}
                            className={`border px-10 py-2 rounded-full font-bold transition ml-4 ${
                                activeCate === cate.value
                                    ? "bg-[#1B3C5C] text-white"
                                    : "bg-white text-[#1B3C5C] border-[#1B3C5C]"
                            }`}
                        >
                            {cate.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={5}
                    slidesPerView={4.3}
                    loop={items.length > 4}
                    autoplay={{ delay: 4000 }}
                    pagination={{
                        type: "progressbar",
                        clickable: false,
                    }}
                    breakpoints={{
                        320: { slidesPerView: 1.2 },
                        640: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.3 },
                        1280: { slidesPerView: 4.3 },
                    }}
                >
                    {items.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div
                                className="p-4 text-left cursor-pointer"
                                onClick={() => navigate(`/product/${item.id}`)}
                            >
                                <img
                                    src={item.infoImage}
                                    alt={item.name}
                                    className="max-w-full mb-4 w-full object-cover rounded-lg"
                                />
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="font-bold">{item.price?.toLocaleString()}원</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default BestItem;
