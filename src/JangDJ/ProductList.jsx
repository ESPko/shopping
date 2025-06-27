import ProductGrid from "./component/ProductGrid.jsx";
import Footer from "./Footer.jsx";
import ListFilterButton from "./component/ListFilterButton.jsx";

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
    return (
        <div>
            <div className="max-w-[1440px] mx-auto">
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-2xl font-bold">아우터</h2>
                    <ListFilterButton />
                </div>
                <ProductGrid products={sampleProducts} />
            </div>
            <Footer />
        </div>
    );
}

export default ProductList