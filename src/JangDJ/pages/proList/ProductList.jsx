import { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "../../component/proList/ProductGrid.jsx";
import Footer from "../../Footer.jsx";
import ListFilterButton from "../../component/proList/ListFilterButton.jsx";
import SortDropdown from "../../component/proList/SortDropdown.jsx";
import Header from "../../../knh/components/Header.jsx";

function ProductList() {
    const [sort, setSort] = useState("new");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/products");
                // 서버에서 product 엔티티 필드에 맞춰서 반환한다고 가정
                console.log("API Response:", res.data);  // 여기서 데이터 확인
                setProducts(res.data.map(p => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    salePrice: p.salePrice,
                    size: p.size,
                    color: p.color,
                    category: p.category,
                    image: p.infoImage,  // 상품 이미지 URL만 남기고 infoImage는 생략지로 상세 이미지 URL을 임시 사용 (필요시 분    리)
                })));
            } catch (err) {
                console.error("상품 데이터를 불러오는 데 실패했습니다", err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <Header isDefaultBlack={true} />
            <div className="pt-28 max-w-[1440px] mx-auto">
                <div className="flex px-4 pt-6 pb-10 font-bold gap-3 items-center">
                    <h2 className="text-xl">Men's Clothing</h2>
                    <p className="text-[#00883F]">:</p>
                    <h2 className="text-xl">아우터</h2>
                </div>

                <div className="flex justify-between items-center p-4">
                    <h2 className="text-3xl">아우터</h2>
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
