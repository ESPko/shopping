import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import ProductGrid from "../../component/proList/ProductGrid.jsx";
import Footer from "../../Footer.jsx";
import ListFilterButton from "../../component/proList/ListFilterButton.jsx";
import SortDropdown from "../../component/proList/SortDropdown.jsx";
import Header from "../../../knh/components/Header.jsx";

function ProductList() {
    const [sort, setSort] = useState("new");
    const [products, setProducts] = useState([]);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get("type"); // 예: 'high', 'best' 등
    const category = params.get("category"); // 새로 추가: '자켓', '베스트' 등

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = "http://localhost:8080/api/products";

                if (type && category) {
                    url += `?type=${type}&category=${encodeURIComponent(category)}`;
                } else if (category) {
                    url += `?category=${encodeURIComponent(category)}`;
                } else if (type) {
                    url += `?type=${type}`;
                }

                const res = await axios.get(url);

                setProducts(
                    res.data.map((p) => ({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        salePrice: p.salePrice,
                        size: p.size,
                        color: p.color,
                        category: p.category,
                        image: p.infoImage,
                    }))
                );
            } catch (err) {
                console.error("상품 데이터를 불러오는 데 실패했습니다", err);
            }
        };

        fetchProducts();
    }, [type, category]);

    // 페이지 제목 동적 설정
    const pageTitle = category
        ? `${category} 상품`
        : type === "high"
            ? "추천 상품"
            : type === "best"
                ? "인기 상품"
                : "전체 상품";

    return (
        <div>
            <Header isDefaultBlack={true} />
            <div className="pt-28 max-w-[1440px] mx-auto">
                <div className="flex px-4 pt-6 pb-10 font-bold gap-3 items-center">
                    <h2 className="text-xl">{pageTitle}</h2>
                </div>

                <div className="flex justify-between items-center p-4">
                    <h2 className="text-3xl">{pageTitle}</h2>
                    <div className="flex gap-3">
                        <SortDropdown onChange={(value) => setSort(value)} />
                        <ListFilterButton />
                    </div>
                </div>

                <ProductGrid products={products} />
            </div>
            <Footer />
        </div>
    );
}

export default ProductList;
