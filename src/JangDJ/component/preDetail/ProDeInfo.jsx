import ProReview from "./ProReview.jsx";

function ProDeInfo() {
    return (
        <div>
            <div id="info" className="py-20">
                <h3 className="text-2xl font-bold mb-4">상품 정보</h3>
                <p>여기에 상품 상세 설명, 이미지 등이 들어갑니다.</p>
            </div>
            <ProReview />
            <div id="qna" className="py-20">
                <h3 className="text-2xl font-bold mb-4">Q&A</h3>
                <p>여기에 Q&A 목록이 들어갑니다.</p>
            </div>
        </div>
    );
}

export default ProDeInfo