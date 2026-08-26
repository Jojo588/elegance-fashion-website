"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Product, getAllProducts, getFeaturedProducts, getNewArrivals, getBestSellers, getProductsByCategory } from "@/lib/supabase/db";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  initialFilter?: "featured" | "new" | "bestsellers" | "all";
  category?: string;
}

export default function ProductGrid({
  title = "Our Products",
  subtitle = "Discover our beautiful collection",
  showFilters = true,
  initialFilter = "all",
  category,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data: Product[] = [];
        
        if (category) {
          data = await getProductsByCategory(category);
        } else if (initialFilter === "featured") {
          data = await getFeaturedProducts();
        } else if (initialFilter === "new") {
          data = await getNewArrivals();
        } else if (initialFilter === "bestsellers") {
          data = await getBestSellers();
        } else {
          data = await getAllProducts();
        }
        
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [initialFilter, category]);

  // Get categories
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [products]);

  useEffect(() => {
    setVisibleCount(9);
  }, [searchQuery, selectedCategory, priceRange, sortBy, initialFilter, category]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products using the selected option first.
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
        default:
          return (b.createdAt || 0) - (a.createdAt || 0);
      }
    });

    // Keep sold products in the queue: available products always appear first,
    // while sold products retain their selected sort order at the end.
    const availableProducts = filtered.filter((product) => !product.isSold);
    const soldProducts = filtered.filter((product) => product.isSold);

    return [...availableProducts, ...soldProducts];
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < filteredProducts.length;

  return (
    <section className="w-full min-w-0 overflow-hidden bg-background px-4 py-10 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 md:mb-14">
          <h2 className="text-balance text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">{subtitle}</p>
        </div>

        {showFilters && (
          <>
            {/* Search Bar */}
            <div className="mb-8 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border-2 border-border bg-background py-3 pl-12 pr-4 text-sm transition-colors focus:border-primary focus:outline-none sm:text-base"
              />
            </div>

            {/* Filters */}
            <div className="mb-10">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-border rounded-lg mb-4 hover:border-primary transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>

              {/* Filter Container */}
              <div
                className={`${
                  showMobileFilters ? "block" : "hidden"
                } md:flex md:gap-6 md:items-center md:flex-wrap pb-6 border-b-2 border-border`}
              >
                {/* Category Filter */}
                <div className="mb-4 md:mb-0">
                  <label className="text-sm font-semibold text-foreground block mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-lg border-2 border-border bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none sm:w-auto sm:px-4"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-4 min-w-0 flex-1 md:mb-0">
                  <label className="text-sm font-semibold text-foreground block mb-2">
                    Price: GHS {priceRange[0]} - GHS {priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-primary"
                  />
                </div>

                {/* Sort */}
                <div className="mb-4 md:mb-0">
                  <label className="text-sm font-semibold text-foreground block mb-2">
                    Sort
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-lg border-2 border-border bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none sm:w-auto sm:px-4"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-foreground">Loading products...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {visibleProducts.length} of {filteredProducts.length} products
              </p>
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2" aria-label="Product categories">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${selectedCategory === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${selectedCategory === cat ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
          <>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-8">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {hasMoreProducts && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + 9)}
                className="rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Show More Products
              </button>
            </div>
          )}
          </>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No products found. Try adjusting your filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
