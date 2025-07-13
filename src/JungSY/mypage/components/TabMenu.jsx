import { NavLink } from "react-router-dom";

const tabs = [
    { label: "홈", path: "/mypage" },
    { label: "주문조회", path: "/mypage/orders" },
    { label: "활동정보", path: "/mypage/activity" },
    { label: "혜택정보", path: "/mypage/mybenefit" },
    { label: "회원정보", path: "/mypage/myinfo" },
];

function TabMenu() {
    return (
        <div className="flex justify-between items-center mt-8 mb-10">
            <h2 className="text-3xl font-bold">My page</h2>
            <nav className="flex flex-wrap gap-2">
                {tabs.map(({ label, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end
                        className={({ isActive }) =>
                            `px-4 py-1.5 text-sm font-semibold rounded-full border ${
                                isActive
                                    ? "bg-[#1B3C5C] text-white"
                                    : "bg-white text-[#1B3C5C] border-[#1B3C5C]"
                            }`
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
export default TabMenu;