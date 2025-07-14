import ProReview from "./ProReview.jsx";
import ProQna from "./ProQna.jsx";
import ProDeExpla from "./ProDeExpla.jsx";

function ProDeInfo() {
    return (
        <div>
            <div id="info" className="py-20">
                <ProDeExpla />
            </div>
            <div id="review">
                <ProReview />
            </div>
            <div id="qna" className="pb-20">
                <ProQna />
            </div>
        </div>
    );
}

export default ProDeInfo