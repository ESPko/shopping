import React, { useState } from 'react';

import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../knh/components/Header.jsx";
import QnaList from "../../../ParkES/Qna/QnaList.jsx";

import Footer from "../../Footer.jsx";
import Pagination from "../../../component/Pagination.jsx";

function ProQna() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 20;

    // const location = useLocation();
    const navigate = useNavigate();

    // const isBoardPage = location.pathname === "/qna";
    // const isCommunityPage = location.pathname === "/community";

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleWriteClick = () => {
        navigate('/qnawrite');
    };

    return (
        <div>
            <Header isDefaultBlack={true} />

            {/* 메인 컨텐츠 */}
            <div style={{ paddingLeft: '200px', paddingRight: '200px' }}>

                {/* 상단 바 */}
                <div style={{marginBottom: '20px', textAlign: 'center'}}>
                    <h3 className="text-4xl font-black mb-8 text-center">QnA</h3>
                </div>
                {/* 게시판 리스트 */}
                <div className="mx-16">
                    <QnaList />
                </div>


                {/* WRITE 버튼 (오른쪽 정렬) */}
                <div className="mx-16" style={{
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

export default ProQna;
