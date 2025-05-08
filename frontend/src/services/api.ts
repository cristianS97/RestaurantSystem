import type { User } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async (): Promise<User[]> => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No hay token. El usuario no está autenticado.');
    }

    const response = await fetch(`${API_URL}/users/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
    }

    const data = await response.json();
    return data;
};

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Credenciales incorrectas');
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    return data;
};

// Función para hacer logout
export async function logout() {
    const refresh = localStorage.getItem('refreshToken');

    if (!refresh) {
        throw new Error('No hay token de refresco');
    }

    const response = await fetch(`${API_URL}/logout/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
    });

    if (!response.ok) {
        throw new Error('Error al hacer logout');
    }

    // Elimina ambos tokens del localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    return response.json();
}
