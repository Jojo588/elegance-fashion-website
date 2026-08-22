'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useMemo, useState } from 'react';
import { getAllProducts, getAllOrders, Product, Order } from '@/lib/supabase/db';
import { Package, ShoppingCart, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, ordersData] = await Promise.all([
          getAllProducts(),
          getAllOrders(),
        ]);
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalRevenue = orders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const [showRevenueBreakdown, setShowRevenueBreakdown] = useState(false);

  const monthlyRevenue = useMemo(() => {
    const totals = new Map<string, number>();

    orders
      .filter((order) => order.status === 'delivered')
      .forEach((order) => {
        const date = new Date(order.createdAt);
        if (Number.isNaN(date.getTime())) return;
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        totals.set(key, (totals.get(key) ?? 0) + order.totalPrice);
      });

    return Array.from(totals.entries()).sort(([a], [b]) => b.localeCompare(a));
  }, [orders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to your Elegance Fashion admin portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-white rounded-lg shadow-elegant p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Products</p>
              <p className="text-3xl font-bold text-foreground mt-2">{products.length}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Package className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-lg shadow-elegant p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-foreground mt-2">{orders.length}</p>
            </div>
            <div className="bg-accent/10 p-3 rounded-lg">
              <ShoppingCart className="w-8 h-8 text-accent" />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <button
          type="button"
          onClick={() => setShowRevenueBreakdown((visible) => !visible)}
          aria-expanded={showRevenueBreakdown}
          className="bg-white rounded-lg shadow-elegant p-6 text-left transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-foreground mt-2">GHS {totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {showRevenueBreakdown ? 'Hide monthly breakdown' : 'Click to view monthly revenue'}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </button>

        {/* Pending Orders */}
        <div className="bg-white rounded-lg shadow-elegant p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Pending Orders</p>
              <p className="text-3xl font-bold text-foreground mt-2">{pendingOrders}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {showRevenueBreakdown && (
        <section className="bg-white rounded-lg shadow-elegant overflow-hidden" aria-label="Monthly revenue breakdown">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Monthly Revenue</h2>
            <p className="text-sm text-muted-foreground mt-1">Revenue from delivered orders since the app started</p>
          </div>
          <div className="divide-y divide-border">
            {monthlyRevenue.length > 0 ? (
              monthlyRevenue.map(([month, revenue]) => (
                <div key={month} className="flex items-center justify-between p-4">
                  <span className="font-medium text-foreground">
                    {new Date(`${month}-01T00:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <span className="font-semibold text-foreground">GHS {revenue.toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p className="p-6 text-sm text-muted-foreground">No delivered revenue has been recorded yet.</p>
            )}
          </div>
          <div className="flex items-center justify-between p-5 border-t border-border bg-muted">
            <span className="font-bold text-foreground">Total generated</span>
            <span className="text-lg font-bold text-primary">GHS {totalRevenue.toFixed(2)}</span>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-elegant overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Recent Orders</h2>
          </div>
          <div className="divide-y divide-border max-h-96 overflow-y-auto">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="p-4 hover:bg-muted transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{order.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.quantity}x - Size {order.size}
                    </p>
                  </div>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : order.status === 'confirmed'
                      ? 'bg-blue-100 text-blue-700'
                      : order.status === 'shipped'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border bg-muted">
            <Link
              href="/admin/dashboard/orders"
              className="text-primary hover:underline font-medium text-sm"
            >
              View all orders →
            </Link>
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-white rounded-lg shadow-elegant overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Featured Products</h2>
          </div>
          <div className="divide-y divide-border max-h-96 overflow-y-auto">
            {products.filter((p) => p.isFeatured).slice(0, 5).map((product) => (
              <div key={product.id} className="p-4 hover:bg-muted transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">GHS {product.price}</p>
                  </div>
                  <span className="text-primary font-medium text-sm">Featured</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border bg-muted">
            <Link
              href="/admin/dashboard/products"
              className="text-primary hover:underline font-medium text-sm"
            >
              Manage products →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
