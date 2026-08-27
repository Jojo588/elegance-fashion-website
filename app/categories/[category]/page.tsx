import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";

export const metadata = {
  title: "Category - Niella's FashionHub",
  description: "Browse products in this category",
};

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = decodeURIComponent(params.category);
  const displayName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <main className="min-w-0 overflow-x-hidden bg-background text-foreground">
      <Navbar />
      
      <section className="bg-white">
        <ProductGrid
          title={displayName}
          subtitle={`Browse our ${displayName.toLowerCase()} collection`}
          showFilters={true}
          initialFilter="all"
          category={categoryName}
        />
      </section>

      <Footer />
    </main>
  );
}
