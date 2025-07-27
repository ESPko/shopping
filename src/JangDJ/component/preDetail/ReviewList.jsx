import { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from 'date-fns';
import useProductReview from "../../store/useProductReview.js";
import ReviewFormModal from "./ReviewFormModal";
import useReviewFormModal from "../../store/useReviewFormModal.js"; // 리뷰 작성 모달 컴포넌트

function ReviewList() {
    const {
        reviews,
        currentPage,
        reviewsPerPage,
        setReviews,
        setCurrentPage,
        photoOnly,
    } = useProductReview();

    const { isFormOpen, openFormModal, closeFormModal } = useReviewFormModal(); // Zustand로 모달 상태

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 비밀번호 입력 모달 상태
    const [deleteReviewId, setDeleteReviewId] = useState(null); // 삭제할 리뷰 ID
    const [password, setPassword] = useState(""); // 비밀번호 상태
    const [error, setError] = useState(""); // 오류 메시지
    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    // 리뷰 목록을 페이지 변경 시 다시 요청하는 useEffect
    useEffect(() => {
        setLoading(true); // 로딩 시작
        axios.get('http://localhost:8080/api/reviews/paged', {
            params: {
                page: currentPage,
                size: reviewsPerPage,
            }
        })
            .then((response) => {
                setReviews(response.data.reviews);  // 백엔드에서 받은 데이터로 상태 업데이트
                setLoading(false); // 로딩 종료
                console.log("받은 리뷰 데이터:", response.data);
            })
            .catch((error) => {
                setLoading(false); // 로딩 종료
                console.error("리뷰를 가져오는 데 실패했습니다.", error);
            });
    }, [currentPage, reviewsPerPage, setReviews]); // currentPage 변경 시마다 리뷰 새로 불러오기

    // 리뷰가 없을 경우 빈 배열로 초기화
    const validReviews = reviews || [];

    // 포토리뷰 필터
    const filter = photoOnly
        ? validReviews.filter((r) => r.images_list && Array.isArray(r.images_list) && r.images_list.length > 0)
        : validReviews;

    // 페이지 계산
    const start = (currentPage - 1) * reviewsPerPage;
    const currentReview = filter.slice(start, start + reviewsPerPage);
    const totalPages = Math.ceil(filter.length / reviewsPerPage);

    // 비밀번호 검증 후 리뷰 삭제
    const handleDeleteReview = async () => {
        if (password.length !== 4) {
            setError("비밀번호는 4자리여야 합니다.");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8080/api/reviews/${deleteReviewId}`, {
                data: { password }
            });

            if (response.status === 200) {
                setReviews(prev => prev.filter(review => review.id !== deleteReviewId)); // 리뷰 삭제 후 상태 업데이트
                setIsDeleteModalOpen(false); // 모달 닫기
                setPassword(""); // 비밀번호 초기화
                setError(""); // 오류 메시지 초기화
                alert("리뷰가 삭제되었습니다.");
            }
        } catch (error) {
            console.error("삭제 오류:", error);
            setError("비밀번호가 맞지 않습니다.");
        }
    };

    // 리뷰 작성 후 리스트에 추가하는 함수
    const handleCreateReview = async (newReview) => {
        try {
            const response = await axios.post('http://localhost:8080/api/reviews', newReview);
            if (response.status === 201) {
                setReviews(prev => [response.data, ...prev]); // 새 리뷰를 가장 앞에 추가

                // 리뷰 작성 후 페이지 번호를 1로 리셋 (원하는 대로 조정 가능)
                setCurrentPage(1);

                alert("리뷰가 작성되었습니다.");
            }
        } catch (error) {
            console.error("리뷰 작성 오류:", error);
            setError("리뷰 작성 중 오류가 발생했습니다.");
        }
    };

    // 페이징 버튼 클릭 시 페이지 변경
    const handlePageChange = (page) => {
        setCurrentPage(page); // 페이지를 변경
    };

    return (
        <div className="mx-16 mobile:mx-4">
            <p className="pl-2 text-xl font-bold pb-4 border-b mobile:text-base mobile:pb-0">리뷰 {filter.length}개</p>

            {/* 로딩 중일 때 */}
            {loading && <p>리뷰를 불러오는 중...</p>}

            <ul>
                {currentReview.length > 0 ? (
                    currentReview.map((r) => (
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

            {/* 페이징 */}
            <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)} // 페이지 변경 시 handlePageChange 사용
                        className={`px-3 py-1 border round ${page === currentPage ? "bg-black text-white" : "text-gray"}`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* 리뷰 작성 버튼 */}
            <button
                className="fixed bottom-10 right-20 bg-blue-500 text-white p-4 rounded-full shadow-lg"
                onClick={openFormModal} // 모달 열기
            >
                <span className="ml-2">리뷰 작성</span>
            </button>

            {/* 리뷰 작성 모달 */}
            {isFormOpen && <ReviewFormModal onCreateReview={handleCreateReview} />} {/* isFormOpen 상태에 따라 모달 열기 */}

            {/* 비밀번호 입력 모달 */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 w-80 rounded-md">
                        <h3 className="text-lg font-semibold mb-4">리뷰 삭제</h3>
                        <p>리뷰를 삭제하려면 비밀번호를 입력하세요.</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="4자리 비밀번호"
                            maxLength="4"
                            className="w-full p-2 mt-4 border border-gray-300 rounded-md"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <button
                            className="w-full mt-4 bg-red-500 text-white p-2 rounded-md"
                            onClick={handleDeleteReview}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReviewList;
