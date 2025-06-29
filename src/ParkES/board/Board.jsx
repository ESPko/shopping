import React, { useState } from 'react';
import Pagination from "../../component/Pagination.jsx";
import BoardList from "./BoardList.jsx";
import Footer from "../../JangDJ/Footer.jsx";
import Header from "../../knh/components/Header.jsx";
import { useLocation, useNavigate } from "react-router-dom";

function Board() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 20;

    const location = useLocation();
    const navigate = useNavigate();

    const isBoardPage = location.pathname === "/board";
    const isCommunityPage = location.pathname === "/community";

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleWriteClick = () => {
        navigate('/write');
    };

    return (
        <div>
            <Header isDefaultBlack={true} />

            {/* 메인 컨텐츠 */}
            <div style={{ paddingTop: '120px', paddingLeft: '200px', paddingRight: '200px' }}>
                {/* 상단 바 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        Community
                    </h2>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => navigate("/community")}
                            style={{
                                backgroundColor: isCommunityPage ? "#007bff" : "#e0e0e0",
                                color: isCommunityPage ? "white" : "#333",
                                borderRadius: '20px',
                                padding: '6px 16px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            공지사항
                        </button>

                        <button
                            onClick={() => navigate("/board")}
                            style={{
                                backgroundColor: isBoardPage ? "#1B3C5C" : "#e0e0e0",
                                color: isBoardPage ? "white" : "#333",
                                borderRadius: '20px',
                                padding: '6px 16px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Q&A
                        </button>
                    </div>
                </div>

                {/* 게시판 리스트 */}
                <BoardList />

                {/* WRITE 버튼 (오른쪽 정렬) */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '20px'
                }}>
                    <button
                        onClick={handleWriteClick}
                        style={{
                            backgroundColor: '#1B3C5C',
                            color: 'white',
                            borderRadius: '20px',
                            padding: '6px 16px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        WRITE
                    </button>
                </div>
            </div>

            {/* 페이지네이션 (전체 폭 기준 중앙 정렬) */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px 0'
            }}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            <Footer />
        </div>
    );
}

export default Board;
