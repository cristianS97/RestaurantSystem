export interface OrderItem {
    id: number;
    product: number;
    product_name: string;
    quantity: number;
    price: string;
}

export type OrderStatus = "pending" | "served" | "paid" | "cancelled";

export interface Order {
    id: number;
    table: number;
    user: number;
    created_at: string;
    status: OrderStatus;
    items: OrderItem[];
    total: number;
}

export interface OrderItemInput {
    product: number;
    quantity: number;
    price: number;
}

export interface OrderInput {
    table: number;
    user?: number;
    status: OrderStatus;
    items: OrderItemInput[];
}

export interface Table {
    id: number;
    number: number;
    capacity: number;
    is_active: boolean;
}
