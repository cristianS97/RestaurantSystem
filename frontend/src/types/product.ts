import type { Category } from "./category";

export interface Product {
    id          : number;
    name        : string;
    description : string;
    price       : number;
    category    : Category;
}

export interface ProductInput {
    name        : string;
    description : string;
    price       : number;
    category_id : number;
}

export interface ProductFormProps {
    product? : Product;
}