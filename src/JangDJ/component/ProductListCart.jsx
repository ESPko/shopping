import {useState} from "react";

function ProductListCart({ product, onClose }) {
    const [selectSize, setSelectSize] = useState();
    const [count, setCount] = useState(1);
    const price = product.salePrice || product.price;
    const totalPrice = price * count;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl w-full max-w-md relative">
                <div className="bg-[#1B3C5C] text-white px-6 py-4 ">
                    <span className="text-lg font-bold">옵션 선택</span>
                    <button onClick={onClose} className="absolute top-3 right-4 text-3xl">×</button>
                </div>

                <div className="flex gap-4 mb-4 p-6 ">
                    <img src={product.image} alt={product.name} className="h-20 w-20 object-contain" />
                    <div>
                        <h2 className="font-semibold">{product.name}</h2>
                    </div>
                </div>

                <div className="mb-4 p-6 ">
                    <div className="font-medium mb-2">사이즈</div>
                    <div className="flex gap-2">
                        {["S", "M", "L", "XL", "2XL"].map((size) => (
                            <button
                                key={size}
                                className={`px-3 py-1 rounded border ${
                                    selectSize === size ? "bg-black text-white" : "bg-white" 
                                }`}
                                onClick={() => setSelectSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4 p-6 ">
                    <div className="flex items-center gap-2">
                        <span>{selectSize}</span>
                        <div className="bg-gray-200 w-16 h-10 items-center">
                            <button onClick={() => setCount(q => Math.max(q - 1))}>-</button>
                            <span>{count}</span>
                            <button onClick={() => setCount(q => q + 1)}>+</button>
                        </div>
                    </div>
                    <div className="text-lg font-bold">{totalPrice.toLocaleString()}원</div>
                </div>

                <div className="flex flex-col p-6 ">
                    <button className="bg-[#1B3C5C] text-white py-2 rounded h-16">바로구매하기</button>
                    <button className="border py-2 rounded h-16">장바구니담기</button>
                </div>
            </div>

        </div>
    );
}

export default ProductListCart