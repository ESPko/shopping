import { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from 'date-fns';
import useProductReview from "../../store/useProductReview.js";
import ReviewFormModal from "./ReviewFormModal";
import useReviewFormModal from "../../store/useReviewFormModal.js";
import DeleteReviewModal from "./DeleteReviewModal";

function ReviewList() {
    const { reviews, setReviews, photoOnly } = useProductReview();
    const { isFormOpen, openFormModal, closeFormModal } = useReviewFormModal();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteReviewId, setDeleteReviewId] = useState(null);
    const [loading, setLoading] = useState(false);

    const validReviews = reviews || [];

    // 필터링 처리 (사진만 필터링하거나 전체 리뷰 리스트)
    const filter = photoOnly
        ? validReviews.filter((r) => r.images_list && Array.isArray(r.images_list) && r.images_list.length > 0)
        : validReviews;

    // 서버에서 리뷰 데이터를 가져오는 함수
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/reviews');
            setReviews(response.data); // 서버에서 받은 데이터를 상태에 저장
        } catch (error) {
            console.error("리뷰 데이터를 가져오는 데 실패했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    // 리뷰 제출 후 처리
    const handleCreateReview = async (newReview) => {
        try {
            // 서버로 리뷰 추가 요청
            const response = await axios.post("http://localhost:8080/api/reviews", newReview);

            // 서버에서 새로운 리뷰 목록 가져오기
            if (response.data) {
                // 서버에서 최신 리뷰 목록을 가져와서 상태 업데이트
                fetchReviews();
                closeFormModal();  // 모달 닫기
            }
        } catch (error) {
            console.error("리뷰 추가 실패:", error);
        }
    };

    // 리뷰 삭제 후 상태 업데이트 (서버 요청 없이 클라이언트에서만 상태 업데이트)
    const handleDeleteReviewSuccess = (deletedReviewId) => {
        setReviews(reviews.filter(review => review.id !== deletedReviewId));
        alert("리뷰가 삭제되었습니다.");
    };

    // 상태 변화 추적 (리뷰 업데이트 시마다 실행)
    useEffect(() => {
        // reviews 상태가 변경될 때마다 호출
    }, [reviews]);

    useEffect(() => {
        if (reviews.length === 0) {
            fetchReviews(); // 처음에는 리뷰를 서버에서 가져옵니다.
        }
    }, []);  // 처음 한 번만 실행

    return (
        <div className="mx-16 mobile:mx-4">
            <p className="pl-2 text-xl font-bold pb-4 border-b mobile:text-base mobile:pb-0">리뷰 {filter.length}개</p>

            {/* 로딩 중일 때 */}
            {loading && <p>리뷰를 불러오는 중...</p>}

            <ul>
                {Array.isArray(filter) && filter.length > 0 ? (
                    filter.map((r) => (
                        <li key={r.id} className="border-b flex gap-12 py-8 mobile:block">
                            <div className="flex items-center gap-2 mb-2 text-[#00883e]">
                                <p className="text-lg mb-2">
                                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                                </p>
                                <p className="text-sm text-gray-400">{r.name}</p>

                                {/* 날짜 포맷 처리 */}
                                <p className="text-sm text-gray-400 mb-1">
                                    {r.created_at
                                        ? format(parseISO(r.created_at), 'yyyy-MM-dd')
                                        : '날짜 없음'}
                                </p>
                            </div>

                            <div>
                                <p className="mb-4">{r.content}</p>
                                <div className="gap-2 flex">
                                    {/* images_list로 이미지 배열을 사용 */}
                                    {r.images_list && r.images_list.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}  // /images/ 경로만 사용
                                            alt={`리뷰사진 ${i + 1}`}
                                            className="w-20 h-20 object-cover border"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* 휴지통 이모지 (🗑️)를 사용하여 X 버튼 대신 표시 */}
                            <button
                                className="text-black text-lg ml-auto"
                                onClick={() => {
                                    setDeleteReviewId(r.id);
                                    setIsDeleteModalOpen(true);
                                }}
                            >
                                🗑️ {/* 휴지통 이모지 */}
                            </button>
                        </li>
                    ))
                ) : (
                    <p>리뷰가 없습니다.</p>
                )}
            </ul>

            {/* 리뷰 작성 버튼 */}
            <button
                className="fixed bottom-10 right-20 bg-blue-500 text-white p-4 rounded-full shadow-lg"
                onClick={openFormModal} // 모달 열기
            >
                <span className="ml-2">리뷰 작성</span>
            </button>

            {/* 리뷰 작성 모달 */}
            {isFormOpen && <ReviewFormModal onCreateReview={handleCreateReview} />}

            {/* 비밀번호 입력 모달 */}
            {isDeleteModalOpen && (
                <DeleteReviewModal
                    deleteReviewId={deleteReviewId}
                    onClose={() => setIsDeleteModalOpen(false)} // 모달 닫기
                    onSuccess={handleDeleteReviewSuccess}     // 리뷰 삭제 후 성공 처리
                />
            )}
        </div>
    );
}

export default ReviewList;
