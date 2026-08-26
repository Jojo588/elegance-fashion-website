'use client';

export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { getProductById, Product } from '@/lib/supabase/db';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PurchaseConfirmPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

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

  const handleContinuePurchase = () => {
    const orderSummary = {
      productId: product?.id,
      productName: product?.name,
      price: product?.price,
      quantity,
      size: 'Not applicable',
      color: 'Not applicable',
      total: (product?.price || 0) * quantity,
    };

    // Store order summary in sessionStorage
    sessionStorage.setItem('orderSummary', JSON.stringify(orderSummary));

    // Redirect to purchase page
    router.push(`/purchase?id=${productId}`);
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <main className="bg-background">
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
      <main className="bg-background">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're trying to purchase doesn't exist.</p>
            <button onClick={handleCancel} className="btn-primary">
              Back to Shop
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <main className="bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleCancel}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Go Back</span>
        </button>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-1">Purchase Confirmation</h2>
              <p className="text-blue-800">
                Please review your order details below. Do you want to continue with this purchase?
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image and Details */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>

          {/* Order Details and Selection */}
          <div className="space-y-6">
            {/* Price Information */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-foreground font-medium">Unit Price:</span>
                <span className="text-lg font-semibold text-primary">GHS {product.price.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-foreground font-medium">Quantity:</span>
                  <div className="flex items-center gap-3 bg-background border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-primary hover:bg-primary/10 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 font-semibold text-foreground">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-primary hover:bg-primary/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground">Total:</span>
                  <span className="text-2xl font-bold text-primary">GHS {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleContinuePurchase}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Yes, Continue Purchase</span>
              </button>
              <button
                onClick={handleCancel}
                className="w-full px-4 py-3 bg-gray-200 text-foreground rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                No, Go Back
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Next Step:</span> After confirming, you'll be able to complete your purchase and contact us via WhatsApp or email.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
