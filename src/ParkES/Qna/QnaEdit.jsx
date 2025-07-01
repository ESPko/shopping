import React, { useEffect, useState } from 'react';
import Header from "../../knh/components/Header.jsx";
import Footer from "../../JangDJ/Footer.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function QnaEdit() {
    const navigate = useNavigate();
    const { no } = useParams(); // 게시글 ID

    const options = ['배송문의', '교환/반품문의', '상품 문의', '기타 문의'];

    const [selectedOption, setSelectedOption] = useState('상품 문의');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [secret, setSecret] = useState('public');

    // 추가: 편집하지 않을 정보들 상태로 저장
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [hit, setHit] = useState(0);

    const password = '1234'; // 고정 비밀번호

    useEffect(() => {
        // 게시글 데이터 불러오기
        if (no) {
            axios.get(`http://localhost:8080/api/board/${no}`)
                .then(res => {
                    const data = res.data;
                    setTitle(data.title || '');
                    setContent(data.content || '');
                    setSelectedOption(data.category || '상품 문의');
                    setSecret(data.isSecret ? 'secret' : 'public');

                    setName(data.name || '');
                    setDate(data.date ? data.date.slice(0, 10) : ''); // 날짜 형식 맞추기
                    setHit(data.hit || 0);
                })
                .catch(err => {
                    console.error(err);
                    alert('게시글을 불러오는 중 오류가 발생했습니다.');
                    navigate('/board');
                });
        } else {
            alert('잘못된 접근입니다.');
            navigate('/board');
        }
    }, [no, navigate]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8080/api/board/${no}`, {
                title,
                category: selectedOption,
                content,
                password,
                isSecret: secret === 'secret',
                name,  // 편집하지 않는 값 유지
                date,
                hit,
            });

            alert('게시글이 수정되었습니다.');
            navigate('/board');
        } catch (error) {
            alert('수정 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleList = () => {
        navigate('/board');
    };

    return (
        <div>
            <Header isDefaultBlack={true} />

            <div style={{ paddingTop: '120px', paddingLeft: '40px', paddingRight: '40px', maxWidth: '800px', margin: '0 auto', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px' }}>
                    Q&A 수정
                </h2>

                {/* 편집 불가 정보 표시 */}
                <div style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                    <div><strong>작성자:</strong> {name}</div>
                    <div><strong>작성일:</strong> {date}</div>
                    <div><strong>조회수:</strong> {hit}</div>
                </div>

                <form onSubmit={handleUpdate}>
                    <div style={{ display: 'flex', marginBottom: '20px', gap: '20px' }}>
                        <div style={{ width: '33.33%' }}>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    backgroundColor: 'transparent',
                                    border: '1px solid #ccc',
                                    outline: 'none'
                                }}
                                required
                            />
                        </div>

                        <div style={{ width: '220px' }}>
                            <Dropdown
                                options={options}
                                selectedOption={selectedOption}
                                onOptionClick={handleOptionClick}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용을 입력하세요"
                            rows={10}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '1rem',
                                resize: 'vertical'
                            }}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '20px' }}>
                        <label htmlFor="password" style={{ fontWeight: '600', flexShrink: 0 }}>비밀번호</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            readOnly
                            style={{
                                flex: 1,
                                padding: '8px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                backgroundColor: '#f0f0f0',
                                fontSize: '1rem',
                                color: '#666',
                                cursor: 'not-allowed'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', gap: '20px' }}>
                        <span style={{ fontWeight: '600' }}>비밀글 설정</span>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="radio" name="secret" value="public" checked={secret === 'public'} onChange={() => setSecret('public')} />
                            공개글
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="radio" name="secret" value="secret" checked={secret === 'secret'} onChange={() => setSecret('secret')} />
                            비밀글
                        </label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
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

                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                            <button
                                type="submit"
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '8px',
                                    padding: '10px 24px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                수정
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '8px',
                                    padding: '10px 24px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}

function Dropdown({ options, selectedOption, onOptionClick }) {
    const [open, setOpen] = React.useState(false);

    return (
        <div style={{ position: 'relative' }}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    backgroundColor: 'white',
                    textAlign: 'left',
                    fontSize: '1rem',
                    cursor: 'pointer'
                }}
            >
                {selectedOption} <span style={{ float: 'right' }}>▼</span>
            </button>

            {open && (
                <ul
                    style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: '6px 0',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        position: 'absolute',
                        width: '100%',
                        backgroundColor: 'white',
                        zIndex: 1000,
                        maxHeight: '200px',
                        overflowY: 'auto',
                    }}
                >
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => {
                                onOptionClick(option);
                                setOpen(false);
                            }}
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: selectedOption === option ? '700' : '400',
                                backgroundColor: selectedOption === option ? '#e6f0ff' : 'white',
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedOption === option}
                                readOnly
                                style={{ marginRight: '8px' }}
                            />
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default QnaEdit;
