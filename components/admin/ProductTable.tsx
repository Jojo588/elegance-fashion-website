'use client';

import { Product, deleteProduct } from '@/lib/supabase/db';
import { Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

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
  const [search, setSearch] = useState('');
  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) => product.id.toLowerCase().includes(term));
  }, [products, search]);

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
    <div className="bg-card text-card-foreground rounded-lg shadow-elegant overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b border-border p-3 sm:flex-nowrap sm:p-4">
        <Search className="size-4 text-muted-foreground" aria-hidden="true" />
        <label htmlFor="product-id-search" className="sr-only">Search products by ID</label>
        <input
          id="product-id-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by product ID"
          className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
        />
        <span className="text-sm text-muted-foreground">{filteredProducts.length} results</span>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[760px] table-fixed">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-[34%] px-3 py-3 text-left text-sm font-semibold text-foreground sm:px-6 sm:py-4">
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
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                {/* Product Info */}
                <td className="px-3 py-3 align-middle sm:px-6 sm:py-4">
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-12">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 whitespace-nowrap">
                      <p className="truncate font-medium text-foreground">{product.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        ID: {product.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="px-3 py-3 align-middle sm:px-6 sm:py-4">
                  <p className="whitespace-nowrap font-medium text-foreground">
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
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-200 text-xs rounded">
                        New
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-200 text-xs rounded">
                        Best Seller
                      </span>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-3 py-3 align-middle sm:px-6 sm:py-4">
                  <div className="flex items-center justify-end gap-1.5 sm:gap-2">
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {products.length === 0 ? 'No products found' : 'No products match that ID'}
          </p>
        </div>
      )}
    </div>
  );
}
