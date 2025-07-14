import useProductReview from "../../useProductReview.js";
import usePhotoReviewModal from "../../usePhotoReviewModal.js";

function ReviewPhotos() {
    const { reviews } = useProductReview();
    const { openModal } = usePhotoReviewModal();

    // 이미지 있는 리뷰만 필터링 후 이미지 중 첫번째 이미지만 추출
    const photos = reviews
        .filter((review) => review.images && review.images.length > 0)
        .map((review) => ({
            src: review.images[0],
            review,
        }));

    return (
        <>
            <div className="flex items-center gap-3 overflow-x-auto mb-4">
                {photos.map(({src, review}, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`리뷰사진 ${i + 1}`}
                        className="w-24 h-24 object-cover shrink-0 hover:text-black"
                        onClick={() => openModal(review)}
                    />
                ))}
            </div>
        </>
    );
}

export default ReviewPhotos