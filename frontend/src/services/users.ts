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
