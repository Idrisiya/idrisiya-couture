import Link from 'next/link';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import { SectionHeading } from '@/components/ui';
import { newArrivals } from '@/data/products';
import { ArrowRight } from '@/components/Icons';

export default function NewArrivalsSection() {
  return (
    <section className="bg-ivory py-16 md:py-24" aria-labelledby="new-heading">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Just Landed"
              title={<span id="new-heading">Fresh Styles, New Possibilities</span>}
              subtitle="The newest pieces to arrive in the boutique, added as they come in."
              align="left"
            />
            <Link href="/new-arrivals" className="btn-link group shrink-0 text-charcoal">
              All New Arrivals
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {newArrivals.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
