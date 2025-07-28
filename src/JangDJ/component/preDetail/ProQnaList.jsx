import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProQnaList = ({ productId }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (productId) {
            // productId를 포함한 API 요청
            axios.get(`http://localhost:8080/api/qna?productId=${productId}`)
                .then((res) => {
                    setPosts(res.data); // 데이터 설정
                    setLoading(false);
                })
                .catch((err) => {
                    setError('데이터를 불러오는 데 실패했습니다.'); // 오류 메시지 설정
                    setLoading(false);
                });
        }
    }, [productId]); // productId가 변경될 때마다 호출

    const handleTitleClick = (post) => {
        if (post.secret === 0) {
            navigate(`/qnasecret/${post.id}`);
        } else {
            navigate(`/qnadetail/${post.id}`);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시
    }

    if (error) {
        return <div>{error}</div>; // 에러 발생 시 표시
    }

    return (
        <div className="w-full">
            <table className="w-full text-center">
                <thead className="bg-white border-b border-gray-200">
                <tr className="h-12">
                    <th>No</th>
                    <th>Product</th>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Hit</th>
                </tr>
                </thead>
                <tbody>
                {posts.length === 0 ? (
                    <tr>
                        <td colSpan="6">No posts available.</td>
                    </tr>
                ) : (
                    posts.map((post) => (
                        <tr key={post.id} className="border-b border-gray-200 h-12 hover:bg-gray-50">
                            <td className="align-middle">{post.id}</td>
                            <td className="align-middle">{post.product || '-'}</td>

                            {/* 제목 클릭 시 조건에 따라 페이지 이동 */}
                            <td className="align-middle">
                                <div
                                    className="flex items-center justify-center gap-2 cursor-pointer"
                                    onClick={() => handleTitleClick(post)}
                                >
                                    {post.secret === 0 && (
                                        <span className="text-black">🔒</span>
                                    )}

                                    {post.name === '판매자' && (
                                        <span className="bg-gray-300 text-white text-xs px-2 py-0.5 rounded-full">
                                                RE
                                            </span>
                                    )}

                                    <span>{post.title}</span>

                                    {post.new && (
                                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                NEW
                                            </span>
                                    )}
                                </div>
                            </td>

                            <td className="align-middle">{post.name}</td>
                            <td className="align-middle">{post.date}</td>
                            <td className="align-middle">{post.hit}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ProQnaList;
