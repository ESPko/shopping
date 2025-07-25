import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductGrid from "../../JangDJ/component/proList/ProductGrid.jsx";

const SearchList = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q") || "";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8080/api/products/search?q=${encodeURIComponent(query)}`);

                const mappedProducts = res.data.map((p) => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    salePrice: p.sale_price,
                    image: p.infoImage,
                    size: p.size,
                    color: p.color,
                    category: p.category,
                }));

                setProducts(mappedProducts);
            } catch (error) {
                console.error("검색 결과 요청 중 오류:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="max-w-[1440px] mx-auto">
            <div className="flex justify-between items-center p-4">
                <h2 className="text-sm font-thin">
                    총 <span className={'font-semibold'}>{products.length}</span> 개의 상품이 검색되었습니다.
                </h2>
            </div>

            {loading ? (
                <p className="text-center text-gray-400 py-20">로딩 중...</p>
            ) : products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <p className="text-center text-gray-500 py-40">검색 결과가 없습니다</p>
            )}
        </div>
    );
};

export default SearchList;
