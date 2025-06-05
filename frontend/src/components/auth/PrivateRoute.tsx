import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
    allowedRoles?: string[];  // opcional
}

const PrivateRoute: React.FC<Props> = ({ allowedRoles }) => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');

    const isAuthenticated = !!token;
    const isAuthorized = allowedRoles ? allowedRoles.includes(role || '') : true;

    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!isAuthorized) return <Navigate to="/unauthorized" />;

    return <Outlet />;
};

export default PrivateRoute;
