import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";


import "swiper/css";
import "swiper/css/scrollbar";

const KeywordItem = ({ mainContentTit }) => {
    const [activeCate, setActiveCate] = useState("airtex");
    const [items, setItems] = useState([]);
    const navigate = useNavigate();


    const itemCate = [
        { id: "airtex", title: "# AIRTEX" },
        { id: "summer-set", title: "# 여름 SET-UP" },
        { id: "airy", title: "# 에어리" },
    ];

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/products/by-category?cate=${activeCate}`)
            .then((res) => setItems(res.data))
            .catch((err) => console.error("키워드 상품 로딩 실패:", err));
    }, [activeCate]);

    return (
        <section className="main-keyword px-3 py-40 mobile:py-10">
            {/* 섹션 타이틀 */}
            <div>
                {(() => {
                    const item = mainContentTit.find((content) => content.id === 3);
                    return item ? (
                        <div key={item.id}>
                            <h1 className="text-4xl font-[700] mobile:text-2xl">{item.title}</h1>
                            <p className="text-lg font-thin mobile:text-base">{item.subtitle}</p>
                        </div>
                    ) : null;
                })()}
            </div>

            {/* 키워드 버튼 */}
            <div>
                {itemCate.map((cate) => (
                    <button
                        key={cate.id}
                        onClick={() => setActiveCate(cate.id)}
                        className={`text-2xl mb-5 px-2 pb-1 pt-5 mr-4 mobile:text-base ${
                            activeCate === cate.id
                                ? "border-b-2 border-b-black font-bold"
                                : ""
                        }`}
                    >
                        {cate.title}
                    </button>
                ))}
            </div>

            {/* 상품 슬라이드 */}
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={5}
                slidesPerView={4.3}
                pagination={{ type: "progressbar", clickable: false }}
                breakpoints={{
                    320: { slidesPerView: 1.2 },
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 3.3 },
                    1280: { slidesPerView: 4.3 },
                }}
                autoplay={{ delay: 4000 }}
                loop={items.length > 4}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div
                            className="p-4 text-left cursor-pointer"
                            onClick={() => navigate(`/product/${item.id}`)}
                        >                            <img
                                src={item.infoImage}
                                alt={item.name}
                                className="max-w-full mb-4 w-full object-cover rounded-lg"
                            />
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="font-bold">
                                {item.price?.toLocaleString()}원
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default KeywordItem;
