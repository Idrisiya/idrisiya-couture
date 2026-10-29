import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/site';
import { generalMessage, waLink } from '@/lib/whatsapp';
import { iconMap, Instagram, Facebook, TikTok, WhatsApp, Pin, Phone, ArrowRight } from './Icons';

const shopLinks = [
  { label: 'All Products', href: '/shop' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Dresses', href: '/shop?category=dresses' },
  { label: 'Two-Piece Sets', href: '/shop?category=two-piece-sets' },
  { label: 'Accessories', href: '/shop?category=accessories' },
];

const serviceLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'WhatsApp Orders', href: waLink(generalMessage), external: true },
  { label: 'Product Enquiries', href: '/contact#enquiry' },
  { label: 'Delivery Information', href: '/contact#delivery' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden border-t border-gold/20 bg-ink text-ivory">
      <div className="glow-gold -left-24 top-0 h-72 w-72 opacity-40" aria-hidden />
      <div className="glow-gold -right-24 bottom-0 h-72 w-72 opacity-25" aria-hidden />

      <div className="shell relative py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3.5">
              <span className="relative block h-16 w-16 overflow-hidden border border-gold/35 bg-black">
                <Image src="/brand/idrisiya-logo.png" alt="IDRISIYA COUTURE logo" fill sizes="64px" className="object-contain" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl tracking-[0.18em] text-ivory">IDRISIYA</span>
                <span className="mt-1.5 text-[0.55rem] uppercase tracking-[0.44em] text-gold">Couture</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs font-display text-xl italic leading-snug text-gold-light/90">
              {site.slogan}
            </p>
            <p className="mt-2 text-[0.78rem] font-light tracking-wide text-ivory/50">{site.tagline}</p>

            <div className="mt-7 flex items-center gap-3">
              {site.socials.map((s) => {
                const Icon = iconMap[s.icon];
                const isPlaceholder = s.href === '#';
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target={isPlaceholder ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${s.name}${isPlaceholder ? ' (link coming soon)' : ''}`}
                    className="flex h-10 w-10 items-center justify-center border border-white/12 text-ivory/70 transition-all hover:border-gold hover:text-gold-light"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <p className="mt-3 text-[0.58rem] uppercase tracking-[0.16em] text-ivory/30">
              Follow the boutique for new arrivals
            </p>
          </div>

          {/* Shop */}
          <nav aria-label="Shop links">
            <h3 className="eyebrow text-gold">Shop</h3>
            <ul className="mt-5 space-y-3">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 text-[0.82rem] font-light text-ivory/65 transition-colors hover:text-gold-light"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" aria-hidden />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Customer service */}
          <nav aria-label="Customer service links">
            <h3 className="eyebrow text-gold">Customer Service</h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-[0.82rem] font-light text-ivory/65 transition-colors hover:text-gold-light"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" aria-hidden />
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="group flex items-center gap-2 text-[0.82rem] font-light text-ivory/65 transition-colors hover:text-gold-light"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" aria-hidden />
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-gold">Contact</h3>
            <ul className="mt-5 space-y-4 text-[0.82rem] font-light">
              {site.phones.map((p, i) => (
                <li key={p.wa}>
                  <a href={`tel:${p.tel}`} className="flex items-center gap-3 text-ivory/75 transition-colors hover:text-gold-light">
                    <Phone className="h-4 w-4 shrink-0 text-gold/80" />
                    {p.display}
                  </a>
                  <a
                    href={waLink(generalMessage, i)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-7 mt-1 inline-flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-[#4ddf82]/90 transition-colors hover:text-[#4ddf82]"
                  >
                    <WhatsApp className="h-3 w-3" /> WhatsApp
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3 pt-1 text-ivory/75">
                <Pin className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" />
                <span>
                  {site.location.area},<br />
                  {site.location.state}, {site.location.country}.
                </span>
              </li>
            </ul>

            <Link href="/shop" className="btn btn-gold mt-6 w-full !py-3 !text-[0.6rem]">
              Shop Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="ornament mt-14 text-xs" aria-hidden>
          <span className="text-[0.7rem] tracking-[0.3em]">✦</span>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-[0.66rem] tracking-[0.1em] text-ivory/40 md:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-center md:text-right">
            {site.tagline} · Orders confirmed on WhatsApp
          </p>
        </div>
      </div>
    </footer>
  );
}
