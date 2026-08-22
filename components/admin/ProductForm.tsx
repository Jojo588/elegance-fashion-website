'use client';

import { useState } from 'react';
import { addProduct, updateProduct, Product } from '@/lib/supabase/db';
import { uploadProductImage, deleteProductImage } from '@/lib/supabase/storage';
import { X } from 'lucide-react';

interface ProductFormProps {
  initialProduct?: Product;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProductForm({
  initialProduct,
  onClose,
  onSuccess,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialProduct?.images?.length ? initialProduct.images : initialProduct?.image ? [initialProduct.image] : []);
  const [formData, setFormData] = useState({
    name: initialProduct?.name || '',
    price: initialProduct?.price || 0,
    description: initialProduct?.description || '',
    category: initialProduct?.category || 'Casual',
    sizes: initialProduct?.sizes || ['S', 'M', 'L', 'XL'],
    colors: initialProduct?.colors || ['Pink', 'White'],
    isFeatured: initialProduct?.isFeatured || false,
    isNew: initialProduct?.isNew || false,
    isBestSeller: initialProduct?.isBestSeller || false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;
    
    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      finalValue = parseFloat(value) || 0;
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setImageFiles(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    setUploadProgress(0);

    try {
      // Validation: Check required fields
      if (!formData.name.trim()) {
        throw new Error('Product name is required');
      }
      if (formData.price <= 0) {
        throw new Error('Price must be greater than 0');
      }
      
      let imageUrls = initialProduct?.images?.length ? initialProduct.images : initialProduct?.image ? [initialProduct.image] : [];
      if (imageFiles.length) {
        setUploadProgress(30);
        imageUrls = await Promise.all(imageFiles.map(uploadProductImage));
        setUploadProgress(90);
      } else if (!imageUrls.length) {
        imageUrls = ['https://via.placeholder.com/400x500?text=' + encodeURIComponent(formData.name)];
        setUploadProgress(90);
      }

      const productData = { ...formData, image: imageUrls[0], images: imageUrls };

      if (initialProduct?.id) {
        console.log('[v0] Updating existing product:', initialProduct.id);
        await updateProduct(initialProduct.id, productData);
        console.log('[v0] Product update successful');
        setSuccess('Product updated successfully!');
      } else {
        console.log('[v0] Adding new product:', formData.name);
        const newProductId =         await addProduct(productData);
        console.log('[v0] Product added successfully with ID:', newProductId);
        setSuccess('Product added successfully!');
      }

      setUploadProgress(100);
      console.log('[v0] Product save completed successfully');
      
      // Wait for success message to show, then close
      setTimeout(() => {
        console.log('[v0] Calling onSuccess callback');
        onSuccess();
      }, 800);
    } catch (err: any) {
      console.error('[v0] Error in product form submission:', err);
      console.error('[v0] Error details:', err.message);
      setError(err.message || 'Failed to save product');
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full my-8">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            {initialProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-96 overflow-y-auto">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Product Image
            </label>
            <div className="flex gap-4">
              <div className="flex flex-wrap gap-2">
                {imagePreviews.map((preview, index) => (
                  <img key={`${preview}-${index}`} src={preview} alt={`Product preview ${index + 1}`} className="w-20 h-20 object-cover rounded-lg" />
                ))}
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Floral Summer Dress"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Price (GHS)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="250"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option>Dresses</option>
                <option>Tops</option>
                <option>Shoes</option>
                <option>Bags</option>
                <option>Accessories</option>
                <option>Casual</option>
                <option>Evening</option>
                <option>Party</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-medium text-foreground">Featured</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleInputChange}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-medium text-foreground">New Arrival</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isBestSeller"
                checked={formData.isBestSeller}
                onChange={handleInputChange}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-medium text-foreground">Best Seller</span>
            </label>
          </div>

          {/* Success */}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Upload Progress */}
          {loading && uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {uploadProgress}% - {uploadProgress < 50 ? 'Uploading image...' : 'Saving product...'}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn-secondary flex-1 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? `Saving... ${uploadProgress}%` : initialProduct ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
