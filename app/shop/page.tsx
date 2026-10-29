import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '@/components/PageHero';
import ShopBrowser from '@/components/shop/ShopBrowser';
import { categories, products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop the Collection',
  description:
    "Browse the full IDRISIYA COUTURE collection — elegant dresses, two-piece sets, tops, corporate and occasion wear, and gold accessories. Search, filter and order on WhatsApp.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const requestedCategory = sp.category ?? 'all';
  const validCategory = categories.some((c) => c.slug === requestedCategory) ? requestedCategory : 'all';
  const activeCategory = categories.find((c) => c.slug === validCategory);

  return (
    <>
      <PageHero
        eyebrow={activeCategory ? activeCategory.name : 'The Boutique'}
        title={activeCategory ? activeCategory.short : 'Shop the Collection'}
        subtitle={
          activeCategory
            ? activeCategory.blurb
            : `${products.length} pieces, each one chosen to make getting dressed feel like the good part of the day. Sizes and final prices are confirmed with you on WhatsApp.`
        }
        crumbs={[{ label: 'Shop', href: '/shop' }, ...(activeCategory ? [{ label: activeCategory.short }] : [])]}
        image={activeCategory ? activeCategory.image : '/images/atelier-threads.jpg'}
      />

      <section className="bg-ivory py-10 md:py-14">
        <div className="shell">
          <Suspense
            fallback={
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-charcoal/10" />
                    <div className="mt-3 h-3 w-2/3 bg-charcoal/10" />
                    <div className="mt-2 h-3 w-1/3 bg-charcoal/10" />
                  </div>
                ))}
              </div>
            }
          >
            <ShopBrowser
              title="All products"
              initialCategory={validCategory}
              initialQuery={sp.q ?? ''}
            />
          </Suspense>
        </div>
      </section>

      <section className="border-t border-charcoal/10 bg-[#FBF6EC] py-10">
        <div className="shell flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <p className="font-display text-xl text-charcoal">Not sure which size to choose?</p>
            <p className="mt-1.5 text-[0.82rem] font-light text-charcoal/55">
              Send us your measurements on WhatsApp — we&apos;ll advise before you order.
            </p>
          </div>
          <a
            href="https://wa.me/2347081017665?text=Hello%20IDRISIYA%20COUTURE%2C%20I%20need%20help%20choosing%20a%20size."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            Ask About Sizing
          </a>
        </div>
      </section>
    </>
  );
}
