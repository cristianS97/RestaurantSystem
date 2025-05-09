// components/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getCategories, createProduct, updateProduct, getProduct } from '../../services/menu';
import type { Category } from '../../types/category';
import type { ProductInput, ProductFormProps } from '../../types/product';

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const esEdicion = Boolean(id);
    const [name, setName] = useState(product?.name || '');
    const [description, setDescription] = useState(product?.description || '');
    const [price, setPrice] = useState<number>(product?.price || 0);
    const [category, setCategory] = useState(product?.category?.id || '');
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }

            if (esEdicion) {
                const product = await getProduct(Number(id));
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category.id.toString());
            }
        };

        fetchCategories();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedCategory = categories.find(cat => cat.id === Number(category));

        if (!selectedCategory) {
            console.error("Categoría inválida");
            return;
        }

        console.log(selectedCategory)

        const productData : ProductInput = {
            name,
            description,
            price,
            category_id: selectedCategory.id,
        };

        try {
            if (esEdicion && id) {
                await updateProduct(Number(id), productData);
                navigate('/products');
            } else {
                await createProduct(productData);
                navigate('/products');
            }
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };

    return (
        <>
            <h2>{esEdicion ? 'Editar Producto' : 'Crear Producto'}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nombre del producto" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                />
                <textarea 
                    placeholder="Descripción del producto" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                />
                <input 
                    type="number" 
                    placeholder="Precio" 
                    value={price} 
                    onChange={(e) => setPrice(Number(e.target.value))} 
                    required
                />
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    required
                >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <button type="submit">
                    {esEdicion ? 'Actualizar' : 'Crear'}
                </button>
            </form>
        </>
    );
};

export default ProductForm;
