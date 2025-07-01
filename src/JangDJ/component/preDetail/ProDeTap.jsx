import {useState} from "react";

function ProDeTap() {
    // 활성화 된 탭
    const [activeTab, setActiveTap] = useState("info");

    // 탭 클릭 시 스크롤 이동 함수
    const clickTab = (id) => {
        const mt = document.getElementById(id);
        if (mt) {
            mt.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleClick = (tabId) => {
        setActiveTap(tabId);
        clickTab(tabId);
    };

    return (
        <div className="flex justify-center border-b mt-20 text-xl ">
            <button
                className={`w-64 px-6 py-3  ${activeTab === "info" ? "border-b-2 border-[#00883e] text-black font-bold" : "text-gray-500" }`}
                onClick={() => handleClick("info")}
            >
                상품정보
            </button>
            <button
                className={`w-64 px-6 py-3 ${activeTab === "review" ? "border-b-2 border-[#00883e] text-black font-bold" : "text-gray-500" }`}
                onClick={() => handleClick("review")}
            >
                리뷰
            </button>
            <button
                className={`w-64 px-6 py-3 ${activeTab === "qna" ? "border-b-2 border-[#00883e] text-black font-bold" : "text-gray-500" }`}
                onClick={() => handleClick("qna")}
            >
                Q&A
            </button>
        </div>
    );
}

export default ProDeTap