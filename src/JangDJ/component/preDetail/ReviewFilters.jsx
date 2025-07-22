import useProductReview from "../../useProductReview.js";

function ReviewFilters() {
    const {
        selectedSort,
        setSelectedSort,
        photoOnly,
        clickPhotoOnly,
    } = useProductReview();
    return (
        <>
            <div className="flex items-center justify-between mb-4 mx-16 mobile:mx-4">
                <div>
                    <label className="inline-flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={photoOnly}
                            onChange={clickPhotoOnly}
                        />
                        <span className={'mobile:text-sm'}>포토/영상 리뷰 모아보기</span>
                    </label>
                </div>
                <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="border px-3 py-2 rounded mobile:text-sm mobile:px-1"
                >
                    <option value="latest">최신순</option>
                    <option value="ratingHigh">별점 높은순</option>
                    <option value="ratingLow">별점 낮은순</option>
                </select>
            </div>
        </>
    );
}

export default ReviewFilters