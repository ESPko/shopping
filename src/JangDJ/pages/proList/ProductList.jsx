import ProductGrid from "../../component/proList/ProductGrid.jsx";
import Footer from "../../Footer.jsx";
import ListFilterButton from "../../component/proList/ListFilterButton.jsx";
import SortDropdown from "../../component/proList/SortDropdown.jsx";
import {useState} from "react";
import Header from "../../../knh/components/Header.jsx";

// 상품 더미 데이터
const sampleProducts = [
    {
        image: '/images/diadoraProduct.jpg',
        name: '경량 러닝 볼캡 CHARCOAL GREY',
        price: 59000,
    },
    {
        image: '/images/diadoraProduct.jpg',
        name: '경량 러닝 볼캡 CHARCOAL GREY',
        price: 59000,
        salePrice: 39000,
    },
    {
        image: '/images/diadoraProduct.jpg',
        name: '경량 러닝 볼캡 CHARCOAL GREY',
        price: 59000,
    },
    {
        image: '/images/diadoraProduct.jpg',
        name: '경량 러닝 볼캡 CHARCOAL GREY',
        price: 59000,
    },
    {
        image: '/images/diadoraProduct.jpg',
        name: '경량 러닝 볼캡 CHARCOAL GREY',
        price: 59000,
    },
    {
        image: '/images/diadoraProduct.jpg',
        name: '경량 러닝 볼캡 CHARCOAL GREY',
        price: 59000,
    },
    {
        image: '/images/diadoraProduct.jpg',
        name: '경량 러닝 볼캡 CHARCOAL GREY',
        price: 59000,
    },
    {
        image: '/images/diadoraProduct.jpg',
        name: '경량 러닝 볼캡 CHARCOAL GREY',
        price: 59000,
    },
]

function ProductList() {

    const [sort, setSort] = useState("new");

    return (
        <div>
            <Header isDefaultBlack={true} />
            <div className="pt-28 max-w-[1440px] mx-auto">
                {/* 선택한 카테고리 뜨게 하는 부분 */}
                <div className="flex px-4 pt-6 pb-10 font-bold gap-3 items-center mobile:block mobile:pb-5">
                    <h2 className="text-xl">Men's Clothing</h2>
                    <p className="text-[#00883F]">:</p>
                    <h2 className="text-xl mobile:text-base">아우터</h2>
                    <p className="text-[#00883F]">:</p>
                    <div className={'mobile:border-t border-b py-2'}>
                        <button className="relative w-24 text-sm border px-4 py-1.5 rounded-full hover:bg-gray-100 font-normal text-gray-500 mobile:border-none mobile:px-1 mobile:w-20">자켓</button>
                        <button className="relative w-24 text-sm border px-4 py-1.5 rounded-full hover:bg-gray-100 font-normal text-gray-500 mobile:border-none mobile:px-1 mobile:w-20">베스트</button>
                        <button className="relative w-24 text-sm border px-4 py-1.5 rounded-full hover:bg-gray-100 font-normal text-gray-500 mobile:border-none mobile:px-1 mobile:w-20">다운&패딩</button>
                        <button className="relative w-24 text-sm border px-4 py-1.5 rounded-full hover:bg-gray-100 font-normal text-gray-500 mobile:border-none mobile:px-1 mobile:w-20">플리스</button>

                    </div>

                </div>

                <div className="flex justify-between items-center p-4">
                    <h2 className="text-3xl mobile:text-2xl">아우터</h2>
                    <div className="flex gap-3">
                        {/*정렬방식 드롭다운*/}
                        <SortDropdown onChange={(value) => setSort(value)} />
                        {/*필터 버튼*/}
                        <ListFilterButton />
                    </div>
                </div>
                <ProductGrid products={sampleProducts} />
            </div>
            <Footer />
        </div>
    );
}

export default ProductList