import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getCategories, deleteCategory } from '../../services/menu';
import type { Category } from '../../types/category';

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetch();
    }, []);

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: '¿Eliminar categoría?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await deleteCategory(id);
                setCategories(prev => prev.filter(cat => cat.id !== id));
                Swal.fire('Eliminada', 'La categoría fue eliminada correctamente.', 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
            }
        }
    };

    return (
        <div>
            <h2>Categorías</h2>
            <button onClick={() => navigate('/category/create')}>Nueva Categoría</button>
            <ul>
                {categories.map(cat => (
                    <li key={cat.id}>
                        <strong>{cat.name}</strong>: {cat.description}
                        <button onClick={() => navigate(`/category/edit/${cat.id}`)}>Editar</button>
                        <button onClick={() => handleDelete(cat.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
