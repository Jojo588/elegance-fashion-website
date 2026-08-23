import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Niella's FashionHub - Fashion, Beauty & Lifestyle",
  description: "Shop clothes, bags, shoes, accessories, jewelry, cosmetics, room decor, and more at Niella's FashionHub.",
};

export default function HomePage() {

  return (
    <main className="bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Section */}
      <section id="featured" className="bg-white">
        <ProductGrid
          title="Featured Collection"
          subtitle="Handpicked pieces for the elegant woman"
          showFilters={false}
          initialFilter="featured"
        />
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                Premium
              </div>
              <p className="text-foreground text-lg dark:text-black">
                High-quality fabrics and craftsmanship
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                Affordable
              </div>
              <p className="text-foreground text-lg dark:text-black">
                Luxury doesn&apos;t have to break the bank
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                Instant
              </div>
              <p className="text-foreground text-lg dark:text-black">
                Order via WhatsApp for quick service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section id="new-arrivals">
        <ProductGrid
          title="New Arrivals"
          subtitle="Fresh styles added weekly"
          showFilters={false}
          initialFilter="new"
        />
      </section>

      {/* Best Sellers Section */}
      <section id="best-sellers" className="bg-muted/20">
        <ProductGrid
          title="Best Sellers"
          subtitle="Customer favorites"
          showFilters={false}
          initialFilter="bestsellers"
        />
      </section>

      {/* All Products Section */}
      <section id="products" className="bg-white">
        <ProductGrid
          title="Browse All Products"
          subtitle="Shop dresses, shoes, accessories, and more"
          showFilters={true}
        />
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Ready to find your next favorite?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Browse our stunning collection and place your order directly through WhatsApp. We&apos;ll help you with everything you need.
          </p>
          <a
            href="#products"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
