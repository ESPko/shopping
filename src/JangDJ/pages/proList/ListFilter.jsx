import {useEffect} from "react";
import {FaSearch} from "react-icons/fa";
import {FiRotateCw} from "react-icons/fi";
import FilterPriceSlide from "../../component/proList/FilterPriceSlide.jsx";
import useFilterList from "../../store/useFilterList.js";
import FilterColor from "../../component/proList/FilterColor.jsx";
import Header from "../../../knh/components/Header.jsx";

function ListFilter({ open, close }) {
    // 상품 리스트 스크롤 막기
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
    }, [open]);

    // 금액대
    const {priceRange, setPriceRange} = useFilterList();

    // 색상
    const {color, setColor} = useFilterList();
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
                    <div className='flex justify-between items-center border-b-2 pb-4 mb-4'>
                        <h2 className='text-xl font-bold'>Filter</h2>
                        <button onClick={close} className="text-2xl font-light">&times;</button>
                    </div>

                {/*    가격 */}
                    <FilterPriceSlide values={priceRange} onChange={setPriceRange} />

                    {/*컬러*/}
                    <FilterColor selected={color} onChange={setColor} />
                    {/*컬러 선택된 것 없으면 밑줄 생성되게 하기 */}
                    {color.length < 1 && (
                        <div className="border-b-2 mb-6" />
                    )}

                    {/*    선택한 컬러 리스트 미리보기*/}
                    {color.length > 0 && (
                        <div className="mb-6 border-b-2 pb-6 px-2">
                            <div className="flex flex-wrap gap-2">
                                {color.map((label, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 border rounded-full text-sm"
                                    >
                                        <span>{label}</span>
                                        <button
                                            onClick={() => setColor(color.filter((c) => c !== label))}
                                            className="text-gray-500 hover:text-gray-800 text-xs"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                {/*    검색*/}
                    <div className="mb-6 border-b-2 pb-6">
                        <h3 className="font-semibold mb-2 pb-3">결과 내 검색</h3>
                        <div className="flex items-center border rounded-full bg-gray-50 px-3 py-2">
                            <input type="text" placeholder="검색어 입력" className="w-full outline-none bg-gray-50" />
                        </div>
                    </div>

                {/*    버튼*/}
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={()=> setColor([])}
                            className="flex-1 py-3 border rounded-full flex items-center justify-center gap-2 text-white bg-[#1B3C5C]"
                        >
                            <FiRotateCw className="w-6 h-6 pr-1" />
                            초기화
                        </button>
                        <button className="flex-1 py-3 bg-[#1B3C5C] text-white rounded-full flex items-center justify-center gap-2">
                            <FaSearch className="w-5 h-5 pr-1" />
                            검색하기
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ListFilter