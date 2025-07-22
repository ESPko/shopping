// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../knh/Store/UserAuthStore.js'; // 경로는 프로젝트에 맞게 수정

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuthStore();
    return isLoggedIn ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
