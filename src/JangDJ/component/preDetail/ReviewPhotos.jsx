import { useEffect } from "react";
import useProductReview from "../../store/useProductReview.js";
import usePhotoReviewModal from "../../store/usePhotoReviewModal.js";
import axios from "axios";

function ReviewPhotos() {
    const { reviews, setReviews } = useProductReview(); // reviews와 setReviews 사용
    const { openModal } = usePhotoReviewModal();

    // 백엔드에서 리뷰 목록을 가져오는 useEffect
    useEffect(() => {
        axios.get('http://localhost:8080/api/reviews')  // 리뷰 데이터를 받아오는 API
            .then((response) => {
                setReviews(response.data);  // 받은 데이터를 상태에 설정
                console.log("받은 리뷰 데이터:", response.data);
            })
            .catch((error) => {
                console.error("리뷰를 가져오는 데 실패했습니다.", error);
            });
    }, [setReviews]);

    // 리뷰 배열이 비어 있을 수 있으므로 기본값을 빈 배열로 설정
    const validReviews = Array.isArray(reviews) ? reviews : [];

    // 이미지가 있는 리뷰만 필터링하고 첫 번째 이미지만 추출
    const photos = validReviews
        .filter((review) => Array.isArray(review.images_list) && review.images_list.length > 0) // 이미지 배열이 있을 경우만 필터링
        .map((review) => ({
            src: review.images_list[0], // 첫 번째 이미지만 추출
            review,
        }));

    return (
        <div className="flex items-center gap-3 overflow-x-auto mb-4">
            {photos.length > 0 ? (
                photos.map(({ src, review }, i) => (
                    <img
                        key={i}
                        src={src}  // 이미지 경로 사용
                        alt={`리뷰사진 ${i + 1}`}
                        className="w-24 h-24 object-cover shrink-0 hover:text-black cursor-pointer"
                        onClick={() => openModal(review)} // 클릭 시 모달 열기
                    />
                ))
            ) : (
                <p>사진이 포함된 리뷰가 없습니다.</p> // 사진이 없을 경우 메시지 표시
            )}
        </div>
    );
}

export default ReviewPhotos;
