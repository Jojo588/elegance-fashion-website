"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ShoppingBag, Heart } from "lucide-react";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id as string;

  const product = products.find((p) => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

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
              The dress you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

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

      {/* Product Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className={`object-cover w-full h-full ${
                  imageLoading ? "blur-sm" : "blur-0"
                }`}
                onLoadingComplete={() => setImageLoading(false)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    setImageLoading(true);
                  }}
                  className={`relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-primary">
              GHS {product.price}
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Available Colors */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Available Colors
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-border rounded-lg hover:border-primary transition-colors cursor-pointer"
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
                      <span className="font-medium text-foreground">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Sizes */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Available Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="px-4 py-2 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <Link
                href={`/purchase?id=${product.id}`}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Buy Now
              </Link>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-3 rounded-lg font-medium transition-smooth border-2 ${
                  isWishlisted
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-primary"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? "fill-primary" : ""
                  }`}
                />
              </button>
            </div>

            {/* Product Details */}
            <div className="bg-muted/50 p-6 rounded-lg space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product ID:</span>
                <span className="font-semibold text-foreground">
                  {product.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-semibold text-foreground">
                  {product.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sizes:</span>
                <span className="font-semibold text-foreground">
                  {product.sizes.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-t border-border">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Similar Dresses
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products
            .filter(
              (p) =>
                p.category === product.category &&
                p.id !== product.id
            )
            .slice(0, 3)
            .map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-elegant hover:shadow-hover transition-smooth"
              >
                <div className="relative w-full aspect-[2/3] overflow-hidden bg-muted">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-smooth duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground text-lg">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary mt-2">
                    GHS {relatedProduct.price}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
