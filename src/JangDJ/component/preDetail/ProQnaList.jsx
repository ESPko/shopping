import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProQnaList = ({ productId }) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (productId) {
            axios.get(`http://localhost:8080/api/productqna/product/${productId}`)
                .then((res) => {
                    setPosts(res.data);
                })
                .catch((err) => {
                    setError('데이터를 불러오는 데 실패했습니다.');
                    console.error(err);
                });
        }
    }, [productId]);


    const handleTitleClick = (post) => {
        if (post.secret === 0) {
            navigate(`/product/${post.product_id}/prosecret/${post.id}`);
        } else {
            navigate(`/product/${post.product_id}/prosecret/${post.id}`);
        }
    };


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
                        <td colSpan="6" className="py-8 text-gray-500">
                            현재 게시글의 질문리스트가 비어있습니다.
                        </td>                    </tr>
                ) : (
                    posts.map((post) => (
                        <tr key={post.id} className="border-b border-gray-200 h-12 hover:bg-gray-50">
                            <td className="align-middle">{post.id}</td>
                            <td className="align-middle">{post.product_name || '-'}</td>

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
                                </div>
                            </td>

                            <td className="align-middle">{post.name || '-'}</td>
                            <td className="align-middle">
                                {post.date
                                    ? new Date(post.date).toLocaleString("ko-KR", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false
                                    }).replace(/\. /g, '-').replace('.', '') // "2025. 08. 02. 21:25" -> "2025-08-02-21:25"
                                    : '-'}
                            </td>                            <td className="align-middle">{post.hit ?? 0}</td>
                        </tr>
                    ))
                )}
                </tbody>

            </table>
        </div>
    );
};

export default ProQnaList;
