import type { Category } from '../types/category';
import type { Product, ProductInput } from '../types/product';

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async (): Promise<Product[]> => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No hay token. El usuario no está autenticado.');
    }

    const response = await fetch(`${API_URL}/products/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener los productos');
    }

    const data = await response.json();
    return data;
};

export const getProduct = async (id: number): Promise<Product> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No autenticado');

    const response = await fetch(`${API_URL}/products/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) throw new Error('Error al obtener el producto');

    return await response.json();
};

export const createProduct = async (productData: ProductInput): Promise<Product> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No autenticado');

    const response = await fetch(`${API_URL}/products/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
    });

    console.log(response)

    if (!response.ok) throw new Error('Error al crear el producto');

    return await response.json();
};

export const updateProduct = async (id: number, productData: ProductInput): Promise<Product> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No autenticado');

    const response = await fetch(`${API_URL}/products/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) throw new Error('Error al actualizar el producto');

    return await response.json();
};

export const deleteProduct = async (id: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No autenticado');

    const response = await fetch(`${API_URL}/products/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) throw new Error('Error al eliminar el producto');
};

export const getCategories = async (): Promise<Category[]> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No autenticado');

    const response = await fetch(`${API_URL}/categories/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error('Error al obtener categorías');

    return await response.json();
};
