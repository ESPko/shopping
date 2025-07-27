import React, { useEffect, useState } from 'react';
import Header from "../../knh/components/Header.jsx";
import Footer from "../../JangDJ/Footer.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function CommunityEdit() {
    const navigate = useNavigate();
    const { id } = useParams(); // 게시글 ID

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(''); // 예시: '공지', '일반'
    const [secret, setSecret] = useState('public');

    const password = '1234'; // 고정 비밀번호 (상황에 따라 필요시 수정)

    // 추가: 편집하지 않을 정보들 상태로 저장
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [hit, setHit] = useState(0);

    useEffect(() => {
        // 게시글 데이터 불러오기
        if (id) {
            axios.get(`http://localhost:8080/api/community/${id}`)
                .then(res => {
                    const data = res.data;
                    setTitle(data.title || '');
                    setContent(data.content || '');
                    setCategory(data.category || '');
                    setSecret(data.isSecret ? 'secret' : 'public');

                    setName(data.name || '');
                    setDate(data.date ? data.date.slice(0, 10) : ''); // 날짜 형식 맞추기
                    setHit(data.hit || 0);
                })
                .catch(err => {
                    console.error(err);
                    alert('게시글을 불러오는 중 오류가 발생했습니다.');
                    navigate('/community');
                });
        } else {
            alert('잘못된 접근입니다.');
            navigate('/community');
        }
    }, [id, navigate]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8080/api/community/${id}`, {
                title,
                content,
                category,
                password,
                isSecret: secret === 'secret',
                name,  // 편집하지 않는 값 유지
                date,
                hit,
            });

            alert('게시글이 수정되었습니다.');
            navigate('/community');
        } catch (error) {
            alert('수정 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    const handleCancel = () => {
        navigate(-1);  // 이전 페이지로 돌아가기
    };

    const handleList = () => {
        navigate('/community');  // 목록 페이지로 이동
    };

    return (
        <div>
            <Header isDefaultBlack={true} />

            <div style={{ paddingTop: '120px', paddingLeft: '40px', paddingRight: '40px', maxWidth: '800px', margin: '0 auto', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px' }}>
                    커뮤니티 수정
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
                            <select
                                value={category}
                                onChange={handleCategoryChange}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    backgroundColor: 'white',
                                    fontSize: '1rem'
                                }}
                            >
                                <option value="공지">공지</option>
                                <option value="일반">일반</option>
                                {/* 필요한 카테고리를 추가할 수 있습니다. */}
                            </select>
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

export default CommunityEdit;
