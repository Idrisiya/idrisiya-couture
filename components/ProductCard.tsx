import Image from 'next/image';
import Link from 'next/link';
import {
  availabilityLabel,
  badgeLabel,
  formatNaira,
  isOnSale,
  priceLabel,
  type Product,
} from '@/data/products';
import { productOrderMessage, waLink } from '@/lib/whatsapp';
import { siteUrl } from '@/lib/siteUrl';
import { WhatsApp } from './Icons';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const sale = isOnSale(product);
  const waMessage = productOrderMessage(
    product,
    { size: product.sizes[0], colour: product.colours[0]?.name, quantity: 1 },
    siteUrl,
  );

  return (
    <article className="product-card group">
      <Link href={`/shop/${product.slug}`} className="product-media block" aria-label={`View ${product.name}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          className="object-cover"
        />

        {/* badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badge && (
            <span className={`badge ${product.badge === 'sale' ? '!bg-[#7d1f1a]/90 !text-ivory' : ''}`}>
              {badgeLabel[product.badge]}
            </span>
          )}
        </div>

        {/* hover action */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/88 py-3 text-center text-[0.6rem] uppercase tracking-[0.24em] text-gold-light backdrop-blur transition-transform duration-400 group-hover:translate-y-0">
          View Details
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[0.56rem] uppercase tracking-[0.24em] text-charcoal/45">
          {availabilityLabel[product.availability]}
        </p>

        <h3 className="mt-2 h-card text-[1.12rem] leading-snug text-charcoal">
          <Link href={`/shop/${product.slug}`} className="transition-colors hover:text-gold-deep">
            {product.name}
          </Link>
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[0.8rem] font-light leading-relaxed text-charcoal/60">
          {product.shortDescription}
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-lg text-charcoal">
            {product.price === null ? <span className="text-[0.95rem] italic">Contact for Price</span> : priceLabel(product)}
          </span>
          {sale && product.compareAt && (
            <span className="text-[0.72rem] text-charcoal/40 line-through">{formatNaira(product.compareAt)}</span>
          )}
        </div>

        {/* size / colour hints */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="text-[0.58rem] uppercase tracking-[0.14em] text-charcoal/40">
            {product.sizes.length > 1 ? `${product.sizes[0]} – ${product.sizes[product.sizes.length - 1]}` : product.sizes[0]}
          </span>
          <span className="flex items-center gap-1.5" aria-label={`Colours: ${product.colours.map((c) => c.name).join(', ')}`}>
            {product.colours.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-2.5 w-2.5 rounded-full ring-1 ring-charcoal/15"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </span>
        </div>

        <div className="mt-4 space-y-2 pt-1">
          <AddToCartButton product={product} className="btn btn-dark w-full !py-2.5 !text-[0.6rem]" />
          <a
            href={waLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn w-full border border-[#1f8a4c]/30 bg-[#25D366]/8 !py-2.5 !text-[0.6rem] !tracking-[0.18em] text-[#15733f] transition-colors hover:bg-[#25D366]/16"
          >
            <WhatsApp className="h-3.5 w-3.5" />
            WhatsApp Order
          </a>
        </div>
      </div>
    </article>
  );
}
