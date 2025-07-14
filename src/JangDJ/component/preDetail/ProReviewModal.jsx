import usePhotoReviewModal from "../../usePhotoReviewModal.js";
import {FaChevronLeft, FaChevronRight, FaTimes} from "react-icons/fa";

function ProReviewModal() {

    const {
        isOpen,
        selectedReview,
        currentImageIndex,
        closeModal,
        nextImage,
        prevImage,
    } = usePhotoReviewModal();

    if (!isOpen || !selectedReview) return null;

    const { rating, date, content, images } = selectedReview;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 w-full max-w-3xl relative">
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    onClick={closeModal}
                >
                    <FaTimes size={20} />
                </button>

                <p className="mt-5 pl-14 text-xl font-bold">포토리뷰</p>


                <div className="flex gap-8 px-14 my-6">
                    {/* 이미지 슬라이드 */}
                    <div className="w-full md:w-1/2 aspect-[4/4] overflow-hidden bg-gray-100 shrink-0 relative flex justify-center items-center">
                        <img
                            src={images[currentImageIndex]}
                            alt="리뷰 이미지"
                            className="max-h-full max-w-full object-contain z-0"
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 z-10"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 z-10"
                                >
                                    <FaChevronRight />
                                </button>
                            </>
                        )}
                    </div>

                    {/* 리뷰 정보 */}
                    <div className="text-sm space-y-1">
                        <div className=" mb-2">
                            {"★".repeat(rating)}{"☆".repeat(5 - rating)}
                        </div>
                        <div className="text-gray-500 mb-8">{date}</div>
                        <div className="text-gray-800">{content}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProReviewModal