import type { OrderItem } from "../types/order";

export const formatOrderItemsHtml = (items: OrderItem[]): string => {
    return `
        <div style="text-align:left;">
            <ul style="
                padding-left: 1.2em; 
                margin-top: 10px;
                list-style-type: disc;
                font-size: 14px;
                color: #333;
            ">
                ${items.map(item =>
                    `<li style="margin-bottom: 6px;">
                        <strong>${item.product_name}</strong> x ${item.quantity} 
                        <span style="color: #666;">($${(parseFloat(item.price) * item.quantity).toFixed(2)})</span>
                    </li>`
                ).join('')}
            </ul>
        </div>
    `;
};
