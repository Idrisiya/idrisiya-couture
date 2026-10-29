'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { formatNaira } from '@/data/products';
import { site } from '@/data/site';
import { cartOrderMessage, waLink } from '@/lib/whatsapp';
import { Bag, Close, Minus, Plus, Trash, WhatsApp } from './Icons';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, setQuantity, subtotal, hasUnpriced, clearCart } = useCart();
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
    <div className={`fixed inset-0 z-[85] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close cart"
        onClick={closeCart}
        className={`absolute inset-0 bg-black/72 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col border-l border-gold/25 bg-[#0a0806] transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="eyebrow text-gold">Your Selection</p>
            <h2 className="mt-1 font-display text-2xl text-ivory">
              Shopping Cart{' '}
              <span className="text-base text-ivory/45">
                ({totalQty} {totalQty === 1 ? 'item' : 'items'})
              </span>
            </h2>
          </div>
          <button type="button" onClick={closeCart} className="icon-btn text-ivory" aria-label="Close cart">
            <Close className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold/25 text-gold/70">
              <Bag className="h-8 w-8" />
            </span>
            <h3 className="font-display text-2xl text-ivory">Your cart is beautifully empty</h3>
            <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-ivory/55">
              Browse the collection and add the pieces you love. We&apos;ll confirm every detail with you on WhatsApp.
            </p>
            <Link href="/shop" onClick={closeCart} className="btn btn-gold mt-7">
              Shop the Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="space-y-5">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-4 border-b border-white/8 pb-5">
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={closeCart}
                      className="relative block h-24 w-20 shrink-0 overflow-hidden border border-white/10 bg-white/5"
                    >
                      <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={closeCart}
                          className="font-display text-[1.02rem] leading-tight text-ivory transition-colors hover:text-gold-light"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          className="mt-1 shrink-0 text-ivory/40 transition-colors hover:text-[#e0736a]"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1.5 text-[0.66rem] uppercase tracking-[0.14em] text-ivory/45">
                        Size {item.size} · {item.colour}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex items-center border border-white/15">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.key, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center text-ivory/70 transition-colors hover:text-gold"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm text-ivory">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.key, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center text-ivory/70 transition-colors hover:text-gold"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-sm text-gold-light">
                          {item.price === null ? 'Contact for Price' : formatNaira(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={clearCart}
                className="mt-5 text-[0.62rem] uppercase tracking-[0.2em] text-ivory/40 transition-colors hover:text-ivory/80"
              >
                Clear cart
              </button>
            </div>

            <footer className="border-t border-white/10 bg-black/40 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[0.66rem] uppercase tracking-[0.22em] text-ivory/60">Subtotal</span>
                <span className="font-display text-2xl text-gold-light">
                  {subtotal === null ? '—' : formatNaira(subtotal)}
                </span>
              </div>
              {hasUnpriced && (
                <p className="mt-2 text-[0.66rem] leading-relaxed text-ivory/45">
                  One or more items are priced on enquiry and are not included in the subtotal.
                </p>
              )}

              {/* Choose which number to order through */}
              <fieldset className="mt-4">
                <legend className="mb-2 text-[0.58rem] uppercase tracking-[0.22em] text-ivory/45">
                  Send your order to
                </legend>
                <div className="flex gap-2">
                  {site.phones.map((p, i) => (
                    <button
                      key={p.wa}
                      type="button"
                      onClick={() => setNumberIndex(i)}
                      aria-pressed={numberIndex === i}
                      className={`flex-1 border px-3 py-2 text-[0.66rem] tracking-[0.1em] transition-all ${
                        numberIndex === i
                          ? 'border-gold bg-gold/15 text-gold-light'
                          : 'border-white/15 text-ivory/60 hover:border-gold/50'
                      }`}
                    >
                      {p.display}
                    </button>
                  ))}
                </div>
              </fieldset>

              <a
                href={waLink(message, numberIndex)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold mt-4 w-full"
              >
                <WhatsApp className="h-4 w-4" />
                Order via WhatsApp
              </a>
              <button type="button" onClick={closeCart} className="btn btn-outline-gold mt-2 w-full">
                Continue Shopping
              </button>
              <p className="mt-4 text-center text-[0.6rem] leading-relaxed text-ivory/35">
                No payment is taken on this site. Final prices, availability and delivery fees are confirmed by
                IDRISIYA COUTURE on WhatsApp.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
