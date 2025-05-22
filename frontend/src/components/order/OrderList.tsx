import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import type { Order } from "../../types/order";
import { deleteOrder, getOrders } from "../../services/order";
import { getStatusLabel } from "../../hooks/getStatusLabel";
import { showModalProducts } from "../../hooks/showModalProducts";

export default function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener órdenes:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: '¿Eliminar orden?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await deleteOrder(id);
                setOrders(prev => prev.filter(order => order.id !== id));
                Swal.fire('Eliminada', 'La orden fue eliminada correctamente.', 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar la orden.', 'error');
            }
        }
    };

    if (loading) return <div>Cargando órdenes...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Órdenes de Mesas</h2>
            {orders.map(order => (
                <div key={order.id} className="border rounded-lg p-4 mb-4 shadow">
                    <div><strong>Mesa:</strong> {order.table}</div>
                    <div><strong>Estado:</strong> {getStatusLabel(order.status)}</div>
                    <div><strong>Total:</strong> ${order.total.toFixed(2)}</div>
                    <div className="mt-2 space-x-2">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            onClick={() => showModalProducts(order)}
                        >
                            Ver productos
                        </button>
                        <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            onClick={() => navigate(`/order/edit/${order.id}`)}
                        >
                            Editar
                        </button>
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            onClick={() => handleDelete(order.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
