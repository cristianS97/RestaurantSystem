import type { User } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'; // URL de la API definida en .env

// Función para obtener la lista de usuarios
export const getUsers = async (): Promise<User[]> => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';  // Asegúrate de tener la URL correcta
    const response = await fetch(`${apiUrl}/users/`);
    if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
    }
    const data = await response.json();
    return data;  // Devuelve los datos como arreglo de usuarios
};

// Función para hacer logout
export async function logout() {
    const response = await fetch(`${API_URL}/auth/logout/`, {
        method: 'POST',
        credentials: 'include', // Si estás usando cookies de sesión
    });
    if (!response.ok) {
        throw new Error('Error al hacer logout');
    }
    return response.json();
}
