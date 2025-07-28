import { useState } from "react"; // useState 추가
import { FaTimes } from "react-icons/fa";
import useReviewFormModal from "../../store/useReviewFormModal"; // Zustand로 상태 관리 불러오기
import axios from "axios";

function ReviewFormModal({ onCreateReview }) { // 부모 컴포넌트로부터 onCreateReview를 받아옵니다.
    const { closeFormModal } = useReviewFormModal(); // 모달 상태 관리
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");
    const [name, setName] = useState(""); // 이름 상태 추가
    const [password, setPassword] = useState(""); // 비밀번호 상태 추가

    // 별점 선택 처리
    const handleRatingChange = (e) => {
        setRating(Number(e.target.value));
    };

    // 리뷰 내용 입력 처리
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // 이름 입력 처리
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    // 비밀번호 입력 처리
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // 리뷰 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 필수 입력 항목 확인
        if (!name) {
            alert("이름을 입력해주세요.");
            return;
        }

        if (!password || password.length !== 4) {
            alert("비밀번호는 4자리로 입력해주세요.");
            return;
        }

        try {
            // 서버에 새로운 리뷰를 제출
            const response = await axios.post("http://localhost:8080/api/reviews", {
                rating,
                content,
                name,
                password,
            });

            // 서버 응답 확인
            if (response.data) {
                alert("리뷰가 제출되었습니다!");

                // 부모 컴포넌트로 리뷰 데이터를 전달하고 상태 갱신을 맡깁니다.
                onCreateReview(response.data); // 리뷰 추가

                // 모달 닫기
                closeFormModal();  // 모달을 닫고 상태도 갱신

                // 제출 후 UI가 갱신되도록 상태 초기화
                setRating(0);
                setContent("");
                setName("");
                setPassword(""); // 모달 상태 초기화
            } else {
                alert("리뷰 제출에 실패했습니다. 서버에서 오류가 발생했습니다.");
            }
        } catch (error) {
            alert("리뷰 제출에 실패했습니다.");
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 w-full max-w-3xl relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    onClick={closeFormModal}
                >
                    <FaTimes size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-4">리뷰 작성</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 이름 입력 */}
                    <div>
                        <label className="block text-sm font-medium">이름</label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="이름을 입력하세요"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* 비밀번호 입력 */}
                    <div>
                        <label className="block text-sm font-medium">비밀번호 (4자리)</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="4자리 비밀번호"
                            maxLength="4"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* 별점 선택 */}
                    <div>
                        <label className="block text-sm font-medium">별점</label>
                        <div className="flex gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <label key={star}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={star}
                                        checked={rating === star}
                                        onChange={handleRatingChange}
                                        className="hidden"
                                    />
                                    <span className={`text-${star <= rating ? "yellow" : "gray"}-500`}>
                                        ★
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 리뷰 내용 입력 */}
                    <div>
                        <label className="block text-sm font-medium">리뷰 내용</label>
                        <textarea
                            value={content}
                            onChange={handleContentChange}
                            rows="5"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            제출하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReviewFormModal;
