import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import type { Order } from "../../types/order";
import { deleteOrder, getOrders, updateOrderStatus } from "../../services/order";
import { getStatusLabel } from "../../hooks/getStatusLabel";
import { showModalProducts } from "../../hooks/showModalProducts";

export default function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener órdenes:', error);
                setLoading(false);
            }
        };

        fetchOrders();
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

    const handleChangeStatus = async (id: number) => {
        const currentOrder = orders.find(o => o.id === id);
        if (!currentOrder) return;

        const { value: status } = await Swal.fire({
            title: 'Cambiar estado',
            html: `
                <select id="swal-status" class="swal2-input" aria-label="Estado">
                    <option value="" disabled selected>Selecciona un nuevo estado</option>
                    ${['pending', 'served', 'paid', 'cancelled']
                        .filter(s => s !== currentOrder.status)
                        .map(
                            s => `<option value="${s}">${getStatusLabel(s)}</option>`
                        )
                        .join('')}
                </select>
            `,
            preConfirm: () => {
                const select = document.getElementById('swal-status') as HTMLSelectElement;
                return select.value || null;
            },
            showCancelButton: true,
            confirmButtonText: 'Cambiar',
            cancelButtonText: 'Cancelar'
        });

        if (!status) return;

        try {
            await updateOrderStatus(id, status)
            // Actualiza localmente el estado
            setOrders(prev =>
                prev.map(o => (o.id === id ? { ...o, status } : o))
            );
            Swal.fire('Estado actualizado', '', 'success');
        } catch (err) {
            Swal.fire('Error al actualizar el estado', '', 'error');
        }
    };

    const filteredOrders = statusFilter === 'all'
        ? orders
        : orders.filter(order => order.status === statusFilter);

    if (loading) return <div>Cargando órdenes...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Órdenes de Mesas</h2>
            <div className="mb-4 flex items-center space-x-4">
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => navigate('/order/create')}
                >
                    Nueva orden
                </button>
                <select
                    className="border rounded px-2 py-1"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">Todas</option>
                    <option value="pending">Pendientes</option>
                    <option value="served">Servidas</option>
                    <option value="paid">Pagadas</option>
                    <option value="cancelled">Canceladas</option>
                </select>
            </div>

            {filteredOrders.map(order => (
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
                            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                            onClick={() => handleChangeStatus(order.id)}
                        >
                            Cambiar estado
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
