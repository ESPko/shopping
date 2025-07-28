import { useState } from "react";
import axios from "axios";

function DeleteReviewModal({ deleteReviewId, onClose, onSuccess }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // 리뷰 삭제 처리 함수
    const handleDeleteReview = async () => {
        if (password.length !== 4) {
            setError("비밀번호는 4자리여야 합니다.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.delete(`http://localhost:8080/api/reviews/${deleteReviewId}`, {
                data: { password },
            });

            if (response.status === 200) {
                onSuccess(deleteReviewId); // 삭제 성공 후 부모 컴포넌트에게 상태 업데이트 요청
                onClose(); // 모달 닫기
            } else {
                setError("비밀번호가 맞지 않습니다.");
            }
        } catch (error) {
            console.error("삭제 오류:", error);
            setError("서버에서 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
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
                    disabled={loading} // 로딩 중 버튼 비활성화
                >
                    {loading ? "삭제 중..." : "삭제"}
                </button>
                <button
                    className="w-full mt-2 bg-gray-300 text-black p-2 rounded-md"
                    onClick={onClose} // 모달 닫기
                >
                    취소
                </button>
            </div>
        </div>
    );
}

export default DeleteReviewModal;
