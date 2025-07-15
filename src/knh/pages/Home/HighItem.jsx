import { useEffect, useState } from "react";
import axios from "axios";

const HighItem = ({ mainContentTit }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/products")
            .then((res) => setItems(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <section className="main-high px-3 py-40">
            {/* 상단 제목 영역 */}
            <div className="flex justify-between items-center">
                <div>
                    {(() => {
                        const item = mainContentTit.find((content) => content.id === 2);
                        return item ? (
                            <div key={item.id}>
                                <h1 className="text-4xl font-[700]">{item.title}</h1>
                                <p className="text-lg font-thin">{item.subtitle}</p>
                            </div>
                        ) : null;
                    })()}
                </div>
                <a
                    href="https://www.diadorakorea.com/"
                    className="border px-10 py-2 rounded-full font-bold text-white bg-[#1B3C5C]"
                >
                    더보기
                </a>
            </div>

            {/* 상품 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                {items.map((item) => (
                    <a
                        key={item.id}
                        href={item.link || "#"}
                        className="bg-[#f7f7f7] rounded-lg overflow-hidden transition text-center"
                    >
                        <img
                            src={item.infoImage}  // 여기서 infoImage를 이미지 URL로 사용
                            alt={item.name}
                            className="w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-lg font-thin">
                                {item.price?.toLocaleString()}원
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default HighItem;
