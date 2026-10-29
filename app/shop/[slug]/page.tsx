import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductDetail from '@/components/product/ProductDetail';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import { SectionHeading } from '@/components/ui';
import { InlineCrumbs } from '@/components/PageHero';
import { getProduct, products, categoryMap } from '@/data/products';
import { site } from '@/data/site';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.name,
    description: `${product.shortDescription} ${product.name} from IDRISIYA COUTURE — order on WhatsApp.`,
    openGraph: {
      title: `${product.name} | IDRISIYA COUTURE`,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && (p.category === product.category || p.featured))
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `${site.url}${product.image}`,
    description: product.description,
    brand: { '@type': 'Brand', name: 'IDRISIYA COUTURE' },
    ...(product.price !== null
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'NGN',
            price: product.price,
            availability: 'https://schema.org/InStock',
            url: `${site.url}/shop/${product.slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="border-b border-charcoal/10 bg-ivory">
        <div className="shell py-4">
          <InlineCrumbs label={product.name} />
        </div>
      </div>

      <section className="bg-ivory py-8 md:py-12">
        <div className="shell">
          <ProductDetail product={product} />

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-charcoal/10 pt-6 sm:flex-row sm:items-center">
            <Link href="/shop" className="btn-link text-charcoal">
              ← Back to the collection
            </Link>
            <p className="text-[0.72rem] font-light text-charcoal/50">
              Category:{' '}
              <Link
                href={`/shop?category=${product.category}`}
                className="text-gold-deep underline decoration-gold/40 underline-offset-4"
              >
                {categoryMap[product.category].name}
              </Link>{' '}
              · Location: {site.location.full}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-charcoal/10 bg-[#FBF6EC] py-14 md:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Complete the look"
              title="You may also love"
              subtitle="Pieces that pair beautifully with this one."
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
