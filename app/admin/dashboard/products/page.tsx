'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { getAllProducts, Product } from '@/lib/supabase/db';
import ProductForm from '@/components/admin/ProductForm';
import ProductTable from '@/components/admin/ProductTable';
import { Plus } from 'lucide-react';

export default function ProductsManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = () => {
    setShowForm(false);
    setEditingProduct(null);
    setSuccessMessage(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
    fetchProducts();
    // Auto-hide success message after 4 seconds
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-6 right-6 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-lg p-4 shadow-lg animate-in fade-in slide-in-from-top-4 z-50">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-green-700 dark:text-green-200">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your dress collection</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(!showForm);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <ProductForm
          initialProduct={editingProduct || undefined}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSuccess={handleProductAdded}
        />
      )}

      {/* Products Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-foreground">Loading products...</p>
          </div>
        </div>
      ) : (
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onProductDeleted={fetchProducts}
        />
      )}
    </div>
  );
}
