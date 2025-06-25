import React from 'react';

function Profile() {

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) return <div>로그인이 필요합니다.</div>;

    return (
        <>
            <div>
                <h1>환영합니다, {user.nickname}님!</h1>
                <img src={user.profileImage} alt="프로필"/>
                <p>이메일: {user.email}</p>
                <p>가입일 : {user.createdAt}</p>
            </div>
        </>
    )
}

export default Profile;