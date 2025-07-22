import ReviewSummary from "./ReviewSummary.jsx";
import ReviewPhotos from "./ReviewPhotos.jsx";
import ReviewFilters from "./ReviewFilters.jsx";
import ReviewList from "./ReviewList.jsx";
import ProReviewModal from "./ProReviewModal.jsx";


function ProReview() {
    return (
        <div id="review" className="py-20 scroll-mt-28 max-w-5xl mx-auto px-4 mobile:py-0">
            <h3 className="text-4xl font-black mb-8 text-center mobile:text-2xl">Review</h3>
            <ReviewSummary />
            <ReviewPhotos />
            <ReviewFilters />
            <ReviewList />
            <ProReviewModal />
        </div>
    );
}

export default ProReview