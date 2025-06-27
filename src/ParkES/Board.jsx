import React, { useState } from 'react';
import Pagination from "../component/Pagenation.jsx";
import BoardList from "./BoardList.jsx";
import Footer from "../JangDJ/Footer.jsx";
import Header from "../knh/components/Header.jsx";

function Board() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 20;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <Header isDefaultBlack={true} />
            <div style={{ paddingTop: '120px', paddingLeft: '40px', paddingRight: '40px' }}>
                {/* 상단 바 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    {/* 왼쪽 텍스트 */}
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        Community
                    </h2>

                    {/* 오른쪽 알약 버튼들 */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {/* 회색 알약 버튼 */}
                        <button style={{
                            backgroundColor: '#e0e0e0',
                            color: '#333',
                            borderRadius: '20px',
                            padding: '6px 16px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}>
                            공지사항
                        </button>

                        {/* 파란 알약 버튼 */}
                        <button style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '20px',
                            padding: '6px 16px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}>
                            Q&A
                        </button>
                    </div>
                </div>

                {/* 게시판 리스트 */}
                <BoardList />
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <Footer/>
        </div>
    );
}

export default Board;
