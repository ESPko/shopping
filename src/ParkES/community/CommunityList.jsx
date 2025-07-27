import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // 추가
import axios from "axios";

const CommunityList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();  // 추가

    useEffect(() => {
        axios.get('http://localhost:8080/api/community')
            .then((res) => setPosts(res.data.content))
            .catch((err) => console.error(err));
    }, []);

    // 클릭 핸들러
    const handleClick = (id) => {
        navigate(`/community/${id}`);  // 상세페이지 경로로 이동
    };

    return (
        <div className="w-full">
            <table className="w-full text-center">
                <thead className="bg-white border-b border-gray-200">
                <tr className="h-12">
                    <th>No</th>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody className={'mobile:text-sm'}>
                {posts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-200 h-12 hover:bg-gray-50">
                        <td className="align-middle">{post.id}</td>
                        <td
                            className="align-middle cursor-pointer text-black hover:underline"
                            onClick={() => handleClick(post.id)}
                        >
                            <div className="flex items-center justify-center gap-2">
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommunityList;
