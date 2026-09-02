import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[620px] w-full min-w-0 items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-background to-accent-light px-4 py-20 sm:min-h-[680px] sm:px-6 md:min-h-[740px] md:py-24 lg:min-h-[820px] lg:px-8">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-accent rounded-full opacity-20 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
          {/* Main Heading */}
          <h1 className="text-balance text-3xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Discover Your
            <br />
            <span className="gradient-text">Style Hub</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Explore a curated world of fashion, beauty, and lifestyle finds—from clothes, bags, and shoes to jewelry, cosmetics, room decor, and more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/#products"
              className="btn-primary"
            >
              Shop Now
            </Link>
            <Link
              href="/#featured"
              className="btn-outline"
            >
              View Featured
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto grid w-full max-w-2xl grid-cols-3 items-center justify-items-center gap-4 pt-8 text-center sm:gap-8 md:pt-12">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Products</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">10K+</p>
              <p className="text-sm text-muted-foreground">Customers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">4.9★</p>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}
