import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCategory, getCategory, updateCategory } from '../../services/menu';

const CategoryForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const esEdicion = !!id;

    useEffect(() => {
        if (esEdicion && id) {
            getCategory(Number(id)).then((cat) => {
                setName(cat.name);
                setDescription(cat.description);
            });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { name, description };
        try {
            if (esEdicion && id) {
                await updateCategory(Number(id), data);
            } else {
                await createCategory(data);
            }
            navigate('/categories');
        } catch (error) {
            console.error('Error al guardar la categoría:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{esEdicion ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">{esEdicion ? 'Actualizar' : 'Crear'}</button>
        </form>
    );
};

export default CategoryForm;
