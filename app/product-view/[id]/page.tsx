'use client';

export const dynamic = 'force-dynamic';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Download } from 'lucide-react';
import { getProductById, Product } from '@/lib/firestore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProductViewPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const data = await getProductById(productId);
          setProduct(data);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <main className="bg-white">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-foreground">Loading product...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="bg-white">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/" className="btn-primary">
              Back to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(product.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${product.name}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  return (
    <main className="bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-primary rounded-lg font-medium hover:bg-accent transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Download Image</span>
            </button>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Product Name and ID */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Product ID: {product.id}</p>
              <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-3xl font-bold text-primary">GHS {product.price}</p>
            </div>

            {/* Category and Status */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {product.category}
              </span>
              {product.isFeatured && (
                <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
              {product.isNew && (
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  New Arrival
                </span>
              )}
              {product.isBestSeller && (
                <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                  Best Seller
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Description</h2>
              <p className="text-foreground/80 leading-relaxed">{product.description}</p>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">Available Sizes</h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <div key={size} className="px-4 py-2 border-2 border-primary rounded-lg text-primary font-medium">
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">Available Colors</h2>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className="px-4 py-2 border-2 border-muted-foreground rounded-lg text-foreground font-medium"
                    >
                      {color}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Ready to purchase? Click the button below to proceed with your order.
              </p>
              <Link href={`/purchase-confirm/${product.id}`} className="btn-primary w-full text-center">
                Continue to Purchase
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
