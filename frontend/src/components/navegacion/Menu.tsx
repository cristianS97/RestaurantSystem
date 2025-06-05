import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoutButton from '../login/LogoutButton';

const Menu: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
    const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
    const location = useLocation();

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('accessToken'));
        setRole(localStorage.getItem('role'));
    }, [location]);

    const isAdmin = role === 'admin';
    const isWaiter = role === 'waiter';
    const isChef = role === 'chef';
    const isCashier = role === 'cashier';

    return (
        <nav style={{ padding: '1rem', background: '#eee' }}>
            {isAuthenticated && (
                <>
                    {isAdmin && (
                        <>
                            <Link to="/users" style={{ marginRight: '1rem' }}>Usuarios</Link>
                            <Link to="/products" style={{ marginRight: '1rem' }}>Productos</Link>
                            <Link to="/categories" style={{ marginRight: '1rem' }}>Categorías</Link>
                        </>
                    )}
                    {(isWaiter || isAdmin) && (
                        <Link to="/orders" style={{ marginRight: '1rem' }}>Órdenes</Link>
                    )}
                    {(isChef || isAdmin) && (
                        <Link to="/kitchen" style={{ marginRight: '1rem' }}>Cocina</Link>
                    )}
                    {(isCashier || isAdmin) && (
                        <Link to="/billing" style={{ marginRight: '1rem' }}>Caja</Link>
                    )}
                </>
            )}
            <li style={{ display: 'inline', marginLeft: '1rem' }}>
                {isAuthenticated ? <LogoutButton /> : <Link to="/login">Iniciar sesión</Link>}
            </li>
        </nav>
    );
};

export default Menu;
