import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HighItem = ({ mainContentTit }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/products/high/top4")
            .then((res) => {
                setItems(res.data);
                setError(null);
            })
            .catch((err) => {
                console.error("High item fetch error:", err);
                setError("상품을 불러오는 데 실패했습니다.");
            });
    }, []);

    const handleMoreClick = () => {
        navigate("/list?type=high");
    };

    const highTitleContent = mainContentTit.find((content) => content.id === 2);

    return (
        <section className="main-high px-3 py-40">
            <div className="flex justify-between items-center">
                <div>
                    {highTitleContent && (
                        <div key={highTitleContent.id}>
                            <h1 className="text-4xl font-[700]">{highTitleContent.title}</h1>
                            <p className="text-lg font-thin">{highTitleContent.subtitle}</p>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleMoreClick}
                    className="border px-10 py-2 rounded-full font-bold text-white bg-[#1B3C5C]"
                >
                    더보기
                </button>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[#f7f7f7] rounded-lg overflow-hidden transition text-center cursor-pointer"
                        onClick={() => navigate(`/product/${item.id}`)}
                    >
                        <img
                            src={item.infoImage}
                            alt={item.name}
                            className="w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-lg font-thin">{item.price?.toLocaleString()}원</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HighItem;
