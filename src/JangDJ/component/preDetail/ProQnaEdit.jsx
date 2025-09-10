import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Header from "../../../knh/components/Header.jsx";
import Footer from "../../Footer.jsx";

function ProQnaEdit() {
    const navigate = useNavigate();
    const { id, productId } = useParams();

    const options = ['배송문의', '교환/반품문의', '상품 문의', '기타 문의'];

    const [selectedOption, setSelectedOption] = useState('상품 문의');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [secret, setSecret] = useState('public');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [hit, setHit] = useState(0);

    const password = '1234';

    useEffect(() => {
        if (id && productId) {
            axios.get(`http://localhost:8080/api/productqna/${id}`)
                .then(res => {
                    const data = res.data;
                    setTitle(data.title || '');
                    setContent(data.content || '');
                    setSelectedOption(data.category || '상품 문의');
                    setSecret(data.isSecret ? 'secret' : 'public');
                    setName(data.name || '');
                    setDate(data.date ? data.date.slice(0, 10) : '');
                    setHit(data.hit || 0);
                })
                .catch(err => {
                    console.error(err);
                    alert('게시글을 불러오는 중 오류가 발생했습니다.');
                    navigate(`/product/${productId}`);
                });
        } else {
            alert('잘못된 접근입니다.');
            navigate(`/product/${productId}`);
        }
    }, [id, productId, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/productqna/${id}/product/${productId}`, {
                title,
                category: selectedOption,
                content,
                password,
                isSecret: secret === 'secret',
                name,
                date,
                hit,
            });
            alert('게시글이 수정되었습니다.');
            navigate(`/product/${productId}/qna`);
        } catch (error) {
            alert('수정 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleList = () => {
        navigate(`/product/${productId}`);
    };

    return (
        <>
            <Header isDefaultBlack={true} />
            <div className="pt-[120px] px-[40px] max-w-[800px] mx-auto mb-[40px] mobile:pt-10">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
                    문의 수정
                </h2>

                {/* 카테고리 드롭다운 */}
                <div style={{ marginBottom: '16px' }}>
                    <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                        }}
                    >
                        {options.map((option, idx) => (
                            <option key={idx} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* 제목 입력 */}
                <div style={{ marginBottom: '16px' }}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                {/* 본문 내용 */}
                <div style={{ marginBottom: '16px' }}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        required
                        style={{
                            width: '100%',
                            height: '300px',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            resize: 'vertical',
                            backgroundColor: '#fff'
                        }}
                    />
                </div>

                {/* 공개/비공개 선택 */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <label>
                        <input
                            type="radio"
                            value="public"
                            checked={secret === 'public'}
                            onChange={() => setSecret('public')}
                        /> 공개글
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="secret"
                            checked={secret === 'secret'}
                            onChange={() => setSecret('secret')}
                        /> 비밀글
                    </label>
                </div>

                {/* 버튼 영역 */}
                <div className={'mt-[30px] mobile:mt-2'}
                     style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
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
                            type="button"
                            onClick={handleCancel}
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
                            취소
                        </button>

                        <button
                            type="submit"
                            onClick={handleUpdate}
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
        </>
    );
}

export default ProQnaEdit;
