import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProQnaSecret = () => {
    const navigate = useNavigate();
    const { id, productId } = useParams(); // 게시글 번호(id)와 상품 번호(productId)
    const [password, setPassword] = useState('');

    const handleConfirm = () => {
        // 이 부분에 비밀번호 검증 로직을 추가해야 합니다.
        // 예: 비밀번호가 맞으면 특정 상품의 Q&A 상세 페이지로 이동
        navigate(`/product/${productId}/qnadetail/${id}`);
    };

    const handleList = () => {
        // 비밀번호를 입력하지 않은 경우, 상품에 대한 Q&A 목록으로 이동
        navigate(`/product/${productId}/qna`);
    };

    return (
        <div className={'my-[100px] mx-auto mobile:my-10'} style={{ maxWidth: '500px', padding: '20px'}}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
                Q&A
            </h2>

            <hr style={{ marginBottom: '20px' }} />

            <p className={'mobile:text-base'} style={{ textAlign: 'center', fontSize: '18px', marginBottom: '10px' }}>
                게시글 보기
            </p>
            <p className={'mobile:text-sm'} style={{ textAlign: 'center', color: '#666', marginBottom: '6px' }}>
                이 글은 비밀글입니다. 비밀번호를 입력하여 주세요.
            </p>
            <p className={'mobile:text-sm'} style={{ textAlign: 'center', color: '#999', marginBottom: '20px' }}>
                관리자는 확인 버튼만 누르시면 됩니다.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
                <label style={{ width: '80px', fontWeight: '600' }}>비밀번호</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호 입력"
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '6px',
                        backgroundColor: '#f0f0f0',
                        border: 'none',
                        fontSize: '1rem',
                        outline: 'none',
                    }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button
                    className={'mobile:text-sm'}
                    onClick={handleList}
                    style={{
                        border: '1px solid black',
                        backgroundColor: 'transparent',
                        padding: '10px 24px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                    }}
                >
                    목록
                </button>

                <button
                    className={'mobile:text-sm'}
                    onClick={handleConfirm}
                    style={{
                        border: '1px solid black',
                        backgroundColor: 'transparent',
                        padding: '10px 24px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                    }}
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default ProQnaSecret;
