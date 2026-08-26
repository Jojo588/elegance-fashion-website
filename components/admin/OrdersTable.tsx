'use client';

import { Order } from '@/lib/supabase/db';
import Image from 'next/image';
import { MessageCircle, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

function DeliveryCountdown({ deleteAfter }: { deleteAfter?: string }) {
  const [remaining, setRemaining] = useState(() => Math.max(0, new Date(deleteAfter ?? 0).getTime() - Date.now()));

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, new Date(deleteAfter ?? 0).getTime() - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [deleteAfter]);

  if (!deleteAfter || remaining <= 0) return null;
  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1_000);

  return (
    <span className="mt-1 block text-xs text-muted-foreground" aria-live="polite">
      Removes in {hours}h {minutes}m {seconds}s
    </span>
  );
}

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: Order['status']) => void;
  onDelete: (orderId: string) => void;
}

const statusOptions: Order['status'][] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-200',
  shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-200',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-200',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-200',
};

export default function OrdersTable({
  orders,
  onStatusChange,
  onDelete,
}: OrdersTableProps) {
  const [search, setSearch] = useState('');
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return orders;
    return orders.filter((order) => order.productId.toLowerCase().includes(term));
  }, [orders, search]);

  const handleWhatsapp = (order: Order) => {
    const message = `Order Confirmation\n\nProduct: ${order.productName}\nSize: ${order.size}\nColor: ${order.color}\nQuantity: ${order.quantity}\nTotal: GHS ${order.totalPrice}`;
    const link = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
  };

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-elegant overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border p-4">
        <Search className="size-4 text-muted-foreground" aria-hidden="true" />
        <label htmlFor="order-product-id-search" className="sr-only">Search orders by product ID</label>
        <input
          id="order-product-id-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search orders by product ID"
          className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
        />
        <span className="text-sm text-muted-foreground">{filteredOrders.length} results</span>
      </div>
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
            {filteredOrders.map((order) => (
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
                    className={`min-w-28 appearance-none rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground [color-scheme:dark] outline-none cursor-pointer focus:ring-2 focus:ring-primary [&>option]:bg-card [&>option]:text-foreground ${
                      statusColors[order.status]
                    }`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                  {order.status === 'delivered' && (
                    <DeliveryCountdown deleteAfter={order.deleteAfter} />
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleWhatsapp(order)}
                      className="rounded-lg p-2 transition-colors hover:bg-green-50 dark:hover:bg-green-500/10"
                      title="Send WhatsApp"
                      aria-label={`Send ${order.productName} order on WhatsApp`}
                    >
                      <MessageCircle className="size-4 text-green-600" />
                    </button>
                    <button
                      onClick={async () => {
                        if (!order.id || deletingOrderId) return;
                        if (!window.confirm('Delete this order permanently?')) return;
                        setDeletingOrderId(order.id);
                        try {
                          await onDelete(order.id);
                        } finally {
                          setDeletingOrderId(null);
                        }
                      }}
                      disabled={deletingOrderId === order.id}
                      className="rounded-lg p-2 text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete order"
                      aria-label={`Delete ${order.productName} order`}
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {orders.length === 0 ? 'No orders found' : 'No orders match that product ID'}
          </p>
        </div>
      )}
    </div>
  );
}
