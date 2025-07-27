import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewSummary() {
    const [reviewSummary, setReviewSummary] = useState({
        averageRating: '0.0',
        ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },  // 기본값 설정
        totalCount: 0
    });

    // 리뷰 데이터 요청
    useEffect(() => {
        axios.get('http://localhost:8080/api/reviews')
            .then(res => {
                if (res.data) {
                    // 리뷰 데이터를 기반으로 summary 값 계산
                    const reviews = res.data;
                    const totalCount = reviews.length;

                    // 별점 카운트 객체 초기화
                    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
                    let totalRating = 0;

                    // 리뷰 데이터 순회하여 카운트 및 평균 계산
                    reviews.forEach(review => {
                        const rating = review.rating;
                        if (ratingCounts[rating] !== undefined) {
                            ratingCounts[rating]++;
                        }
                        totalRating += rating;
                    });

                    // 평균 별점 계산
                    const averageRating = totalCount > 0 ? (totalRating / totalCount).toFixed(1) : '0.0';

                    setReviewSummary({
                        averageRating,
                        ratingCounts,
                        totalCount
                    });
                }
            })
            .catch(err => {
                console.error("리뷰 데이터를 가져오는 데 실패했습니다:", err);
                setReviewSummary({
                    averageRating: '0.0',
                    ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
                    totalCount: 0
                });
            });
    }, []);

    const { averageRating, ratingCounts, totalCount } = reviewSummary;

    // 데이터가 없을 경우 기본 메시지 표시
    if (totalCount === 0) {
        return <p>현재 리뷰가 없습니다.</p>;
    }

    // ratingCounts 객체에 값이 없을 경우 기본값 설정
    const safeRatingCounts = ratingCounts || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    return (
        <div className="border rounded p-6 mb-8 mx-16 mobile:mx-0">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
                {/* 왼쪽: 평균 별점 */}
                <div className="md:w-1/3 text-center border-r mobile:border-none">
                    <p className="mb-4">별점</p>
                    <div className="text-4xl font-bold mb-4 mobile:text-2xl">⭐ {averageRating}</div>
                    <p className="text-gray-400 text-sm text-center">
                        <span className="text-black text-lg text-center">{totalCount}</span> 개의 리뷰가 있습니다.
                    </p>
                </div>

                {/* 오른쪽: 별점 그래프 */}
                <div className="md:w-2/3 space-y-2 py-4">
                    {[5, 4, 3, 2, 1].map((score) => {
                        const count = safeRatingCounts[score];  // 값이 없으면 기본값 0
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

export default ReviewSummary;
