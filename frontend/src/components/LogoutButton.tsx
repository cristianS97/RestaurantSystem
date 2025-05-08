import React from 'react';
import { logout } from '../services/api';

const LogoutButton: React.FC = () => {
    const handleLogout = async () => {
        try {
            await logout();
            window.location.reload(); // O redirigir al login
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return <button onClick={handleLogout}>Cerrar sesión</button>;
};

export default LogoutButton;
