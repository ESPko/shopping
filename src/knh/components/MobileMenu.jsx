import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar.jsx";
import useCartStore from "../Store/useCartStore.jsx";

// 로고 이미지
const logoSrc = 'https://diadorakorea.com/web/upload/image/logo/m_logo1.png?v=1';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { cartItems } = useCartStore();
    const cartCount = cartItems.length;

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleSubMenu = (name) =>
        setOpenSubMenu((prev) => (prev === name ? null : name));

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

    const categories = [
        { name: "Women", hasDropdown: true },
        { name: "Men", hasDropdown: true },
        { name: "Shoes", hasDropdown: true },
        { name: "Sport", hasDropdown: true },
        { name: "Community", hasDropdown: false, link: "/community" },
    ];

    return (
        <>
            {/* 모바일 상단바 */}
            <div className="top-0 left-0 w-full h-[60px] bg-white z-50 flex items-center justify-between px-4 shadow-md desktop:hidden">
                <button onClick={toggleMenu} className={'pr-10'}>
                    <Menu size={28} />
                </button>

                <Link to="/">
                    <img src={logoSrc} alt="logo" className="h-8" />
                </Link>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsSearchOpen((prev) => !prev)}
                        className="w-[20px] relative"
                    >
                        <img src="/src/assets/icon_search.png" alt="search" />
                    </button>
                    <Link to="/cart" className="w-[20px] relative">
                        <img src="/src/assets/icon_cart.png" alt="cart" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#00883E] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/" className="w-[20px]">
                        <img src="/src/assets/icon_mypage.png" alt="mypage" />
                    </Link>
                </div>
            </div>

            {/* 검색창 */}
            {isSearchOpen && (
                <div className="fixed top-[60px] left-0 w-screen h-[50vh] bg-white z-40 p-6 overflow-y-auto">
                    <div className="max-w-xl mx-auto flex items-center space-x-4">
                        <div className="relative w-full max-w-xl">
                            <SearchBar />
                        </div>
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="text-3xl text-gray-500 hover:text-black"
                            aria-label="닫기"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* 사이드 메뉴 */}
            <div
                className={`fixed top-0 left-0 h-full w-[80%] max-w-xs bg-white shadow-lg z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold"> <img src={logoSrc} alt="logo" className="h-8" /></h2>
                    <button onClick={toggleMenu}>
                        <X size={28} />
                    </button>
                </div>

                <nav className="space-y-4">
                    {categories.map((category) =>
                        category.hasDropdown ? (
                            <div key={category.name}>
                                <button
                                    onClick={() => toggleSubMenu(category.name)}
                                    className="w-full text-left font-semibold text-lg text-gray-800"
                                >
                                    {category.name}
                                </button>
                                {openSubMenu === category.name && (
                                    <div className="ml-4 mt-2 space-y-3">
                                        {menuData[category.name]?.map((section) => (
                                            <div key={section.title}>
                                                <p className="text-sm font-bold text-gray-600">{section.title}</p>
                                                <ul className="ml-2 mt-1 space-y-1">
                                                    {section.items.map((item) => (
                                                        <li
                                                            key={item}
                                                            className="text-sm text-gray-500 hover:text-[#00883e] cursor-pointer"
                                                        >
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to={category.link}
                                key={category.name}
                                className="block text-lg font-semibold text-gray-800 hover:text-[#00883e]"
                                onClick={toggleMenu}
                            >
                                {category.name}
                            </Link>
                        )
                    )}
                </nav>
            </div>

            {/* 오버레이 */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-40"
                    onClick={toggleMenu}
                />
            )}
        </>
    );
};

export default MobileMenu;
