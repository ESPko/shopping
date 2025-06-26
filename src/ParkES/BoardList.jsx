import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BoardList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/board')
            .then((res) => setPosts(res.data))
            .catch((err) => console.error(err));
    }, []);

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

                        {/* 🔒 + Re + Title + New 를 감싸는 flex box */}
                        <td className="align-middle">
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-black">🔒</span>

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

export default BoardList;
