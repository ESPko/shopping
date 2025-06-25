import {useState} from "react";

function ProductCard({ image, name, price, salePrice}) {

    const [like, setLike] = useState(false);

    // 찜하기 클릭 이벤트
    const handleLike = () => {
        setLike(!like); // 찜 버튼 누르면 반대로 상태 바꿔줌
        console.log(`${name} 찜 상태: ${!like}`);
    };

    // 장바구니 클릭 이벤트
    const handleAddCart = () => {
        console.log(`${name} 장바구니 담기`);
    };

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col relative group">
            <div className="relative">
                <img src={image} alt={name} className="w-full h-60 object-contain mb-4" />
            </div>

        </div>
    );
}

export default ProductCard