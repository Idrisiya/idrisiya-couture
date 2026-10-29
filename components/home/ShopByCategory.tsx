import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { SectionHeading } from '@/components/ui';
import { categories, products } from '@/data/products';
import { ArrowRight } from '@/components/Icons';

export default function ShopByCategory() {
  return (
    <section className="relative bg-ivory py-16 md:py-24" aria-labelledby="categories-heading">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Shop by Category"
            title={<span id="categories-heading">Find Your Style</span>}
            subtitle="Explore fashion for every mood, moment, and occasion."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-14 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const count = products.filter((p) => p.category === cat.slug).length;
            return (
              <Reveal key={cat.slug} delay={(i % 4) * 70} className="h-full">
                <Link
                  href={`/shop?category=${cat.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden border border-charcoal/10 bg-cocoa"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 46vw, (max-width: 1024px) 31vw, 23vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10 opacity-95 transition-opacity duration-500 group-hover:from-black/95"
                    aria-hidden
                  />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="text-[0.52rem] uppercase tracking-[0.26em] text-gold-light/90">
                      {count} {count === 1 ? 'piece' : 'pieces'}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg leading-tight text-ivory sm:text-xl">{cat.name}</h3>
                    <span className="mt-2.5 flex items-center gap-2 text-[0.56rem] uppercase tracking-[0.22em] text-gold">
                      Explore
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>

                  <span
                    className="pointer-events-none absolute inset-2 border border-transparent transition-colors duration-500 group-hover:border-gold/45"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            );
          })}

          {/* Shop-all tile keeps the grid complete and elegant */}
          <Reveal delay={140} className="h-full">
            <Link
              href="/shop"
              className="group relative flex aspect-[4/5] flex-col items-center justify-center gap-3 border border-gold/45 bg-ink p-5 text-center transition-colors duration-500 hover:border-gold"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-transform duration-500 group-hover:scale-110">
                <ArrowRight className="h-5 w-5" />
              </span>
              <p className="font-display text-xl leading-tight text-ivory">Shop All Pieces</p>
              <p className="text-[0.56rem] uppercase tracking-[0.22em] text-gold/80">
                {products.length} styles
              </p>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
