import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../services/order";
import { getStatusLabel } from "../../hooks/getStatusLabel";
import { showModalProducts } from "../../hooks/showModalProducts";
import Swal from "sweetalert2";
import type { Order } from "../../types/order";

export default function KitchenPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data.filter(order => order.status === 'pending'));
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar órdenes:', err);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleChangeStatus = async (id: number) => {
        const currentOrder = orders.find(o => o.id === id);
        if (!currentOrder) return;

        const { value: status } = await Swal.fire({
            title: 'Cambiar estado',
            html: `
                <select id="swal-status" class="swal2-input" aria-label="Estado">
                    <option value="" disabled selected>Selecciona un nuevo estado</option>
                    ${['served', 'cancelled']
                        .map(s => `<option value="${s}">${getStatusLabel(s)}</option>`)
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
            await updateOrderStatus(id, status);
            setOrders(prev => prev.filter(o => o.id !== id));
            Swal.fire('Estado actualizado', '', 'success');
        } catch {
            Swal.fire('Error', 'No se pudo cambiar el estado.', 'error');
        }
    };

    if (loading) return <div>Cargando órdenes pendientes...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Cocina - Órdenes pendientes</h2>

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
                            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                            onClick={() => handleChangeStatus(order.id)}
                        >
                            Cambiar estado
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
