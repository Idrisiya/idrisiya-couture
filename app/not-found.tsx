import Link from 'next/link';
import { ArrowRight } from '@/components/Icons';

export default function NotFound() {
  return (
    <section className="surface-ink relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <div className="glow-gold left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-30" aria-hidden />
      <div className="shell relative text-center">
        <p className="eyebrow text-gold">Page not found</p>
        <p className="mt-6 font-display text-[5rem] font-light leading-none text-gold/25 md:text-[8rem]">404</p>
        <h1 className="mt-2 font-display text-3xl font-light text-ivory md:text-5xl">
          This piece isn&apos;t in the boutique
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[0.9rem] font-light leading-relaxed text-ivory/55">
          The page you&apos;re looking for may have moved. Let&apos;s take you back to the collection.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/shop" className="btn btn-gold group">
            Shop the Collection
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href="/" className="btn btn-outline-gold">
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
}
