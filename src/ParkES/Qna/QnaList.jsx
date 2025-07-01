import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QnaList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/qna')
            .then((res) => setPosts(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleTitleClick = (post) => {
        if (post.secret === 0) {
            navigate(`/qnasecret/${post.id}`);
        } else {
            navigate(`/qnadetail/${post.id}`);
        }
    };

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
                {posts.map((post) => (
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

                                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                        NEW
                                    </span>
                            </div>
                        </td>

                        <td className="align-middle">{post.name}</td>
                        <td className="align-middle">{post.date}</td>
                        <td className="align-middle">{post.hit}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default QnaList;
