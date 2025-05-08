// components/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { getCategories, createProduct, updateProduct } from '../../services/menu';
import type { Category } from '../../types/category';
import type { ProductInput, ProductFormProps } from '../../types/product';

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
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
        };

        fetchCategories();
    }, []);

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
            if (product) {
                await updateProduct(product.id, productData);
            } else {
                await createProduct(productData);
            }
            // Redirigir o mostrar confirmación
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };

    return (
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
            <button type="submit">Guardar</button>
        </form>
    );
};

export default ProductForm;
