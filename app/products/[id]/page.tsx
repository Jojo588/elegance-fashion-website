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
import { useFavorites } from "@/lib/favorites";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id as string;
  const { isFavorite, toggleFavorite } = useFavorites();

  const product = products.find((p) => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const isWishlisted = isFavorite(productId);
  const [imageLoading, setImageLoading] = useState(true);

  if (!product) {
    return (
      <main className="min-h-screen bg-background text-foreground">
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
    <main className="min-h-screen bg-background text-foreground">
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
          <div className="min-w-0 space-y-6 rounded-lg bg-card p-6 text-card-foreground shadow-elegant md:p-8">
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
                type="button"
                aria-label={isWishlisted ? `Remove ${product.name} from favourites` : `Add ${product.name} to favourites`}
                aria-pressed={isWishlisted}
                onClick={() => toggleFavorite(productId)}
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
            <div className="rounded-lg bg-muted p-6 text-card-foreground shadow-elegant">
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
                className="group bg-card text-card-foreground rounded-lg overflow-hidden shadow-elegant hover:shadow-hover transition-smooth"
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
