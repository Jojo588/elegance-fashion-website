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
  title = "Our Dresses",
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

  // Fetch products from Firebase
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
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats).sort();
  }, []);

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

    // Sort
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

    return filtered;
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {showFilters && (
          <>
            {/* Search Bar */}
            <div className="mb-8 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search dresses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors bg-white"
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
                    className="px-4 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors bg-white"
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
                <div className="mb-4 md:mb-0 flex-1 min-w-max">
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
                    className="px-4 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors bg-white"
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
              <p className="text-foreground">Loading dresses...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredProducts.length} dresses
            </p>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No dresses found. Try adjusting your filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
