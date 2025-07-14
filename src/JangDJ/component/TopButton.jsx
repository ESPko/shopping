import {useEffect, useState} from "react";
import {FaArrowUp} from "react-icons/fa";

function TopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // 스크롤 감지
    useEffect(() => {
        const buttonVi = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", buttonVi);
        return () => window.removeEventListener("scroll", buttonVi);
    }, []);

    const moveTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        isVisible && (
            <button
                onClick={moveTop}
                className="fixed bottom-10 right-10 z-50 bg-gray-400 text-white p-3 rounded-full shadow-lg hover:bg-gray-500 transition"
                aria-label="맨 위로 이동"
            >
                <FaArrowUp />
            </button>
        )
    );
}

export default TopButton