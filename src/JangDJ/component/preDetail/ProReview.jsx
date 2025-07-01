import ReviewSummary from "./ReviewSummary.jsx";
import ReviewPhotos from "./ReviewPhotos.jsx";
import ReviewFilters from "./ReviewFilters.jsx";
import ReviewList from "./ReviewList.jsx";


function ProReview() {
    return (
        <div id="review" className="py-20 scroll-mt-28 max-w-5xl mx-auto px-4">
            <h3 className="text-2xl font-bold mb-8 text-center">Review</h3>
            <ReviewSummary />
            <ReviewPhotos />
            <ReviewFilters />
            <ReviewList />
        </div>
    );
}

export default ProReview