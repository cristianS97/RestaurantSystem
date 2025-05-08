import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoutButton from '../login/LogoutButton';

const Menu: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
    const location = useLocation();

    useEffect(() => {
        // Verifica el token cada vez que cambia la ruta
        setIsAuthenticated(!!localStorage.getItem('accessToken'));
    }, [location]);

    return (
        <nav style={{ padding: '1rem', background: '#eee' }}>
            {isAuthenticated && (
                <>
                    <Link to="/products" style={{ marginRight: '1rem' }}>Productos</Link>
                    <Link to="/users" style={{ marginRight: '1rem' }}>Usuarios</Link>
                    <Link to="/add-product">Agregar Producto</Link>
                </>
            )}
            <li>
                {isAuthenticated ? <LogoutButton /> : <Link to="/login">Iniciar sesión</Link>}
            </li>
        </nav>
    );
};

export default Menu;
