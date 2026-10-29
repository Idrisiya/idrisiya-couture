import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import { SectionHeading } from '@/components/ui';
import { newArrivals, products } from '@/data/products';
import { ArrowRight, WhatsApp } from '@/components/Icons';
import { site } from '@/data/site';
import { generalMessage, waLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'New Arrivals',
  description:
    'Fresh styles, new possibilities — the latest pieces to arrive at IDRISIYA COUTURE, the luxury women\'s fashion boutique in Ogun State, Nigeria.',
};

const arrivals = newArrivals;

export default function NewArrivalsPage() {
  return (
    <>
      <PageHero
        eyebrow="Just Landed"
        title={
          <>
            Fresh Styles,
            <br />
            <span className="italic text-gold-light">New Possibilities</span>
          </>
        }
        subtitle="The newest additions to the boutique, grouped here as they arrive. When a piece is gone, it's gone — message us to reserve yours."
        crumbs={[{ label: 'New Arrivals' }]}
        image="/images/p-ankara-set.jpg"
      />

      <section className="bg-ivory py-12 md:py-16">
        <div className="shell">
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {arrivals.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 70} className="h-full">
                <ProductCard product={p} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-cocoa relative overflow-hidden py-14 md:py-20">
        <div className="shell relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Never Miss a Drop"
              title="New pieces are added regularly"
              subtitle="Tell us what you're looking for and we'll let you know as soon as something similar arrives in the boutique."
              dark
              align="left"
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href={waLink(
                  `Hello ${site.name}, please let me know when new arrivals come in. My style preference: `,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                <WhatsApp className="h-4 w-4" />
                Ask About New Stock
              </a>
              <Link href="/shop" className="btn btn-outline-gold group">
                Shop All {products.length}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
