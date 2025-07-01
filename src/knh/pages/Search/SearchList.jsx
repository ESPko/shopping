import {useLocation} from "react-router-dom";
import ProductGrid from "../../../JangDJ/component/ProductGrid.jsx";

import ProductList from "../../../JangDJ/ProductList.jsx";
import Footer from "../../../JangDJ/Footer.jsx";
import ListFilterButton from "../../../JangDJ/component/ListFilterButton.jsx";

const SearchList = () => {
    const sampleProducts = [
        {
            image: '/images/diadoraProduct.jpg',
            name: '경량 러닝 볼캡 CHARCOAL GREY',
            price: 59000,
        },
        {
            image: '/images/diadoraProduct.jpg',
            name: '화이트 러닝 볼캡 LIGHT WHITE',
            price: 59000,
            salePrice: 49000,
        },
        {
            image: '/images/diadoraProduct.jpg',
            name: '블랙 스포츠 캡 BLACK LINE',
            price: 69000,
        },
        {
            image: '/images/diadoraProduct.jpg',
            name: '테니스 햇 SUMMER BREEZE',
            price: 49000,
        },
        {
            image: '/images/diadoraProduct.jpg',
            name: '그레이 러닝 볼캡 CHARCOAL GREY',
            price: 59000,
        },
    ];

    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q") || "";

    // 상품명에 키워드가 포함된 상품만 필터링
    const filteredProducts = sampleProducts.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <div className="max-w-[1440px] mx-auto">
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-sm font-thin">
                        총 <span className={'font-semibold'}>{filteredProducts.length}</span> 개 의 상품이 검색되었습니다.
                    </h2>
                </div>

                {filteredProducts.length > 0 ? (
                    <ProductGrid products={filteredProducts} />
                ) : (
                    <p className="text-center text-gray-500 py-40">검색 결과가 없습니다</p>
                )}
            </div>
        </div>
    );
}

export default SearchList;