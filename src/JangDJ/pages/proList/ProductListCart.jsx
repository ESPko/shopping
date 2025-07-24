import {useState} from "react";

function ProductListCart({ product, onClose }) {
    // const [selectSize, setSelectSize] = useState();
    // const [count, setCount] = useState(1);
    // const price = product.salePrice || product.price;
    // const totalPrice = price * count;

    const [selectedSize, setSelectedSize] = useState([]);
    const price = product.salePrice|| product.price;

    const handleSizeClick = (size) => {
        const exist = selectedSize.find((opt) => opt.size === size);
        if (!exist) {
            setSelectedSize([
                ...selectedSize,
                {size, count: 1, price},
            ]);
        }
    };

    const updateCount = (size, change) => {
        setSelectedSize((prev) =>
            prev.map((opt) =>
            opt.size === size
                ? { ...opt, count: Math.max(1, opt.count + change) }
                : opt
            )
        );
    };

    // 사이즈 별 x 버튼
    const removeOption = (size) => {
        setSelectedSize((prev) =>
            prev.filter((opt) => opt.size !== size)
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl w-full max-w-md relative">
                <div className="bg-[#1B3C5C] text-white px-6 py-4 ">
                    <span className="text-lg font-bold mobile:text-base">옵션 선택</span>
                    <button onClick={onClose} className="absolute top-3 right-4 text-3xl">×</button>
                </div>

                <div className="flex gap-4 mb-4 p-6 mobile:mb-0 ">
                    <img src={product.image} alt={product.name} className="h-20 w-20 object-contain" />
                    <div>
                        <h2 className="font-semibold">{product.name}</h2>
                    </div>
                </div>

                <div className="px-6 pt-6">
                    <div className="font-medium mb-2">사이즈</div>
                    <div className="flex gap-2 flex-wrap">
                        {["S", "M", "L", "XL"].map((size) => (
                            <button
                                key={size}
                                className="px-3 py-1 rounded border bg-white hover:bg-gray-100"
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <div className="font-light mt-8 text-sm pb-2 border-b">* 위 옵션선택 박스를 선택하시면 아래에 상품이 추가됩니다.</div>
                </div>

                {selectedSize.map(({ size, count, price }) => (
                    <div
                        key={size}
                        className="flex items-center justify-between gap-4 px-6 py-4"
                    >
                        <div className="font-medium w-1/3">{size}</div>
                        <div className="flex items-center gap-2 w-1/3 justify-center">
                            <button
                                className="px-2 py-1"
                                onClick={() => updateCount(size, -1)}
                            >
                                -
                            </button>
                            <span>{count}</span>
                            <button
                                className="px-2 py-1"
                                onClick={() => updateCount(size, 1)}
                            >
                                +
                            </button>
                        </div>
                        <div className="flex items-center gap-4 w-1/3 justify-end">
                            <div className="font-bold">
                                {(price * count).toLocaleString()} 원
                            </div>
                            <button
                                className="text-gray-500 hover:text-red-500"
                                onClick={() => removeOption(size)}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}

                {selectedSize.length > 0 && (
                    <div className="px-6 pb-4 border-t pt-5 text-gray-700 font-medium">
                        총 상품금액 ({selectedSize.reduce((sum, opt) => sum + opt.count, 0)}개)  : {" "}
                        <span className="text-2xl font-semibold mobile:text-xl">
                            {selectedSize.reduce((sum, opt) => sum + opt.count * opt.price, 0).toLocaleString()}원
                        </span>
                    </div>
                )}

                <div className="flex flex-col p-6 ">
                    <button className="bg-[#1B3C5C] text-lg text-white py-2 rounded h-16 mobile:text-base mobile:h-10">바로구매하기</button>
                    <button className="border border-[#1B3C5C] font-semibold py-2 text-lg rounded h-16 mobile:text-base mobile:h-10">장바구니담기</button>
                </div>
            </div>

        </div>
    );
}

export default ProductListCart