import React, { useEffect, useState } from 'react';
import Header from "../../knh/components/Header.jsx";
import Footer from "../../JangDJ/Footer.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function ProQnaDetail() {
    const navigate = useNavigate();
    const { productId, no } = useParams();  // URL에서 productId와 no를 받아옴

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // productId와 no를 이용해 해당 Q&A를 불러옴
        axios.get(`http://localhost:8080/api/qna/${no}`)
            .then(res => {
                setPost(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [no]);

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await axios.delete(`http://localhost:8080/api/qna/${no}`);
            alert('게시글이 삭제되었습니다.');
            navigate(`/qnalist/${productId}`); // 삭제 후 해당 상품의 Q&A 목록으로 돌아감
        } catch (error) {
            alert('삭제 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    const handleEdit = () => {
        navigate(`/qnaedit/${productId}/${no}`); // 수정 페이지로 이동 (상품 ID와 게시글 ID를 함께 전달)
    };

    const handleList = () => {
        navigate(`/qnalist/${productId}`); // 해당 상품의 Q&A 목록 페이지로 이동
    };

    if (loading) {
        return <div>로딩중...</div>;
    }

    if (!post) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div>
            <Header isDefaultBlack={true} />

            <div className="pt-[120px] px-[40px] max-w-[800px] mx-auto mb-[40px] mobile:pt-10">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
                    Q&A
                </h2>

                {/* 한 줄 정보: 제목 / 작성자 / 작성일 / 조회수 */}
                <div className={'mobile:text-sm'} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 20px',
                    borderBottom: '1px solid #ccc',
                    marginBottom: '20px',
                    fontSize: '1rem'
                }}>
                    <div><strong>제목: </strong>{post.title}</div>
                    <div><strong>작성자: </strong>{post.name}</div>
                    <div><strong>작성일: </strong>{post.date ? post.date.slice(0, 10) : '-'}</div>
                    <div><strong>조회수: </strong>{post.hit}</div>
                </div>

                {/* 본문 내용 - 읽기 전용 텍스트 박스 */}
                <textarea
                    readOnly
                    value={post.content}
                    style={{
                        width: '100%',
                        height: '300px',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        fontSize: '1rem',
                        resize: 'vertical',
                        backgroundColor: '#f9f9f9',
                    }}
                />

                {/* 버튼 영역 */}
                <div className={'mt-[30px] mobile:mt-2'}
                     style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        className={'mobile:text-sm'}
                        type="button"
                        onClick={handleList}
                        style={{
                            border: '1px solid black',
                            borderRadius: '8px',
                            padding: '10px 24px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        목록
                    </button>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            className={'mobile:text-sm'}
                            type="button"
                            onClick={handleDelete}
                            style={{
                                border: '1px solid red',
                                borderRadius: '8px',
                                padding: '10px 24px',
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                fontWeight: '600',
                                color: 'red',
                            }}
                        >
                            삭제
                        </button>

                        <button
                            className={'mobile:text-sm'}
                            type="button"
                            onClick={handleEdit}
                            style={{
                                border: '1px solid black',
                                borderRadius: '8px',
                                padding: '10px 24px',
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                fontWeight: '600',
                            }}
                        >
                            수정
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ProQnaDetail;
