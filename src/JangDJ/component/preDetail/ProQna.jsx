import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // useParams 제거 (이미 product가 props로 전달되므로)
import Footer from "../../Footer.jsx";
import Pagination from "../../../component/Pagination.jsx";
import ProQnaList from "./ProQnaList.jsx";

function ProQna({ product }) {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 20;

    // product가 없을 때는 productId를 undefined로 설정
    const productId = product ? product.id : null;

    const navigate = useNavigate();

    if (!productId) {
    }

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleWriteClick = () => {
        // productId가 없으면 이동하지 않음
        if (productId) {
            navigate(`/proqnawrite/${productId}`); // productId를 URL에 전달
        } else {
            alert('상품 ID가 없습니다.');
        }
    };

    return (
        <div>
            {/* 메인 컨텐츠 */}
            <div className={'pl-[200px] pr-[200px] mobile:pl-0 mobile:pr-0'}>
                {/* 상단 바 */}
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <h3 className="text-4xl font-black mb-8 text-center mobile:text-2xl mobile:mt-10">QnA</h3>
                </div>

                {/* 게시판 리스트 */}
                <div className="mx-16 mobile:mx-4">
                    <ProQnaList product={product} /> {/* product 객체 전체 전달 */}
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
