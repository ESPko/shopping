import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store/UserAuthStore.js";
import axios from "axios";
import MobileMenu from "./MobileMenu.jsx";


const logoImg = {
    White: [{ image: 'https://diadorakorea.com/web/upload/image/logo/logo_wh.png?v=1' }],
    Black: [{ image: 'https://diadorakorea.com/web/upload/image/logo/m_logo1.png?v=1' }],
};

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

const Header = ({ isDefaultBlack = false }) => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [forceBlackStyle, setForceBlackStyle] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [ScrollY, setScrollY] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();

    const { isLoggedIn, setIsLoggedIn, setUser } = useAuthStore();

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

    const hoverActive = !isDefaultBlack && isHovered;
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

    const cartCount = 0;

    const handleMenuItemClick = (categoryName) => {
        navigate(`/list?category=${encodeURIComponent(categoryName)}`);
        setActiveMenu(null);
    };

    const handleCommunityClick = (e) => {
        e.preventDefault();
        navigate("/community");
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate("/");
    };

    const toggleSearch = (e) => {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
    };

    const handleMypageClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:8080/api/auth/me", {
                withCredentials: true,
            });
            setUser(res.data);
            setIsLoggedIn(true);
            navigate("/mypage");
        } catch (err) {
            setUser(null);
            setIsLoggedIn(false);
            alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
            navigate("/auth");
        }
    };

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setActiveMenu(null);
            }}
        >
            <div className="mobile:block tablet:block hidden">
                <MobileMenu />
            </div>
            <header
                className={`hidden desktop:flex z-50 w-screen h-[100px] items-center justify-between fixed px-8
                ${borderStyle}
                ${hoverActive || computedIsDefaultBlack ? 'bg-white' : 'bg-transparent'}
                transition-all duration-300
                ${showHeader ? 'top-0' : '-top-[100px]'}`}
            >
                <a href="/" onClick={handleLogoClick}>
                    <h1>
                        <img src={logoSrc} alt="Logo" className="w-32 h-auto ml-6 transition" />
                    </h1>
                </a>

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
                                onClick={handleCommunityClick}
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
                    <a href="#" onClick={toggleSearch} className="w-[30px] mr-7 mt-0.5 relative">
                        <img src={searchIconSrc} alt="search" className="transition" />
                    </a>
                    {isSearchOpen && (
                        <div className="fixed top-[100px] left-0 w-screen h-[50vh] bg-white z-50 p-8 overflow-y-auto">
                            <div className="max-w-xl mx-auto flex items-center space-x-4">
                                <input type="text" placeholder="검색..." className="border p-2 w-full" />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="text-3xl text-gray-500 hover:text-black flex-shrink-0 pb-20"
                                    aria-label="닫기"
                                >
                                    &times;
                                </button>
                            </div>

                        </div>
                    )}
                    <a href="/cart" className="relative w-[30px] mr-7" onClick={(e) => { e.preventDefault(); navigate('/cart'); }}>
                        <img src={cartIconSrc} alt="cart" className="transition" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#00883E] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </a>
                    <a href="/#" className="w-[30px] mr-6" onClick={handleMypageClick}>
                        <img src={mypageIconSrc} alt="mypage" className="transition" />
                    </a>
                </div>
            </header>

            {/* 드롭다운 메뉴 */}
            {activeMenu && menuData[activeMenu] && (
                <div className="fixed top-[100px] left-0 w-screen h-[50vh] bg-white z-50 p-8 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-8 mt-2">
                        {menuData[activeMenu].map((section) => (
                            <div key={section.title}>
                                <h3 className="font-bold mb-3">{section.title}</h3>
                                <ul className="space-y-1">
                                    {section.items.map((item) => (
                                        <li
                                            key={item}
                                            className="hover:underline cursor-pointer hover:text-[#00883e] py-1 text-gray-500"
                                            onClick={() => handleMenuItemClick(item)}
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

