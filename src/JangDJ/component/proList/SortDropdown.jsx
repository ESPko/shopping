import {useEffect, useRef, useState} from "react";
import {FiChevronDown} from "react-icons/fi";

const sortOptions = [
    { label: "최신순", value: "new" },
    { label: "낮은가격순", value: "lowPrice" },
    { label: "높은가격순", value: "highPrice" },
    { label: "별점순", value: "rating" },
    { label: "리뷰많은순", value: "review" },
];

function SortDropdown({ onChange }) {
    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState(sortOptions[0]);
    const dropRef = useRef(null);

    const handleSelect = (option) => {
        setSelect(option);
        onChange(option.value);
        setOpen(false);
    };

    // 외부 영역 클릭 시 드롭다운 닫기
    useEffect(() => {
        function handleOutside(event) {
            if (dropRef.current && !dropRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={dropRef}>
            <button
                onClick={() => setOpen(!open)}
                className="relative w-32 text-sm border px-4 py-1.5 rounded-full hover:bg-gray-100 flex items-center justify-between h-10"
            >
                <span>{select.label}</span>
                <FiChevronDown className="text-sm ml-2 shrink-0" />
            </button>
            {open && (
                <ul className="absolute left-0 mt-2 w-36 bg-white border rounded shadow text-sm z-10">
                    {sortOptions.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SortDropdown