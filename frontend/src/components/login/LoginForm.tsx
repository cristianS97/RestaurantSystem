import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { login } from '../../services/login';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('accessToken');
        if (isAuthenticated) {
            navigate('/products');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await login(email, password);
            navigate('/products');
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
            Swal.fire('Error', err.message || 'Error al iniciar sesión', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Correo:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Ingresar</button>
        </form>
    );
};

export default LoginForm;
