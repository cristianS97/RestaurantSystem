import Swal from 'sweetalert2';
import type { Order } from '../types/order';
import { formatOrderItemsHtml } from './formatOrderItemsHtml';

export const showModalProducts = (order: Order) => {
    Swal.fire({
        title: `Productos de la mesa ${order.table}`,
        html: formatOrderItemsHtml(order.items),
        confirmButtonText: 'Cerrar',
        customClass: {
            popup: 'text-left'
        }
    });
};