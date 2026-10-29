'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navLinks, site } from '@/data/site';
import { generalMessage, waLink } from '@/lib/whatsapp';
import { useCart } from '@/lib/cart';
import { Bag, Close, Menu, Phone, Search, WhatsApp } from './Icons';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { count, openCart, hydrated } = useCart();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawer(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const anyOpen = drawer || searchOpen;
    document.body.style.overflow = anyOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawer, searchOpen]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawer(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href.split('?')[0] && !href.includes('?');
  };

  return (
    <>
      {/* ---------- Announcement strip ---------- */}
      <div className="hidden bg-ink text-ivory/85 md:block">
        <div className="shell flex h-9 items-center justify-between text-[0.6rem] uppercase tracking-[0.24em]">
          <p className="flex items-center gap-2 text-gold-light/90">
            <span aria-hidden>✦</span>
            {site.slogan}
          </p>
          <div className="flex items-center gap-6">
            <a href={`tel:${site.phones[0].tel}`} className="flex items-center gap-2 transition-colors hover:text-gold">
              <Phone className="h-3 w-3" />
              {site.phones[0].display}
            </a>
            <span className="h-3 w-px bg-ivory/25" aria-hidden />
            <a
              href={waLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-gold"
            >
              <WhatsApp className="h-3 w-3" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ---------- Main header ---------- */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? 'border-gold/25 bg-ink/95 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md'
            : 'border-white/5 bg-ink'
        }`}
      >
        <div className="shell flex items-center justify-between gap-4 py-3 md:py-4">
          {/* Brand */}
          <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${site.name} — home`}>
            <span className="relative block h-12 w-12 overflow-hidden border border-gold/30 bg-black sm:h-14 sm:w-14">
              <Image
                src="/brand/idrisiya-logo.png"
                alt="IDRISIYA COUTURE logo — gold sewing machine and needle"
                fill
                sizes="56px"
                className="object-contain"
                priority
              />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-lg tracking-[0.2em] text-ivory transition-colors group-hover:text-gold-light lg:text-xl">
                IDRISIYA
              </span>
              <span className="mt-1 text-[0.52rem] uppercase tracking-[0.42em] text-gold">Couture</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden xl:block">
            <ul className="flex items-center gap-6 xl:gap-7">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`group relative whitespace-nowrap text-[0.62rem] uppercase tracking-[0.16em] transition-colors 2xl:text-[0.66rem] 2xl:tracking-[0.2em] ${
                      isActive(l.href) ? 'text-gold-light' : 'text-ivory/80 hover:text-gold-light'
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                        isActive(l.href) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="icon-btn text-ivory"
              aria-label="Search products"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="icon-btn relative text-ivory"
              aria-label={`Open shopping cart${hydrated && count ? `, ${count} items` : ''}`}
            >
              <Bag className="h-[18px] w-[18px]" />
              <span
                className={`absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full text-[0.55rem] font-medium leading-none transition-all ${
                  hydrated && count > 0
                    ? 'bg-gradient-to-br from-gold-light to-gold-deep text-ink'
                    : 'bg-white/10 text-ivory/55'
                }`}
              >
                {hydrated ? count : 0}
              </span>
            </button>

            <a
              href={waLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 hidden h-10 w-10 items-center justify-center rounded-full border border-[#25D366]/45 text-[#4ddf82] transition-all hover:bg-[#25D366]/15 md:flex"
              aria-label="Chat with IDRISIYA COUTURE on WhatsApp"
            >
              <WhatsApp className="h-[18px] w-[18px]" />
            </a>

            <Link href="/shop" className="btn btn-gold ml-1 hidden !px-5 !py-3 !text-[0.62rem] lg:inline-flex">
              Shop Now
            </Link>

            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="icon-btn text-ivory xl:hidden"
              aria-label="Open menu"
              aria-expanded={drawer}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Mobile drawer ---------- */}
      <div
        className={`fixed inset-0 z-[70] xl:hidden ${drawer ? '' : 'pointer-events-none'}`}
        aria-hidden={!drawer}
      >
        <button
          type="button"
          tabIndex={drawer ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setDrawer(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${
            drawer ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-[380px] flex-col border-l border-gold/25 bg-ink transition-transform duration-500 ${
            drawer ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="relative block h-11 w-11 overflow-hidden border border-gold/30 bg-black">
                <Image src="/brand/idrisiya-logo.png" alt="" fill sizes="44px" className="object-contain" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-base tracking-[0.2em] text-ivory">IDRISIYA</span>
                <span className="mt-1 text-[0.5rem] uppercase tracking-[0.4em] text-gold">Couture</span>
              </span>
            </div>
            <button type="button" onClick={() => setDrawer(false)} className="icon-btn text-ivory" aria-label="Close menu">
              <Close className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between border-b border-white/5 py-3.5 font-display text-2xl text-ivory/90 transition-colors hover:text-gold-light"
                  >
                    <span>{l.label}</span>
                    <span className="text-[0.6rem] tracking-[0.2em] text-gold/50">
                      0{i + 1}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3">
              <Link href="/shop" className="btn btn-gold w-full">
                Shop the Collection
              </Link>
              <a
                href={waLink(generalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-gold w-full"
              >
                <WhatsApp className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>

            <div className="mt-8 space-y-2 border-t border-white/10 pt-6 text-[0.72rem] tracking-[0.1em] text-ivory/60">
              {site.phones.map((p) => (
                <a key={p.wa} href={`tel:${p.tel}`} className="flex items-center gap-2 hover:text-gold-light">
                  <Phone className="h-3.5 w-3.5 text-gold" />
                  {p.display}
                </a>
              ))}
              <p className="flex items-start gap-2 pt-1">
                <span className="mt-[3px] text-gold">✦</span>
                {site.location.full}
              </p>
            </div>
          </nav>
        </div>
      </div>

      {/* ---------- Search overlay ---------- */}
      <div
        className={`fixed inset-0 z-[80] ${searchOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!searchOpen}
      >
        <button
          type="button"
          aria-label="Close search"
          tabIndex={searchOpen ? 0 : -1}
          onClick={() => setSearchOpen(false)}
          className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
            searchOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`relative mx-auto mt-24 w-[92%] max-w-2xl border border-gold/30 bg-ink/97 p-6 transition-all duration-400 sm:mt-32 sm:p-8 ${
            searchOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >
          <div className="mb-5 flex items-center justify-between">
            <p className="eyebrow text-gold">Search the boutique</p>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="icon-btn text-ivory"
              aria-label="Close search"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={submitSearch} className="on-dark">
            <label htmlFor="site-search" className="sr-only">
              Search products by name, category or fabric
            </label>
            <div className="flex items-center gap-3 border-b border-gold/40 pb-3">
              <Search className="h-5 w-5 shrink-0 text-gold" />
              <input
                id="site-search"
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Try “sequin gown”, “blazer”, “ankara”…"
                className="w-full bg-transparent text-lg font-light text-ivory placeholder:text-ivory/35 focus:outline-none"
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {['Gown', 'Two-piece', 'Blazer', 'Satin', 'Accessories'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="chip !border-gold/30 !bg-transparent !text-ivory/70 hover:!text-gold-light"
                >
                  {s}
                </button>
              ))}
            </div>
            <button type="submit" className="btn btn-gold mt-6 w-full">
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
