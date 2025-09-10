import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProQnaSecret = () => {
    const navigate = useNavigate();
    const { id, productId } = useParams(); // 게시글 번호(id)와 상품 번호(productId)
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        if (!password) {
            setErrorMsg('비밀번호를 입력해주세요.');
            return;
        }

        setLoading(true);
        setErrorMsg('');

        try {
            // 서버에 비밀번호 검증 요청
            const res = await axios.post(`http://localhost:8080/api/productqna/${id}/check-password`, { password });

            if (res.data.valid) {
                navigate(`/product/${productId}/qnadetail/${id}`);
            } else {
                setErrorMsg('비밀번호가 틀렸습니다.');
            }
        } catch (err) {
            setErrorMsg('비밀번호 확인 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleList = () => {
        navigate(-1);
    };

    return (
        <div className={'my-[100px] mx-auto mobile:my-10'} style={{ maxWidth: '500px', padding: '20px' }}>
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <label htmlFor="password" style={{ width: '80px', fontWeight: '600' }}>비밀번호</label>
                <input
                    id="password"
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

            {errorMsg && (
                <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
                    {errorMsg}
                </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button
                    type="button"
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
                    뒤로
                </button>

                <button
                    type="button"
                    className={'mobile:text-sm'}
                    onClick={handleConfirm}
                    disabled={loading}
                    style={{
                        border: '1px solid black',
                        backgroundColor: 'transparent',
                        padding: '10px 24px',
                        borderRadius: '6px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        opacity: loading ? 0.6 : 1,
                    }}
                >
                    {loading ? '확인 중...' : '확인'}
                </button>
            </div>
        </div>
    );
};

export default ProQnaSecret;
