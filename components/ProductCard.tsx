"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/supabase/db";
import { useState } from "react";
import { useFavorites } from "@/lib/favorites";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const isWishlisted = isFavorite(product.id);

  return (
    <div className="group flex min-w-0 max-w-full flex-col overflow-hidden rounded-lg bg-background shadow-elegant transition-all duration-500 hover:shadow-hover">
      {/* Image Container */}
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-muted">
        {/* Badge */}
        {product.isSold && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-foreground/35">
            <span className="rounded-full bg-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-background shadow-elegant sm:px-5 sm:py-2 md:text-sm">
              Sold
            </span>
          </div>
        )}
        {(product.isNew || product.isBestSeller) && (
          <div className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-4.5rem)] flex-wrap gap-1.5 sm:left-4 sm:top-4 sm:gap-2">
            {product.isNew && (
              <span className="inline-block rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-white sm:px-3 sm:text-xs md:text-sm">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="inline-block rounded-full bg-accent px-2 py-1 text-[10px] font-semibold text-foreground sm:px-3 sm:text-xs md:text-sm">
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
          type="button"
          aria-label={isWishlisted ? `Remove ${product.name} from favourites` : `Add ${product.name} to favourites`}
          aria-pressed={isWishlisted}
          onClick={(event) => {
            event.preventDefault();
            toggleFavorite(product.id);
          }}
          className="absolute right-4 top-4 z-20 rounded-full bg-background p-2 text-foreground shadow-elegant transition-all duration-300 ease-in-out hover:shadow-hover"
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
      <div className="flex flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        {/* Category */}
        <p className="text-xs font-semibold text-primary uppercase tracking-wider">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="line-clamp-2 text-xs font-semibold text-foreground transition-colors group-hover:text-primary md:text-lg">
          {product.name}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-xs text-muted-foreground md:text-sm">
          {product.description}
        </p>

        {/* Price and Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <p className="text-base font-bold text-primary md:text-2xl">GHS {product.price}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex min-w-0 flex-col gap-2 pt-2 min-[420px]:flex-row">
          <Link
            href={`/product-view/${product.id}`}
            className="flex-1 rounded-lg bg-secondary px-2 py-2 text-center text-[11px] font-medium text-primary transition-all duration-300 ease-in-out hover:bg-accent hover:text-foreground md:px-3 md:text-sm"
          >
            View
          </Link>
          <Link
            href={`/purchase-confirm/${product.id}`}
            className="flex-1 rounded-lg bg-primary px-2 py-2 text-center text-[11px] font-medium text-white transition-all duration-300 ease-in-out hover:opacity-90 flex items-center justify-center gap-1 md:px-3 md:text-sm md:gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
