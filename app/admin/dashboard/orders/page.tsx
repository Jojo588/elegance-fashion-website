'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { getAllOrders, Order, updateOrderStatus } from '@/lib/firestore';
import OrdersTable from '@/components/admin/OrdersTable';

export default function OrdersManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    try {
      await updateOrderStatus(orderId, status);
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-2">Manage customer orders</p>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-foreground">Loading orders...</p>
          </div>
        </div>
      ) : (
        <OrdersTable
          orders={orders}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
