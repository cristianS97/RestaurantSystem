import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/menu';
import type { Product } from '../../types/product';

const ProductList: React.FC = () => {
    const navigate = useNavigate();
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

    const eliminarProducto = async (id: number) => {
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el producto permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacion.isConfirmed) {
            try {
                await deleteProduct(id);
                setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
                Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
            }
        }
    };

    if (loading) return <div>Cargando productos...</div>;

    return (
        <div>
            <h2>Menú</h2>
            <button onClick={() => navigate('/product/create')}>Nuevo Producto</button>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Precio: ${product.price}</p>
                        <p>Categoría: {product.category.name}</p>
                        <p>
                            <button onClick={() => eliminarProducto(product.id)}>Eliminar producto</button>
                            <button onClick={() => navigate(`/product/edit/${product.id}`)}>Editar producto</button>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
