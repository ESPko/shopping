import { useEffect, useState } from 'react';

const CartPop = ({ onClose, item, changeSize, addToCart }) => {
    const [tempSelectedSize, setTempSelectedSize] = useState(item.selectedSize);

    // 스크롤 잠금
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // 사이즈 변경 핸들러
    const handleSizeChange = (e) => {
        setTempSelectedSize(e.target.value);
    };

    // 기존 상품의 옵션(사이즈)만 변경
    const handleSaveOption = () => {
        if (tempSelectedSize !== item.selectedSize) {
            changeSize(item.id, tempSelectedSize);
        }
        onClose();
    };

    // 동일 상품이라도 사이즈 다르면 새로 추가
    const handleAddToCart = () => {
        addToCart({
            ...item,
            selectedSize: tempSelectedSize,
            id: Date.now(), // 유일한 ID 생성
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl w-full max-w-md relative">
                {/* 상단 헤더 */}
                <div className="bg-[#1B3C5C] text-white px-6 py-4">
                    <span className="text-lg font-bold">옵션 선택</span>
                    <button onClick={onClose} className="absolute top-3 right-4 text-3xl">×</button>
                </div>

                {/* 상품 정보 */}
                <div className="mb-4 p-5 border-b">
                    <h2>선택한 상품 이름</h2>
                    <div>
                        <h2 className="text-gray-500">[옵션: {item.name}]</h2>
                    </div>
                </div>

                {/* 사이즈 선택 */}
                {item.size && item.size.length > 0 && (
                    <div className="mb-4 p-5">
                        <label htmlFor="size-select" className="block text-sm font-medium text-gray-700 mb-1">
                            사이즈
                        </label>
                        <select
                            id="size-select"
                            value={tempSelectedSize}
                            onChange={handleSizeChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {item.size.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* 버튼 영역 */}
                <div className="flex flex-col p-6 gap-2">
                    <button
                        onClick={handleAddToCart}
                        className="bg-[#1B3C5C] text-white py-2 rounded h-16"
                    >
                        추가
                    </button>
                    <button
                        onClick={handleSaveOption}
                        className="border py-2 rounded h-16"
                    >
                        변경
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPop;
