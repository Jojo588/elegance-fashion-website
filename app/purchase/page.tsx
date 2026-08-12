"use client";

export const dynamic = "force-dynamic";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { getProductById, addOrder, Product } from "@/lib/supabase/db";
import { openWhatsAppChat, OrderDetails } from "@/lib/whatsapp";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function PurchasePageContent() {
  const searchParams = useSearchParams();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch product from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = searchParams.get("id");
        if (productId) {
          const data = await getProductById(productId);
          setProduct(data);
          if (data) {
            setSelectedSize(data.sizes[0] || "");
            setSelectedColor(data.colors[0] || "");
          }
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [searchParams]);

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
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Product Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              Please select a product to purchase.
            </p>
            <Link href="/" className="btn-primary">
              Back to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const handleOrderSubmit = async () => {
    if (!product || !selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }

    setIsSubmitting(true);

    try {
      const totalPrice = product.price * quantity;

      // Save order to Supabase
      await addOrder({
        productId: product.id || "",
        productName: product.name,
        productImage: product.image,
        size: selectedSize,
        color: selectedColor,
        quantity,
        price: product.price,
        totalPrice,
        customerName: customerName || undefined,
        customerLocation: customerLocation || undefined,
        status: "pending",
        whatsappSent: true,
      });

      const orderDetails: OrderDetails = {
        productId: product.id || "",
        productName: product.name,
        size: selectedSize,
        color: selectedColor,
        quantity,
        price: totalPrice,
        imageUrl: product.image,
        customerName: customerName || undefined,
        customerLocation: customerLocation || undefined,
      };

      // Open WhatsApp with order details
      openWhatsAppChat(orderDetails);
    } catch (error) {
      console.error("Failed to save order:", error);
      alert("Failed to process order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <main className="bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Shop
        </Link>
      </div>

      {/* Purchase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Product Summary */}
          <div className="md:col-span-1">
            <div className="sticky top-32 bg-muted/50 rounded-lg p-6 space-y-6">
              {/* Product Image */}
              <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary uppercase">
                  {product.category}
                </p>
                <h2 className="text-2xl font-bold text-foreground">
                  {product.name}
                </h2>
                <p className="text-3xl font-bold text-primary">
                  GHS {product.price}
                </p>
              </div>

              {/* Product ID */}
              <div className="p-3 bg-white rounded border-2 border-border">
                <p className="text-xs text-muted-foreground mb-1">Product ID</p>
                <p className="text-lg font-bold text-foreground font-mono">
                  {product.id}
                </p>
              </div>

              {/* Selection Summary */}
              <div className="space-y-2 border-t-2 border-border pt-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="font-semibold">{selectedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Color:</span>
                  <span className="font-semibold">{selectedColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-semibold">{quantity}</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-primary/10 rounded p-4 border-2 border-primary">
                <p className="text-muted-foreground text-sm mb-1">Total Price</p>
                <p className="text-3xl font-bold text-primary">
                  GHS {totalPrice}
                </p>
              </div>
            </div>
          </div>

          {/* Purchase Form */}
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Complete Your Order
              </h1>
              <p className="text-lg text-muted-foreground">
                Select your preferences and we&apos;ll send you everything via WhatsApp
              </p>
            </div>

            {/* Form */}
            <div className="space-y-8">
              {/* Size Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Select Size <span className="text-primary">*</span>
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-2 sm:px-4 rounded-lg font-semibold transition-all border-2 ${
                        selectedSize === size
                          ? "bg-primary text-white border-primary"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Select Color <span className="text-primary">*</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                        selectedColor === color
                          ? "bg-primary/10 border-primary"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-400"
                        style={{
                          backgroundColor:
                            color === "Pink"
                              ? "#e74c8c"
                              : color === "White"
                              ? "#ffffff"
                              : color === "Black"
                              ? "#2d2d2d"
                              : color === "Beige"
                              ? "#d4af9b"
                              : color === "Navy"
                              ? "#001f3f"
                              : color === "Burgundy"
                              ? "#800020"
                              : color === "Cream"
                              ? "#fffdd0"
                              : color === "Blush"
                              ? "#f5a3c7"
                              : color === "Ivory"
                              ? "#fffff0"
                              : color === "Rose"
                              ? "#ff007f"
                              : color === "Mauve"
                              ? "#ae6b9d"
                              : color === "Gray"
                              ? "#999999"
                              : color === "Floral"
                              ? "#e74c8c"
                              : color === "Pastel"
                              ? "#c8b4d8"
                              : "#e8ddd9",
                        }}
                      />
                      <span className="font-medium">{color}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Quantity <span className="text-primary">*</span>
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border-2 border-border rounded-lg hover:border-primary transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-20 text-center px-3 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border-2 border-border rounded-lg hover:border-primary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Optional Customer Info */}
              <div className="space-y-4 bg-muted/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground">
                  Additional Information (Optional)
                </h3>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location/Delivery Area
                  </label>
                  <input
                    type="text"
                    value={customerLocation}
                    onChange={(e) => setCustomerLocation(e.target.value)}
                    placeholder="Enter your location"
                    className="w-full px-4 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleOrderSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-smooth ${
                  isSubmitting
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "btn-primary"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                {isSubmitting ? "Opening WhatsApp..." : "Order via WhatsApp"}
              </button>

              {/* Info Box */}
              <div className="bg-secondary/50 p-4 rounded-lg border-2 border-secondary">
                <p className="text-sm text-foreground leading-relaxed">
                  <strong>How it works:</strong> Click the button above to open WhatsApp. We&apos;ll automatically include all your order details including the product ID, size, color, quantity, and price. Just send the message and our team will respond with payment and delivery options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function PurchasePage() {
  return (
    <Suspense
      fallback={
        <main className="bg-white">
          <Navbar />
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-foreground">Loading...</p>
            </div>
          </div>
          <Footer />
        </main>
      }
    >
      <PurchasePageContent />
    </Suspense>
  );
}
