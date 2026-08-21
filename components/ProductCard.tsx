"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/supabase/db";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-elegant hover:shadow-hover transition-all duration-500">
      {/* Image Container */}
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-muted">
        {/* Badge */}
        {product.isSold && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-foreground/35">
            <span className="rounded-full bg-foreground px-5 py-2 text-sm font-bold uppercase tracking-widest text-background shadow-elegant">
              Sold
            </span>
          </div>
        )}
        {(product.isNew || product.isBestSeller) && (
          <div className="absolute top-4 left-4 z-10">
            {product.isNew && (
              <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-semibold rounded-full">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="inline-block bg-accent text-foreground px-3 py-1 text-sm font-semibold rounded-full ml-2">
                Best Seller
              </span>
            )}
          </div>
        )}

        {/* Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover w-full h-full group-hover:scale-105 transition-all duration-500 ${
            isImageLoading ? "blur-sm" : "blur-0"
          }`}
          onLoadingComplete={() => setIsImageLoading(false)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-elegant hover:shadow-hover transition-all duration-300 ease-in-out"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ease-in-out ${
              isWishlisted
                ? "fill-primary text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          />
        </button>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <p className="text-xs font-semibold text-primary uppercase tracking-wider">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Colors Available */}
        <div className="flex gap-2">
          {product.colors.slice(0, 3).map((color) => (
            <div
              key={color}
              className="w-5 h-5 rounded-full border-2 border-border hover:border-primary transition-colors"
              title={color}
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
          ))}
        </div>

        {/* Price and Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <p className="text-2xl font-bold text-primary">GHS {product.price}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link
            href={`/product-view/${product.id}`}
            className="flex-1 px-3 py-2 bg-secondary text-primary rounded-lg font-medium text-center transition-all duration-300 ease-in-out hover:bg-accent hover:text-foreground"
          >
            View
          </Link>
          <Link
            href={`/purchase-confirm/${product.id}`}
            className="flex-1 px-3 py-2 bg-primary text-white rounded-lg font-medium text-center transition-all duration-300 ease-in-out hover:opacity-90 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
