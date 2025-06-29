import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BoardSecret = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // 게시글 번호
    const [password, setPassword] = useState('');

    const handleConfirm = () => {
        // 이 부분에 비밀번호 검증 로직이 들어갈 수 있음
        // 비밀번호 없이도 관리자면 바로 navigate 가능
        navigate(`/boarddetail/${id}`);
    };

    const handleList = () => {
        navigate('/board');
    };

    return (
        <div style={{ maxWidth: '500px', margin: '100px auto', padding: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
                Q&A
            </h2>

            <hr style={{ marginBottom: '20px' }} />

            <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '10px' }}>
                게시글 보기
            </p>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '6px' }}>
                이 글은 비밀글입니다. 비밀번호를 입력하여 주세요.
            </p>
            <p style={{ textAlign: 'center', color: '#999', marginBottom: '20px' }}>
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

export default BoardSecret;
