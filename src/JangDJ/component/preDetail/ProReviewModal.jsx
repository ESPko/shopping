import usePhotoReviewModal from "../../store/usePhotoReviewModal.js";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { format } from "date-fns";  // 날짜 포맷을 위한 date-fns

function ProReviewModal() {
    const {
        isOpen,
        selectedReview,
        currentImageIndex,
        closeModal,
        nextImage,
        prevImage,
    } = usePhotoReviewModal();

    // isOpen이 false이거나 selectedReview가 없으면 모달을 렌더링하지 않음
    if (!isOpen || !selectedReview) return null;

    const { rating, created_at, content, images_list } = selectedReview;

    // 날짜 포맷팅
    const formattedDate = created_at ? format(new Date(created_at), "yyyy-MM-dd") : "날짜 없음";

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

                <div className="flex gap-8 px-14 my-6 mobile:block">
                    {/* 이미지 슬라이드 */}
                    <div className="w-full md:w-1/2 aspect-[4/4] overflow-hidden bg-gray-100 shrink-0 relative flex justify-center items-center">
                        {images_list && images_list.length > 0 ? (
                            <>
                                <img
                                    src={images_list[currentImageIndex]}
                                    alt="리뷰 이미지"
                                    className="max-h-full max-w-full object-contain z-0"
                                />
                                {images_list.length > 1 && (
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
                            </>
                        ) : (
                            <p>이미지가 없습니다.</p> // 이미지가 없을 경우 메시지 표시
                        )}
                    </div>

                    {/* 리뷰 정보 */}
                    <div className="text-sm space-y-1 mobile:pt-5">
                        <div className=" mb-2">
                            {"★".repeat(rating)}{"☆".repeat(5 - rating)}
                        </div>
                        <div className="text-gray-500 mb-8">{formattedDate}</div>
                        <div className="text-gray-800">{content}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProReviewModal;
