import React from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
