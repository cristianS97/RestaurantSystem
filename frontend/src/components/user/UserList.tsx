import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/users';
import type { User } from '../../types/user';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);  // Usa el tipo User para el estado de usuarios
    const [loading, setLoading] = useState<boolean>(true);  // Usa booleano para el estado de carga

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Cargando usuarios...</div>;

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.names} {user.last_name} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
