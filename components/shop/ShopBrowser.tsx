'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import { categories, products, type CategorySlug, type Product } from '@/data/products';
import { Close, Search } from '@/components/Icons';

type Sort = 'featured' | 'newest' | 'price-asc' | 'price-desc';

const SORTS: { value: Sort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest arrivals' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

const PAGE_SIZE = 8;

export default function ShopBrowser({
  initialCategory = 'all',
  initialQuery = '',
  productsOverride,
  lockCategory = false,
  title = 'The Boutique',
}: {
  initialCategory?: string;
  initialQuery?: string;
  productsOverride?: Product[];
  lockCategory?: boolean;
  title?: string;
}) {
  const source = productsOverride ?? products;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>(initialCategory);
  const [sort, setSort] = useState<Sort>('featured');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);

  /* Keep the URL shareable: ?q=&category= */
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (category !== 'all') params.set('category', category);
    const next = params.toString();
    const target = next ? `${pathname}?${next}` : pathname;
    const current = searchParams.toString();
    if (next !== current) {
      router.replace(target, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, pathname]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query, category, sort]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = source;

    if (category !== 'all') list = list.filter((p) => p.category === category);

    if (q) {
      list = list.filter((p) => {
        const haystack = [
          p.name,
          p.shortDescription,
          p.description,
          p.fabric ?? '',
          p.colours.map((c) => c.name).join(' '),
          p.category.replace('-', ' '),
        ]
          .join(' ')
          .toLowerCase();
        return q.split(/\s+/).every((word) => haystack.includes(word));
      });
    }

    switch (sort) {
      case 'newest':
        return [...list].sort((a, b) => +new Date(b.addedAt) - +new Date(a.addedAt));
      case 'price-asc':
        return [...list].sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER));
      case 'price-desc':
        return [...list].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
      default:
        return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
  }, [source, category, query, sort]);

  const shown = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  const loadMore = () => {
    setLoading(true);
    window.setTimeout(() => {
      setVisible((v) => v + PAGE_SIZE);
      setLoading(false);
    }, 320);
  };

  const activeCategory = categories.find((c) => c.slug === category);
  const hasFilters = query.trim() !== '' || category !== 'all';

  return (
    <div>
      {/* ---------- search + sort ---------- */}
      <div className="flex flex-col gap-3 border-b border-charcoal/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <label htmlFor="shop-search" className="sr-only">
            Search products
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, fabric or colour…"
            className="field !border-charcoal/15 !pl-10 pr-10 !text-[0.85rem]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-charcoal/40 transition-colors hover:text-charcoal"
              aria-label="Clear search"
            >
              <Close className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-[0.6rem] uppercase tracking-[0.2em] text-charcoal/40 sm:block">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </span>
          <label htmlFor="sort" className="sr-only">
            Sort products
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="field !w-auto !border-charcoal/15 !py-2.5 !text-[0.7rem] uppercase tracking-[0.12em]"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---------- category chips ---------- */}
      {!lockCategory && (
        <div className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
          <button
            type="button"
            data-active={category === 'all'}
            onClick={() => setCategory('all')}
            className="chip shrink-0"
          >
            All Pieces
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              data-active={category === c.slug}
              onClick={() => setCategory(c.slug as CategorySlug)}
              className="chip shrink-0"
            >
              {c.short}
            </button>
          ))}
        </div>
      )}

      {hasFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[0.68rem] text-charcoal/50">
          <span className="uppercase tracking-[0.16em]">Filtered by</span>
          {activeCategory && (
            <span className="border border-gold/40 bg-gold/5 px-2.5 py-1 text-charcoal/70">{activeCategory.name}</span>
          )}
          {query.trim() && (
            <span className="border border-gold/40 bg-gold/5 px-2.5 py-1 text-charcoal/70">“{query.trim()}”</span>
          )}
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
            className="ml-1 underline decoration-gold/50 underline-offset-4 transition-colors hover:text-charcoal"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ---------- grid ---------- */}
      <h2 className="sr-only">{title}</h2>
      {shown.length === 0 ? (
        <div className="mt-14 border border-charcoal/10 bg-[#FBF6EC] px-6 py-16 text-center">
          <p className="font-display text-2xl text-charcoal">No pieces match that search</p>
          <p className="mx-auto mt-3 max-w-md text-sm font-light leading-relaxed text-charcoal/55">
            Try a different word — or message us on WhatsApp and we&apos;ll help you find what you&apos;re looking for.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
              className="btn btn-dark"
            >
              Reset filters
            </button>
            <a href="/shop" className="btn btn-outline-gold !border-charcoal/25 !text-charcoal hover:!text-charcoal">
              Browse everything
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 60} className="h-full">
                <ProductCard product={p} priority={i < 4} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            {canLoadMore ? (
              <button type="button" onClick={loadMore} className="btn btn-dark min-w-[220px]" disabled={loading}>
                {loading ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border border-gold/40 border-t-gold" />
                    Loading
                  </>
                ) : (
                  `Load More (${filtered.length - visible} left)`
                )}
              </button>
            ) : (
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-charcoal/40">
                You&apos;ve seen all {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
