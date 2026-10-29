'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { formatNaira } from '@/data/products';
import { site } from '@/data/site';
import { cartOrderMessage, waLink } from '@/lib/whatsapp';
import { Bag, Minus, Plus, Trash, WhatsApp } from '@/components/Icons';

export default function CartPage() {
  const { items, subtotal, hasUnpriced, setQuantity, removeItem, clearCart, hydrated } = useCart();
  const [numberIndex, setNumberIndex] = useState(0);

  const origin = typeof window !== 'undefined' ? window.location.origin : site.url;
  const message = cartOrderMessage(
    items.map((i) => ({
      name: i.name,
      price: i.price,
      size: i.size,
      colour: i.colour,
      quantity: i.quantity,
      slug: i.slug,
    })),
    subtotal,
    origin,
  );

  const totalQty = items.reduce((n, i) => n + i.quantity, 0);

  return (
    <section className="bg-ivory py-12 md:py-16">
      <div className="shell">
        <p className="eyebrow flex items-center gap-3 text-gold-deep">
          <span className="h-px w-8 bg-gold/80" aria-hidden />
          Your Selection
        </p>
        <h1 className="mt-4 font-display text-4xl font-light text-charcoal md:text-5xl">Shopping Cart</h1>
        <p className="mt-3 max-w-xl text-[0.9rem] font-light leading-relaxed text-charcoal/55">
          Review your pieces, then send your order straight to the boutique on WhatsApp. Nothing is charged on this
          website.
        </p>

        {!hydrated ? (
          <div className="mt-10 space-y-4">
            {[0, 1].map((i) => (
              <div key={i} className="h-28 animate-pulse border border-charcoal/10 bg-charcoal/[0.04]" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 border border-charcoal/10 bg-white px-6 py-16 text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 text-gold-deep">
              <Bag className="h-8 w-8" />
            </span>
            <h2 className="mt-6 font-display text-2xl text-charcoal">Your cart is empty</h2>
            <p className="mx-auto mt-3 max-w-sm text-[0.86rem] font-light leading-relaxed text-charcoal/55">
              Add the pieces you love and they&apos;ll stay here while you browse.
            </p>
            <Link href="/shop" className="btn btn-gold mt-7">
              Shop the Collection
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.45fr_0.55fr] lg:gap-12">
            {/* items */}
            <div>
              <div className="flex items-center justify-between border-b border-charcoal/12 pb-3">
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-charcoal/45">
                  {totalQty} {totalQty === 1 ? 'item' : 'items'}
                </p>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[0.62rem] uppercase tracking-[0.16em] text-charcoal/40 transition-colors hover:text-[#a8453d]"
                >
                  Clear cart
                </button>
              </div>

              <ul className="divide-y divide-charcoal/10">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-4 py-5">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="relative block h-32 w-24 shrink-0 overflow-hidden border border-charcoal/10 bg-[#efe7d8] sm:h-36 sm:w-28"
                    >
                      <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/shop/${item.slug}`}
                            className="font-display text-lg leading-tight text-charcoal transition-colors hover:text-gold-deep"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1.5 text-[0.66rem] uppercase tracking-[0.14em] text-charcoal/45">
                            Size {item.size} · {item.colour}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          className="text-charcoal/35 transition-colors hover:text-[#a8453d]"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                        <div className="flex items-center border border-charcoal/18">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.key, item.quantity - 1)}
                            className="flex h-9 w-9 items-center justify-center text-charcoal/65 transition-colors hover:text-charcoal"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-9 text-center text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.key, item.quantity + 1)}
                            className="flex h-9 w-9 items-center justify-center text-charcoal/65 transition-colors hover:text-charcoal"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="font-display text-lg text-charcoal">
                          {item.price === null ? 'Contact for Price' : formatNaira(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Link href="/shop" className="btn-link mt-6 inline-flex text-charcoal">
                ← Continue shopping
              </Link>
            </div>

            {/* summary */}
            <aside className="h-fit border border-charcoal/12 bg-white p-6 lg:sticky lg:top-28">
              <h2 className="font-display text-2xl text-charcoal">Order Summary</h2>
              <div className="mt-5 space-y-2.5 border-b border-charcoal/10 pb-4 text-[0.85rem]">
                <div className="flex justify-between text-charcoal/60">
                  <span>Items</span>
                  <span>{totalQty}</span>
                </div>
                <div className="flex justify-between text-charcoal/60">
                  <span>Subtotal</span>
                  <span className="font-display text-lg text-charcoal">
                    {subtotal === null ? '—' : formatNaira(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-charcoal/60">
                  <span>Delivery</span>
                  <span className="text-[0.76rem]">Confirmed on WhatsApp</span>
                </div>
              </div>

              {hasUnpriced && (
                <p className="mt-3 text-[0.7rem] leading-relaxed text-charcoal/50">
                  Some items are priced on enquiry and aren&apos;t included in this subtotal.
                </p>
              )}

              <fieldset className="mt-5">
                <legend className="mb-2 text-[0.58rem] uppercase tracking-[0.22em] text-charcoal/45">
                  Send your order to
                </legend>
                <div className="flex gap-2">
                  {site.phones.map((p, i) => (
                    <button
                      key={p.wa}
                      type="button"
                      onClick={() => setNumberIndex(i)}
                      aria-pressed={numberIndex === i}
                      className={`flex-1 border px-3 py-2 text-[0.68rem] transition-all ${
                        numberIndex === i
                          ? 'border-charcoal bg-charcoal text-ivory'
                          : 'border-charcoal/18 text-charcoal/65 hover:border-gold'
                      }`}
                    >
                      {p.display}
                    </button>
                  ))}
                </div>
              </fieldset>

              <a href={waLink(message, numberIndex)} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-4 w-full">
                <WhatsApp className="h-4 w-4" />
                Complete Order on WhatsApp
              </a>

              <p className="mt-4 border border-gold/30 bg-gold/[0.07] p-3 text-[0.66rem] leading-relaxed text-charcoal/60">
                This is an order enquiry, not a payment. Final prices, availability, delivery fees and payment
                details are confirmed by IDRISIYA COUTURE on WhatsApp.
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
