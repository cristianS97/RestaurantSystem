import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/menu';
import type { Product } from '../../types/product';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Cargando productos...</div>;

    return (
        <div>
            <h2>Menú</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Precio: ${product.price}</p>
                        <p>Categoría: {product.category.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
