import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../component/Pagination.jsx";
import CommunityList from "./CommunityList.jsx";
import Footer from "../../JangDJ/Footer.jsx";
import Header from "../../knh/components/Header.jsx";

function Community() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 20;

    const location = useLocation();
    const navigate = useNavigate();

    const isCommunityPage = location.pathname === "/community";
    const isBoardPage = location.pathname === "/board";

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <Header isDefaultBlack={true} />
            <div style={{ paddingTop: "120px", paddingLeft: "200px", paddingRight: "200px" }}>
                {/* 상단 바 */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    {/* 왼쪽 텍스트 */}
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Community</h2>

                    {/* 오른쪽 알약 버튼들 */}
                    <div style={{ display: "flex", gap: "10px" }}>
                        {/* 공지사항 버튼 (Community 페이지로 이동) */}
                        <button
                            onClick={() => navigate("/community")}
                            style={{
                                backgroundColor: isCommunityPage ? "#1B3C5C" : "#e0e0e0",
                                color: isCommunityPage ? "white" : "#333",
                                borderRadius: "20px",
                                padding: "6px 16px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "600",
                            }}
                        >
                            공지사항
                        </button>

                        {/* Q&A 버튼 (Qna 페이지로 이동) */}
                        <button
                            onClick={() => navigate("/board")}
                            style={{
                                backgroundColor: isBoardPage ? "#1B3C5C" : "#e0e0e0",
                                color: isBoardPage ? "white" : "#333",
                                borderRadius: "20px",
                                padding: "6px 16px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "600",
                            }}
                        >
                            Q&A
                        </button>
                    </div>
                </div>

                {/* 게시판 리스트 */}
                <CommunityList />
            </div>

            {/* 페이지네이션 중앙 정렬 (보드페이지도 비슷한 구조이므로 동일하게) */}
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>

            <Footer />
        </div>
    );
}

export default Community;
