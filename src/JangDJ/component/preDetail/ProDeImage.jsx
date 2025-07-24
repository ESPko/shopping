import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ProDeImage({ product }) {
    // infoImage를 배열로 만들어 사용 (이미지 여러 개일 경우 대비)
    const images = [product.infoImage];
    const [currentImg, setCurrentImg] = useState(0);

    const nextImg = () => {
        setCurrentImg((prev) => (prev + 1) % images.length);
    };

    const prevImg = () => {
        setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div>
            <div className="flex gap-4 mb-4 mobile:block">
                {/*썸네일 사진 세로 리스트*/}
                <div className="flex flex-col gap-6 mobile:flex-row mobile:pb-5 mobile:justify-center mobile:gap-2 ">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`썸네일-${idx}`}
                            onClick={() => setCurrentImg(idx)}
                            className={`w-20 h-20 object-cover rounded cursor-pointer mobile:w-14 mobile:h-14 ${currentImg === idx ? "ring-2 ring-gray-300" : ""}`}
                        />
                    ))}
                </div>

                {/* 메인 이미지 영역 */}
                <div className="relative w-full max-w-[500px]">
                    <img
                        src={images[currentImg]}
                        alt="메인 이미지"
                        className="w-full h-auto object-cover rounded"
                    />

                {/*    좌우 화살표*/}
                    <button
                        onClick={prevImg}
                        className="absolute top-1/2 left-1 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-200"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={nextImg}
                        className="absolute top-1/2 right-1 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-200"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProDeImage;
