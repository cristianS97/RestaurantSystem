import React from 'react';
import { logout } from '../../services/login';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return <button onClick={handleLogout}>Cerrar sesión</button>;
};

export default LogoutButton;
