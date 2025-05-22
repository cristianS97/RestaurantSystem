import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import type { Order } from "../../types/order";
import { deleteOrder, getOrders } from "../../services/order";
import { getStatusLabel } from "../../hooks/getStatusLabel";

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
                console.error('Error al obtener usuarios:', error);
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

    if (loading) return <div>Cargando ordenes...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Órdenes de Mesas</h2>
            {orders.map(order => (
                <div key={order.id} className="border rounded-lg p-4 mb-4 shadow">
                    <div><strong>Mesa:</strong> {order.table}</div>
                    <div><strong>Estado:</strong> {getStatusLabel(order.status)}</div>
                    <div><strong>Total:</strong> ${order.total.toFixed(2)}</div>
                    <div className="mt-2">
                        <strong>Productos:</strong>
                        <ul className="list-disc ml-5">
                            {order.items.map(item => (
                                <li key={item.id}>
                                    {item.product_name} x {item.quantity} (${(parseFloat(item.price) * item.quantity).toFixed(2)})
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={() => navigate(`/order/edit/${order.id}`)}>Editar</button>
                    <button onClick={() => handleDelete(order.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
}
