'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { availabilityLabel, badgeLabel, formatNaira, isOnSale, type Product } from '@/data/products';
import { site } from '@/data/site';
import { productOrderMessage, waLink } from '@/lib/whatsapp';
import { Check, Minus, Plus, WhatsApp } from '@/components/Icons';
import AddToCartButton from '@/components/AddToCartButton';

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [colour, setColour] = useState(product.colours[0]?.name ?? 'As styled');
  const [quantity, setQuantity] = useState(1);
  const [numberIndex, setNumberIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const gallery = [product.image, ...(product.gallery ?? [])];
  const sale = isOnSale(product);
  const origin = typeof window !== 'undefined' ? window.location.origin : site.url;

  const waMessage = productOrderMessage(product, { size, colour, quantity }, origin);

  const handleAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
      colour,
      quantity,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
      {/* ---------------- gallery ---------------- */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-charcoal/10 bg-[#efe7d8]">
          <Image
            src={gallery[activeImage]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 46vw"
            className="object-cover"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className={`badge ${sale ? '!bg-[#7d1f1a]/90 !text-ivory' : ''}`}>{badgeLabel[product.badge]}</span>
            )}
          </div>
        </div>

        {gallery.length > 1 && (
          <div className="mt-3 flex gap-2">
            {gallery.map((g, i) => (
              <button
                key={g}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`relative h-20 w-16 overflow-hidden border transition-all ${
                  i === activeImage ? 'border-gold' : 'border-charcoal/12 hover:border-charcoal/30'
                }`}
                aria-label={`View image ${i + 1}`}
                aria-pressed={i === activeImage}
              >
                <Image src={g} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 grid grid-cols-3 gap-2 border border-charcoal/10 bg-white p-3 text-center">
          {[
            { t: 'Made to order', s: 'Sizing support' },
            { t: 'Order on WhatsApp', s: 'Personal service' },
            { t: 'Nationwide', s: 'Delivery arranged' },
          ].map((f) => (
            <div key={f.t}>
              <p className="text-[0.6rem] uppercase tracking-[0.12em] text-charcoal/75">{f.t}</p>
              <p className="mt-0.5 text-[0.55rem] uppercase tracking-[0.1em] text-charcoal/40">{f.s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- details ---------------- */}
      <div>
        <p className="text-[0.58rem] uppercase tracking-[0.26em] text-gold-deep">
          {availabilityLabel[product.availability]}
          {product.collection ? ` · ${product.collection}` : ''}
        </p>
        <h1 className="mt-3 font-display text-3xl font-light leading-tight text-charcoal md:text-[2.6rem]">
          {product.name}
        </h1>

        <div className="mt-3 flex items-baseline gap-3">
          <span className="font-display text-2xl text-charcoal">
            {product.price === null ? <span className="italic">Contact for Price</span> : formatNaira(product.price)}
          </span>
          {sale && product.compareAt && (
            <span className="text-sm text-charcoal/40 line-through">{formatNaira(product.compareAt)}</span>
          )}
        </div>
        <p className="mt-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-charcoal/40">
          {product.price === null
            ? 'Message us for the current price and colourways'
            : 'Guide price — confirmed with you before payment'}
        </p>

        <p className="mt-5 text-[0.92rem] font-light leading-relaxed text-charcoal/70">{product.description}</p>

        {product.fabric && (
          <p className="mt-3 text-[0.8rem] font-light text-charcoal/50">
            <span className="uppercase tracking-[0.14em] text-charcoal/40">Fabric:</span> {product.fabric}
          </p>
        )}

        <div className="mt-6 h-px w-full bg-charcoal/10" />

        {/* size */}
        <fieldset className="mt-6">
          <legend className="flex w-full items-baseline justify-between">
            <span className="text-[0.62rem] uppercase tracking-[0.22em] text-charcoal/60">Size</span>
            <a
              href={waLink(`Hello ${site.name}, please help me with sizing for ${product.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.62rem] uppercase tracking-[0.12em] text-gold-deep underline decoration-gold/40 underline-offset-4"
            >
              Size help
            </a>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`min-w-[3.6rem] border px-3 py-2.5 text-[0.72rem] tracking-[0.08em] transition-all ${
                  size === s
                    ? 'border-charcoal bg-charcoal text-ivory'
                    : 'border-charcoal/18 text-charcoal/70 hover:border-gold'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        {/* colour */}
        <fieldset className="mt-6">
          <legend className="text-[0.62rem] uppercase tracking-[0.22em] text-charcoal/60">
            Colour — <span className="text-charcoal/80">{colour}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colours.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColour(c.name)}
                aria-pressed={colour === c.name}
                className={`flex items-center gap-2 border px-3 py-2 text-[0.7rem] transition-all ${
                  colour === c.name ? 'border-gold bg-gold/8' : 'border-charcoal/18 hover:border-charcoal/40'
                }`}
              >
                <span className="h-4 w-4 rounded-full ring-1 ring-charcoal/20" style={{ backgroundColor: c.hex }} />
                {c.name}
              </button>
            ))}
          </div>
        </fieldset>

        {/* quantity */}
        <div className="mt-6 flex items-center gap-4">
          <span className="text-[0.62rem] uppercase tracking-[0.22em] text-charcoal/60">Quantity</span>
          <div className="flex items-center border border-charcoal/18">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center text-charcoal/70 transition-colors hover:text-charcoal"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-10 text-center text-sm" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              className="flex h-10 w-10 items-center justify-center text-charcoal/70 transition-colors hover:text-charcoal"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* number picker */}
        <div className="mt-6">
          <p className="text-[0.6rem] uppercase tracking-[0.22em] text-charcoal/50">Send your order to</p>
          <div className="mt-2 flex gap-2">
            {site.phones.map((p, i) => (
              <button
                key={p.wa}
                type="button"
                onClick={() => setNumberIndex(i)}
                aria-pressed={numberIndex === i}
                className={`flex-1 border px-3 py-2 text-[0.7rem] tracking-[0.06em] transition-all ${
                  numberIndex === i
                    ? 'border-charcoal bg-charcoal text-ivory'
                    : 'border-charcoal/18 text-charcoal/65 hover:border-gold'
                }`}
              >
                {p.display}
              </button>
            ))}
          </div>
        </div>

        {/* actions */}
        <div className="mt-6 space-y-3">
          <a
            href={waLink(waMessage, numberIndex)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold w-full !py-4"
          >
            <WhatsApp className="h-4 w-4" />
            Order via WhatsApp
          </a>
          <div className="flex gap-3">
            <button type="button" onClick={handleAdd} className="btn btn-dark flex-1 !py-3.5">
              {justAdded ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Added to cart
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
            <Link href="/shop" className="btn btn-ivory flex-1 !py-3.5">
              Keep Shopping
            </Link>
          </div>
          {justAdded && (
            <button
              type="button"
              onClick={openCart}
              className="w-full text-center text-[0.66rem] uppercase tracking-[0.18em] text-gold-deep underline decoration-gold/40 underline-offset-4"
            >
              View cart
            </button>
          )}
        </div>

        <p className="mt-5 border border-gold/25 bg-gold/[0.06] p-3 text-center text-[0.68rem] leading-relaxed text-charcoal/60">
          Every order is confirmed personally on WhatsApp. Final price, availability and delivery fees are agreed
          with you before anything is paid.
        </p>

        {/* details accordion-ish list */}
        <dl className="mt-8 divide-y divide-charcoal/10 border-y border-charcoal/10 text-[0.82rem]">
          {[
            ['Availability', availabilityLabel[product.availability]],
            ['Sizes offered', product.sizes.join(' · ')],
            ['Colours offered', product.colours.map((c) => c.name).join(' · ')],
            ['Ordering', `WhatsApp ${site.phones[0].display} or ${site.phones[1].display}`],
            ['Location', site.location.full],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-6">
              <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-charcoal/45">{k}</dt>
              <dd className="text-charcoal/70 sm:text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
