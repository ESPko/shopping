const colors = [
    { color: "bg-red-600", label: "레드" },
    { color: "bg-yellow-400", label: "옐로우" },
    { color: "bg-pink-300", label: "핑크" },
    { color: "bg-amber-400", label: "카멜" },
    { color: "bg-amber-100", label: "파스텔" },
    { color: "bg-green-500", label: "그린" },
    { color: "bg-blue-600", label: "블루" },
    { color: "bg-purple-500", label: "퍼플" },
    { color: "bg-red-900", label: "브라운" },
    { color: "bg-indigo-800", label: "네이비" },
    { color: "bg-white border", label: "화이트" },
    { color: "bg-black", label: "블랙" },
];

function FilterColor({ selected = [], onChange }) {

    // 컬러 선택 시 선택, 해제
    const colorButton =  (label) => {
        if (selected.includes(label)) {
            onChange(selected.filter((c) => c !== label));  // 해제
        }
        else {
            onChange([...selected, label]);     // 선택
        }
    };
    return (
        <div className="mb-6">
            <h3 className="font-semibold mb-2">컬러</h3>
            <div className="grid grid-cols-6 gap-3 px-6 pt-2">
                {colors.map((c, idx) => {
                    const isSelected = selected.includes(c.label);

                    return (
                        <button
                            key={idx}
                            onClick={() => colorButton(c.label)}
                            className="flex flex-col items-center focus:outline-none"
                        >
                            <div
                                className={`rounded-full w-6 h-6 transition-all
                                    ${c.color}
                                    ${isSelected
                                        ? "p-[2px] border-2 border-black"
                                        : "border border-gray-300"
                                    }   
                                `}
                            />
                            <span className="text-sm mt-1">{c.label}</span>
                        </button>
                    );
                })}
            </div>

        </div>
    );
}

export default FilterColor