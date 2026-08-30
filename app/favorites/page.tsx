"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import useSWR from "swr";
import { getAllProducts, type Product } from "@/lib/supabase/db";
import { useFavorites } from "@/lib/favorites";

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const { data: products = [], isLoading } = useSWR<Product[]>("/favorites/products", getAllProducts);
  const favoriteProducts = favoriteIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Your collection</p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">My Favourites</h1>
          <p className="max-w-2xl text-muted-foreground">Keep the pieces you love close and return to them whenever you are ready.</p>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {favoriteProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="size-7" />
            </div>
            <h2 className="font-serif text-3xl font-semibold text-foreground">Nothing saved yet</h2>
            <p className="max-w-md text-muted-foreground">Tap the heart on any product to build your personal favourites collection.</p>
            <Link href="/#products" className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90">Browse products</Link>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
