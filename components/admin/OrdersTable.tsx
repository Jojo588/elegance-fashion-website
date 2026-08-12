'use client';

import { Order } from '@/lib/supabase/db';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: Order['status']) => void;
}

const statusOptions: Order['status'][] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function OrdersTable({
  orders,
  onStatusChange,
}: OrdersTableProps) {
  const handleWhatsapp = (order: Order) => {
    const message = `Order Confirmation\n\nProduct: ${order.productName}\nSize: ${order.size}\nColor: ${order.color}\nQuantity: ${order.quantity}\nTotal: GHS ${order.totalPrice}`;
    const link = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-elegant overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Product
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Details
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Total
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                {/* Product */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={order.productImage}
                        alt={order.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {order.productName}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Customer */}
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {order.customerName || 'Guest'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.customerLocation || 'N/A'}
                    </p>
                  </div>
                </td>

                {/* Details */}
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground">
                    {order.quantity}x - Size {order.size}, {order.color}
                  </p>
                </td>

                {/* Total */}
                <td className="px-6 py-4">
                  <p className="font-semibold text-foreground">
                    GHS {order.totalPrice}
                  </p>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      onStatusChange(order.id || '', e.target.value as Order['status'])
                    }
                    className={`px-3 py-1 rounded text-sm font-medium border-0 cursor-pointer ${
                      statusColors[order.status]
                    }`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleWhatsapp(order)}
                      className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                      title="Send WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No orders found</p>
        </div>
      )}
    </div>
  );
}
