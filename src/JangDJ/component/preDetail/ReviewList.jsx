import useProductReview from "../../useProductReview.js";
import {useEffect} from "react";
import usePhotoReviewModal from "../../usePhotoReviewModal.js";

function ReviewList() {
    const {
        reviews,
        currentPage,
        reviewsPerPage,
        setReviews,
        setCurrentPage,
        photoOnly,
    } = useProductReview();

    // 포토리뷰 사진 클릭 모달
    const { openModal } = usePhotoReviewModal();

    // 임시 더미 데이터
    useEffect(() => {
        setReviews([
            {
                id: 1,
                user: "4010327***",
                content: "디아도라는 무조건 사랑입니다~👍",
                date: "2025-06-16",
                rating: 5,
                images: ["/images/diadory_review1.jpg", "/images/diadory_review2.jpg", "/images/diadora_review3.jpg"],
            },
            {
                id: 2,
                user: "927815***",
                content: "입어보니 만족했어요 디자인도 예뻐요.",
                date: "2025-06-14",
                rating: 4,
                images: ["/images/diadora_review4.jpg", ]
            },
            {
                id: 3,
                user: "9278156***",
                content: "너무 예뻐요",
                date: "2025-06-18",
                rating: 5,
                images: ["/images/diadora_review5.jpg", ]
            },
            {
                id: 4,
                user: "934815***",
                content: "다른색상도 사고 싶어요",
                date: "2025-06-14",
                rating: 4,
                images: []
            },
        ]);
    }, []);

    // 포토리뷰 필터
    const filter = photoOnly
        ? reviews.filter((r) => r.images && r.images.length > 0)
        : reviews;

    // 페이지 계산
    const start = (currentPage - 1) * reviewsPerPage;
    const currentReview = filter.slice(start, start + reviewsPerPage);
    const totalPages = Math.ceil(filter.length / reviewsPerPage);

    return (
        <>
            <div className="mx-16">
                <p className="pl-2 text-xl font-bold pb-4 border-b">리뷰 {filter.length}개</p>

                <ul>
                    {currentReview.map((r) => (
                        <li key={r.id} className="border-b flex gap-12 py-8">
                            <div className="felx items-center gap-2 mb-2 text-[#00883e]">
                                <p className="text-lg mb-2">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
                                <p className="text-sm text-gray-400">{r.user}</p>
                                <p className="text-sm text-gray-400 mb-1">{r.date}</p>
                            </div>

                            <div>
                                <p className="mb-4">{r.content}</p>
                                <div className="gap-2 flex">
                                    {r.images.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            // onClick={() => openModal({src, review: r })}
                                            className="w-20 h-20 object-cover border" />
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

            {/*    페이징*/}
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 border round ${page === currentPage ? "bg-black text-white" : "text-gray" }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ReviewList