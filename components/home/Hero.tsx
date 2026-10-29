import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/site';
import { ArrowRight, WhatsApp } from '@/components/Icons';
import { generalMessage, waLink } from '@/lib/whatsapp';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      {/* soft light pools */}
      <div className="glow-gold -left-32 top-10 h-[28rem] w-[28rem] opacity-30" aria-hidden />
      <div className="glow-gold -bottom-24 right-0 h-[32rem] w-[32rem] opacity-20" aria-hidden />

      <div className="shell relative grid items-center gap-10 pb-14 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pb-24 lg:pt-16">
        {/* ------------- copy ------------- */}
        <div className="order-1 max-w-xl animate-floatUp lg:order-1">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold/70" aria-hidden />
            The Art of Elegance
          </p>

          <h1 className="h-display mt-5 text-ivory">
            Discover Your
            <br />
            <span className="gold-text animate-shimmer italic">Signature Style.</span>
          </h1>

          <p className="mt-6 max-w-md text-[0.98rem] font-light leading-relaxed text-ivory/70">
            Explore beautiful fashion designed to celebrate your confidence, individuality, and timeless elegance.
          </p>

          <div className="mt-7 flex items-center gap-4">
            <span className="h-px w-10 bg-gold/50" aria-hidden />
            <div>
              <p className="font-display text-[1.05rem] tracking-[0.26em] text-ivory">IDRISIYA COUTURE</p>
              <p className="mt-1 text-[0.58rem] uppercase tracking-[0.24em] text-gold/85">{site.slogan}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/shop" className="btn btn-gold group w-full sm:w-auto">
              Shop the Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/new-arrivals" className="btn btn-outline-gold w-full sm:w-auto">
              Explore New Arrivals
            </Link>
          </div>

          <div className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              { k: 'Nationwide', v: 'Delivery arranged' },
              { k: 'Made to measure', v: 'Sizing support' },
              { k: 'WhatsApp', v: 'Direct ordering' },
            ].map((s) => (
              <div key={s.k}>
                <p className="font-display text-[0.98rem] leading-tight text-gold-light">{s.k}</p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-ivory/45">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ------------- image ------------- */}
        <div className="relative order-2 lg:order-2">
          <div className="relative mx-auto w-full max-w-[520px]">
            {/* gold frame */}
            <span
              className="pointer-events-none absolute -inset-3 border border-gold/30 sm:-inset-4"
              aria-hidden
            />
            <span className="pointer-events-none absolute -left-4 -top-4 h-16 w-16 border-l border-t border-gold sm:-left-6 sm:-top-6" aria-hidden />
            <span className="pointer-events-none absolute -bottom-4 -right-4 h-16 w-16 border-b border-r border-gold sm:-bottom-6 sm:-right-6" aria-hidden />

            <div className="relative aspect-[4/5] w-full overflow-hidden bg-cocoa">
              <Image
                src="/images/hero.jpg"
                alt="Model wearing a champagne-gold silk gown from the IDRISIYA COUTURE collection"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" aria-hidden />

              {/* floating tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 border border-gold/25 bg-ink/70 px-4 py-3 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5">
                <div>
                  <p className="text-[0.55rem] uppercase tracking-[0.28em] text-gold">The Golden Hour</p>
                  <p className="mt-1 font-display text-base leading-tight text-ivory">Evening &amp; Occasion Edit</p>
                </div>
                <Link
                  href="/shop?category=occasion-wear"
                  className="shrink-0 border border-gold/50 px-3 py-2 text-[0.55rem] uppercase tracking-[0.18em] text-gold-light transition-colors hover:bg-gold/15"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>

          {/* WhatsApp prompt */}
          <a
            href={waLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-center gap-2.5 border border-[#25D366]/30 py-3 text-[0.62rem] uppercase tracking-[0.22em] text-[#4ddf82] transition-colors hover:bg-[#25D366]/10 lg:hidden"
          >
            <WhatsApp className="h-4 w-4" />
            Order on WhatsApp
          </a>
        </div>
      </div>

      {/* marquee strip */}
      <div className="marquee-wrap relative border-y border-gold/15 bg-black/40 py-3">
        <div className="marquee-track items-center gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center gap-10">
              {[
                'Elegant Dresses',
                'Two-Piece Sets',
                'Occasion Wear',
                'Corporate Wear',
                'Fashion Accessories',
                'Classic Never Goes Out of Fashion',
                'Luxury for Less',
              ].map((t) => (
                <span key={t} className="flex items-center gap-10 text-[0.6rem] uppercase tracking-[0.3em] text-ivory/45">
                  {t}
                  <span className="text-gold" aria-hidden>
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
