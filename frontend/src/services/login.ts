const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        // Si el backend devuelve "detail", lo mostramos; si no, un mensaje genérico
        const errorMessage = data.detail || 'Credenciales incorrectas';
        throw new Error(errorMessage);
    }

    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    localStorage.setItem('role', data.role);
    localStorage.setItem('username', data.username);
    localStorage.setItem('userid', data.id);
    return data;
};


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
    localStorage.clear()

    return response.json();
}

export const refreshToken = async (refreshToken: string): Promise<string | null> => {
    const response = await fetch(`${API_URL}/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access); // Guardar el nuevo token
        return data.access; // Retornar el nuevo access token
    } else {
        return null; // Si el refresh token no es válido, retornamos null
    }
};

