import type { Order, OrderInput } from "../types/order";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrders = async (): Promise<Order[]> => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No hay token. El usuario no está autenticado.');
    }

    const response = await fetch(`${API_URL}/orders/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener las ordenes');
    }

    const data = await response.json();
    return data;
};

export const getOrder = async (id : number): Promise<Order[]> => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No hay token. El usuario no está autenticado.');
    }

    const response = await fetch(`${API_URL}/orders/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener la orden');
    }

    const data = await response.json();
    return data;
};

export const createOrder = async (orderData : OrderInput): Promise<Order> => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No hay token. El usuario no está autenticado.');
    }

    const response = await fetch(`${API_URL}/orders/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData)
    });

    console.log(response)

    if (!response.ok) throw new Error('Error al crear la orden');

    return await response.json();
};

export const updateOrder = async (id: number, orderData : OrderInput): Promise<Order> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No autenticado');

    const response = await fetch(`${API_URL}/orders/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) throw new Error('Error al actualizar la orden');

    return await response.json();
};

export const deleteOrder = async (id: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No autenticado');

    const response = await fetch(`${API_URL}/orders/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) throw new Error('Error al eliminar la orden');
};