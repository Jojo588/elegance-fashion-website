'use client';

import { Product, deleteProduct } from '@/lib/firestore';
import { Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onProductDeleted: () => void;
}

export default function ProductTable({
  products,
  onEdit,
  onProductDeleted,
}: ProductTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this product?')) return;

    setDeletingId(id);
    try {
      await deleteProduct(id);
      onProductDeleted();
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    } finally {
      setDeletingId(null);
    }
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
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Category
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                {/* Product Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ID: {product.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">
                    GHS {product.price}
                  </p>
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-secondary text-primary text-sm rounded-full">
                    {product.category}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-center flex-wrap">
                    {product.isFeatured && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        Featured
                      </span>
                    )}
                    {product.isNew && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        New
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                        Best Seller
                      </span>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-primary" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
}
