import ProductGrid from "./ProductGrid.jsx";
import Footer from "./Footer.jsx";

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
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold p-4">아우터</h2>
                <ProductGrid products={sampleProducts} />
            </div>
            <Footer />
        </div>
    );
}

export default ProductList