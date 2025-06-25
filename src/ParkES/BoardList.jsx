import React from 'react';

// 더미 데이터 생성
const generateDummyPosts = () => {
    const posts = [];
    const startDate = new Date('2025-06-01');

    for (let i = 0; i < 20; i++) {
        const no = 10001 + i;
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        posts.push({
            no,
            product: '',
            title: '교환/반품문의',
            isNew: true,
            name: i % 2 === 0 ? '고객님' : '판매자',
            date: date.toISOString().split('T')[0],
            hit: 10
        });
    }

    return posts;
};

const BoardList = () => {
    const posts = generateDummyPosts();

    return (
        <div style={{ padding: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr style={{ textAlign: 'left' }}>
                    <th style={{ padding: '10px' }}>No</th>
                    <th style={{ padding: '10px' }}>Product</th>
                    <th style={{ padding: '10px' }}>Title</th>
                    <th style={{ padding: '10px' }}>Name</th>
                    <th style={{ padding: '10px' }}>Date</th>
                    <th style={{ padding: '10px' }}>Hit</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.no} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '10px' }}>{post.no}</td>
                        <td style={{ padding: '10px' }}>{post.product}</td>
                        <td style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {/* 검은 자물쇠 아이콘 (Unicode) */}
                            <span style={{ fontSize: '14px', color: 'black' }}>🔒</span>

                            {/* Name이 판매자면 Re 회색 배지 */}
                            {post.name === '판매자' && (
                                <span
                                    style={{
                                        backgroundColor: '#aaa',
                                        color: 'white',
                                        fontSize: '12px',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontWeight: 'bold',
                                    }}
                                >
                    Re
                  </span>
                            )}

                            {/* 제목 텍스트 */}
                            <span>{post.title}</span>

                            {/* New 파란 배지 */}
                            {post.isNew && (
                                <span
                                    style={{
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        fontSize: '12px',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        marginLeft: '8px',
                                    }}
                                >
                    New
                  </span>
                            )}
                        </td>
                        <td style={{ padding: '10px' }}>{post.name}</td>
                        <td style={{ padding: '10px' }}>{post.date}</td>
                        <td style={{ padding: '10px' }}>{post.hit}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BoardList;
