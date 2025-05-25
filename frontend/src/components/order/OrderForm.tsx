import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getProducts } from '../../services/menu';
import { getTables, getOrder, createOrder, updateOrder } from '../../services/order';
import type { Table, OrderInput, OrderStatus } from '../../types/order';
import type { Product } from '../../types/product';

export default function OrderForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const esEdicion = Boolean(id);

  const [tables, setTables] = useState<Table[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [tableId, setTableId] = useState<string>('');
  const [status, setStatus] = useState<OrderStatus>('pending');
  const [selectedItems, setSelectedItems] = useState<{ productId: string, quantity: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tablesData, productsData] = await Promise.all([
          getTables(),
          getProducts()
        ]);
        setTables(tablesData);
        setProducts(productsData);

        if (esEdicion && id) {
          const order = await getOrder(Number(id));
          setTableId(order.table.toString());
          setStatus(order.status);
          setSelectedItems(order.items.map(item => ({
            productId: item.product.toString(),
            quantity: item.quantity
          })));
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { productId: '', quantity: 1 }]);
  };

  const handleItemChange = (index: number, field: 'productId' | 'quantity', value: string | number) => {
    const updated = [...selectedItems];
    updated[index] = {
      ...updated[index],
      [field]: field === 'quantity' ? Number(value) : value
    };
    setSelectedItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    const updated = [...selectedItems];
    updated.splice(index, 1);
    setSelectedItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tableId) {
      Swal.fire('Error', 'Debe seleccionar una mesa', 'error');
      return;
    }

    if (selectedItems.length === 0 || selectedItems.some(i => !i.productId || i.quantity <= 0)) {
      Swal.fire('Error', 'Debe agregar productos válidos con cantidad mayor a 0', 'error');
      return;
    }

    try {
      const itemsConPrecio = selectedItems.map(item => {
        const producto = products.find(p => p.id === Number(item.productId));
        if (!producto) {
          throw new Error(`Producto con ID ${item.productId} no encontrado`);
        }
        return {
          product: Number(item.productId),
          quantity: item.quantity,
          price: Number(producto.price)
        };
      });

      const orderData: OrderInput = {
        table: Number(tableId),
        status,
        items: itemsConPrecio
      };

      if (esEdicion && id) {
        await updateOrder(Number(id), orderData);
        Swal.fire('Éxito', 'Orden actualizada correctamente', 'success');
      } else {
        await createOrder(orderData);
        Swal.fire('Éxito', 'Orden creada correctamente', 'success');
      }
      navigate('/orders');
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      Swal.fire('Error', 'Hubo un problema al guardar la orden', 'error');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{esEdicion ? 'Editar Orden' : 'Crear Orden'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Mesa:</label>
          <select value={tableId} onChange={e => setTableId(e.target.value)} required className="w-full border p-2 rounded">
            <option value="">Seleccione una mesa</option>
            {tables.map(table => (
              <option key={table.id} value={table.id}>Mesa {table.number}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Estado:</label>
          <select value={status} onChange={e => setStatus(e.target.value as OrderStatus)} required className="w-full border p-2 rounded">
            <option value="pending">Pendiente</option>
            <option value="served">Servido</option>
            <option value="paid">Pagado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>

        <div>
          <label>Productos:</label>
          {selectedItems.map((item, index) => {
            const producto = products.find(p => p.id === Number(item.productId));
            return (
              <div key={index} className="flex gap-2 items-center mb-2">
                <select
                  value={item.productId}
                  onChange={e => handleItemChange(index, 'productId', e.target.value)}
                  required
                  className="flex-1 border p-2 rounded"
                >
                  <option value="">Seleccione un producto</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={e => handleItemChange(index, 'quantity', e.target.value)}
                  className="w-20 border p-2 rounded"
                />
                {producto && (
                  <span className="text-sm text-gray-600">(${producto.price})</span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  aria-label="Eliminar producto"
                >
                  &times;
                </button>
              </div>
            );
          })}
          <button type="button" onClick={handleAddItem} className="bg-green-500 text-white px-3 py-1 rounded">+ Producto</button>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {esEdicion ? 'Actualizar' : 'Crear'} Orden
        </button>
      </form>
    </div>
  );
}
