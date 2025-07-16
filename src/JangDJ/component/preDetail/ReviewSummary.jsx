import useProductReview from "../../store/useProductReview.js";
import {useMemo} from "react";

function ReviewSummary() {

    const { reviews } = useProductReview();

    const totalCount = reviews.length;

    const { averageRating, ratingCounts } = useMemo(() => {
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let sum = 0;

        reviews.forEach((r) => {
            const score = r.rating;
            if (counts[score] !== undefined) {
                counts[score]++;
                sum += score;
            }
        });
        const avg = totalCount > 0 ? (sum / totalCount).toFixed(1) : "0.0";

        return { averageRating: avg, ratingCounts: counts };
    }, [reviews]);

    return (
        <div className="border rounded p-6 mb-8 mx-16">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
                {/* 왼쪽: 평균 별점 */}
                <div className="md:w-1/3 text-center border-r">
                    <p className="mb-4">별점</p>
                    <div className="text-4xl font-bold mb-4">⭐ {averageRating}</div>
                    <p className="text-gray-400 text-sm text-center"><span className="text-black text-lg text-center">{totalCount}</span> 개의 리뷰가 있습니다.</p>
                </div>

                {/* 오른쪽: 별점 그래프 */}
                <div className="md:w-2/3 space-y-2 py-4">
                    {[5, 4, 3, 2, 1].map((score) => {
                        const count = ratingCounts[score];
                        const percentage = totalCount ? (count / totalCount) * 100 : 0;

                        return (
                            <div key={score} className="flex items-center gap-2">
                                <span className="w-6 text-sm">{score}</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                                    <div
                                        className="bg-black h-2 absolute top-0 left-0 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <span className="w-6 text-sm text-right text-gray-600">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ReviewSummary