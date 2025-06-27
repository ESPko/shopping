import {useEffect, useState} from "react";
import {FaSearch} from "react-icons/fa";
import {FiRotateCw} from "react-icons/fi";
import FilterPriceSlide from "./component/FilterPriceSlide.jsx";

function ListFilter({ open, close }) {
    // 상품 리스트 스크롤 막기
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
    }, [open]);

    const [priceRange, setPriceRange] = useState([10000, 500000]);
    return (
        <>
            {/*배경 회색*/}
            <div
                className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 z-40 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={close}
            />
        {/*    필터 영역*/}
            <div className={`text-start fixed top-0 right-0 w-full max-w-md h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='p-6'>
                    <div className='flex justify-between items-center border-b pb-4 mb-4'>
                        <h2 className='text-xl font-bold'>Filter</h2>
                        <button onClick={close} className="text-2xl font-light">&times;</button>
                    </div>
                {/*    가격 */}
                    <FilterPriceSlide values={priceRange} onChange={setPriceRange} />
                {/*    <div className="mb-6">*/}
                {/*        <h3 className="font-semibold mb-2">가격</h3>*/}
                {/*        <input type="range" min="10000" max="500000" className="w-full accent-green-600" />*/}
                {/*        <div className="flex justify-between text-sm mt-1 text-green-700">*/}
                {/*            <span>10,000원</span>*/}
                {/*            <span>500,000원</span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    컬러*/}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">컬러</h3>
                        <div className="grid grid-cols-6 gap-3">
                            {[
                                { color: 'bg-red-600', label: '레드' },
                                { color: 'bg-yellow-400', label: '옐로우' },
                                { color: 'bg-pink-300', label: '핑크' },
                                { color: 'bg-amber-400', label: '카멜' },
                                { color: 'bg-amber-100', label: '파스텔' },
                                { color: 'bg-green-500', label: '그린' },
                                { color: 'bg-blue-600', label: '블루' },
                                { color: 'bg-purple-500', label: '퍼플' },
                                { color: 'bg-red-900', label: '브라운' },
                                { color: 'bg-indigo-800', label: '네이비' },
                                { color: 'bg-white border', label: '화이트' },
                                { color: 'bg-black', label: '블랙' }
                            ].map((c, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className={`w-6 h-6 rounded-full ${c.color} border border-gray-300`} />
                                    <span className="text-xs mt-1">{c.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                {/*    검색*/}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">결과 내 검색</h3>
                        <div className="flex items-center border rounded px-3 py-2">
                            <input type="text" placeholder="검색어 입력" className="w-full outline-none" />
                        </div>
                    </div>
                {/*    버튼*/}
                    <div className="flex gap-3">
                        <button className="flex-1 py-2 border rounded text-sm flex items-center justify-center gap-2">
                            <FiRotateCw className="w-4 h-4" />
                            초기화
                        </button>
                        <button className="lex-1 py-2 bg-black text-white rounded text-sm flex items-center justify-center gap-2">
                            <FaSearch className="w-4 h-4" />
                            검색하기
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ListFilter