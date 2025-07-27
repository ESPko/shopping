import React, { useState } from 'react';
import Header from "../../knh/components/Header.jsx";
import Footer from "../../JangDJ/Footer.jsx";
import { useNavigate } from "react-router-dom";

function CommunityWritePage() {
    const navigate = useNavigate();

    const options = ['일반', '공지사항', '이벤트', '자유게시판'];

    const [selectedOption, setSelectedOption] = useState('일반');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');
    const [secret, setSecret] = useState('public');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    // 등록 버튼
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 예시 API 요청
            const response = await fetch('/api/community', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    category: selectedOption,
                    content,
                    password,
                    isSecret: secret === 'secret',
                }),
            });

            if (!response.ok) throw new Error('등록 실패');

            alert('게시글 등록 완료!');
            navigate('/community');
        } catch (error) {
            alert('등록 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    const handleCancel = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const handleList = () => {
        navigate('/community'); // 목록 페이지로 이동
    };

    return (
        <div>
            <Header isDefaultBlack={true} />

            <div style={{ paddingTop: '120px', paddingLeft: '40px', paddingRight: '40px', maxWidth: '800px', margin: '0 auto', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px' }}>
                    커뮤니티 게시글 작성
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* 제목과 드롭다운 수평 정렬 */}
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
                                    outline: 'none',
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

                    {/* 본문 입력 */}
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
                                resize: 'vertical',
                            }}
                            required
                        />
                    </div>

                    {/* 비밀번호 입력 */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '20px' }}>
                        <label htmlFor="password" style={{ fontWeight: '600', flexShrink: 0 }}>비밀번호</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            style={{
                                flex: 1,
                                padding: '8px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                backgroundColor: '#e0e0e0',
                                fontSize: '1rem',
                                color: '#333',
                            }}
                            onFocus={(e) => e.target.style.backgroundColor = '#fff'}
                            onBlur={(e) => e.target.style.backgroundColor = '#e0e0e0'}
                            required
                        />
                    </div>

                    {/* 비밀글 설정 */}
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

                    {/* 버튼 영역 */}
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
                                fontWeight: '600',
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
                                    fontWeight: '600',
                                }}
                            >
                                등록
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
                                    fontWeight: '600',
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

// ✅ 드롭다운 컴포넌트
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
                    cursor: 'pointer',
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

export default CommunityWritePage;
