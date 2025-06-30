import { useState, useEffect } from "react";
import '../knh.css';

// 로고 이미지 데이터
const logoImg = {
    White: [
        { image: 'https://diadorakorea.com/web/upload/image/logo/logo_wh.png?v=1' }
    ],
    Black: [
        { image: 'https://diadorakorea.com/web/upload/image/logo/m_logo1.png?v=1' }
    ]
};
// 메뉴 데이터
const menuData = {
    Women: [
        { title: "아우터", items: ["자켓", "베스트", "다운/패딩", "플리스"] },
        { title: "상의", items: ["반팔티셔츠", "긴팔티셔츠", "슬리브리스", "후드/맨투맨", "니트", "원피스"] },
        { title: "하의", items: ["롱팬츠", "숏팬츠", "스커트/레깅스"] },
        { title: "기타", items: ["Shoes", "Acc.", "Sports"] },
    ],
    Men: [
        { title: "아우터", items: ["자켓", "베스트", "다운/패딩", "플리스"] },
        { title: "상의", items: ["반팔티셔츠", "긴팔티셔츠", "후드/맨투맨", "니트", "셔츠"] },
        { title: "하의", items: ["롱팬츠", "숏팬츠", "조거팬츠"] },
        { title: "기타", items: ["Shoes", "Acc.", "Sports"] },
    ],
    Shoes: [
        { title: "스니커즈", items: ["런닝화", "워킹화", "캐주얼화", "샌들"] },
        { title: "스포츠화", items: ["테니스화", "축구화", "농구화", "트레이닝화"] },
    ],
    Sport: [
        { title: "스포츠", items: ["런닝", "테니스", "사이클", "아웃도어", "트레이닝"] },
        { title: "용품", items: ["가방", "양말", "헤드웨어", "기타 액세서리"] },
    ],
};

// 검색어 키워드
const searchKeywords = ["발레토", "그랜드 슬램", "러닝", "테니스"];

// 카테고리
const categories = [
    { name: "Women", hasDropdown: true },
    { name: "Men", hasDropdown: true },
    { name: "Shoes", hasDropdown: true },
    { name: "Sport", hasDropdown: true },
    { name: "Community", hasDropdown: false, link: "/community" },
];

const Header = ({ isDefaultBlack = false }) => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const hoverActive = !isDefaultBlack && isHovered;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [ScrollY, setScrollY] = useState(0);

    // 동적으로 isDefaultBlack 스타일 강제 적용 상태
    const [forceBlackStyle, setForceBlackStyle] = useState(false);

    // 스크롤 이벤트
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY === 0) {
                setForceBlackStyle(false);
                setShowHeader(true);
                return;
            }

            if (currentScrollY > ScrollY && currentScrollY > 100) {
                setShowHeader(false);
                setForceBlackStyle(false);
            } else {
                setShowHeader(true);
                setForceBlackStyle(true);
            }

            setScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [ScrollY]);

    // 최종 검정 스타일 적용 여부
    const computedIsDefaultBlack = isDefaultBlack || forceBlackStyle;


    const logoSrc = computedIsDefaultBlack || hoverActive
        ? logoImg.Black[0].image
        : logoImg.White[0].image;

    // 아이콘 이미지
    const searchIconSrc = computedIsDefaultBlack || hoverActive
        ? "/src/assets/icon_search.png"
        : "/src/assets/icon_search_wh.png";
    const cartIconSrc = computedIsDefaultBlack || hoverActive
        ? "/src/assets/icon_cart.png"
        : "/src/assets/icon_cart_wh.png";
    const mypageIconSrc = computedIsDefaultBlack || hoverActive
        ? "/src/assets/icon_mypage.png"
        : "/src/assets/icon_mypage_wh.png";

    const textColorClass = computedIsDefaultBlack
        ? "text-black"
        : "text-white group-hover:text-black";
    const borderStyle = computedIsDefaultBlack
        ? "border-b border-black"
        : "border-b border-transparent group-hover:border-black transition-colors";

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setActiveMenu(null);
            }}
        >
            <header
                className={`z-50 w-screen h-[100px] flex items-center justify-between fixed px-8
                    ${borderStyle}
                    ${hoverActive || computedIsDefaultBlack ? 'bg-white' : 'bg-transparent'}
                    transition-all duration-300
                    ${showHeader ? 'top-0' : '-top-[100px]'}`}
            >
                <h1>
                    <img src={logoSrc} alt="Logo" className="w-32 h-auto ml-6 transition" />
                </h1>

                <nav className="flex space-x-11">
                    {categories.map((category) =>
                        category.hasDropdown ? (
                            <div
                                key={category.name}
                                onMouseEnter={() => setActiveMenu(category.name)}
                                className={`text-xl cursor-pointer transition-colors hover:text-[#00883e] 
                                    ${textColorClass} 
                                    ${category.name === "Community" ? "font-normal" : "font-bold"}`}
                            >
                                {category.name}
                            </div>
                        ) : (
                            <a
                                key={category.name}
                                href={category.link}
                                className={`text-xl cursor-pointer transition-colors hover:text-[#00883e] 
                                    ${textColorClass} 
                                    ${category.name === "Community" ? "font-normal" : "font-bold"}`}
                            >
                                {category.name}
                            </a>
                        )
                    )}
                </nav>

                <div className="flex justify-between">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsSearchOpen((prev) => !prev);
                        }}
                        className="w-[30px] mr-7 mt-0.5 relative"
                    >
                        <img src={searchIconSrc} alt="search" className="transition" />
                    </a>
                    {isSearchOpen && (
                        <div className="fixed top-[100px] left-0 w-screen h-[50vh] bg-white z-50 p-8 overflow-y-auto">
                            <div className="max-w-xl mx-auto flex items-center space-x-4">
                                <div className="relative w-full max-w-xl">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full border border-gray-300 rounded px-4 py-3 text-lg pr-10"
                                    />
                                    <img
                                        src="/src/assets/icon_search.png"
                                        alt="search"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                                    />
                                </div>
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="text-3xl text-gray-500 hover:text-black flex-shrink-0"
                                    aria-label="닫기"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="flex justify-center gap-3 mt-8">
                                {searchKeywords.map((keyword, index) => (
                                    <button key={index} className="search-tag">
                                        {keyword}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <a href="/" className="w-[30px] mr-7">
                        <img src={cartIconSrc} alt="cart" className="transition" />
                    </a>
                    <a href="/" className="w-[30px] mr-6">
                        <img src={mypageIconSrc} alt="mypage" className="transition" />
                    </a>
                </div>
            </header>

            {/* 드롭다운 메뉴 */}
            {activeMenu && menuData[activeMenu] && (
                <div className="fixed top-[100px] left-0 w-screen h-[50vh] bg-white z-50 p-8 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-8 mt-2">
                        {menuData[activeMenu]?.map((section) => (
                            <div key={section.title}>
                                <h3 className="font-bold mb-3">{section.title}</h3>
                                <ul className="space-y-1">
                                    {section.items.map((item) => (
                                        <li
                                            key={item}
                                            className="hover:underline cursor-pointer hover:text-[#00883e] py-1 text-gray-500"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
