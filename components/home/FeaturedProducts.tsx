import Link from 'next/link';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import { SectionHeading } from '@/components/ui';
import { featuredProducts } from '@/data/products';
import { ArrowRight } from '@/components/Icons';

export default function FeaturedProducts() {
  return (
    <section className="relative bg-[#FBF6EC] py-16 md:py-24" aria-labelledby="collection-heading">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Featured Selection"
              title={<span id="collection-heading">The Couture Collection</span>}
              subtitle="Discover beautiful pieces selected to complement your style."
              align="left"
            />
            <Link href="/shop" className="btn-link group shrink-0 text-charcoal">
              View All Products
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {featuredProducts.slice(0, 8).map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 70} className="h-full">
              <ProductCard product={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-center text-[0.65rem] uppercase tracking-[0.16em] text-charcoal/40">
            Prices are a guide — every order is confirmed with you on WhatsApp.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
