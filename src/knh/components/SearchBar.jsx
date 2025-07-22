// SearchBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ initialKeyword = "" }) {
    // 검색어 키워드
    const searchKeywords = ["발레토", "그랜드 슬램", "러닝", "테니스"];

    const [keyword, setKeyword] = useState(initialKeyword);
    const nav = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim() !== "") {
            nav(`/search?q=${encodeURIComponent(keyword)}`);
        }
    };

    return (
        <>
            <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto mt-5">
                <input
                    type="text"
                    placeholder="Search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-3 text-lg pr-10 focus:outline-none focus:ring-0"
                />
                <button type="submit">
                    <img
                        src="/src/assets/icon_search.png"
                        alt="search"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    />
                </button>
            </form>
            <div className="flex justify-center gap-3 mt-8 mobile:text-xs mobile:mt-2 mobile:gap-2">
                {searchKeywords.map((keyword, index) => (
                    <button key={index} className="bg-[#1B3C5C] px-[25px] py-[9px] rounded-full text-white mobile:px-4 mobile:py-2">
                        {keyword}
                    </button>
                ))}
            </div>
        </>

    );
}

export default SearchBar;
