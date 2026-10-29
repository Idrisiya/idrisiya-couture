import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from './Icons';

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image = '/images/atelier-fabrics.jpg',
  crumbs = [],
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  image?: string;
  crumbs?: { label: string; href?: string }[];
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover opacity-[0.28]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45" aria-hidden />
      <div className="glow-gold -left-20 top-0 h-72 w-72 opacity-35" aria-hidden />

      <div className={`shell relative ${compact ? 'py-12 md:py-16' : 'py-16 md:py-24'}`}>
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em] text-ivory/45">
            <Link href="/" className="transition-colors hover:text-gold-light">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span className="text-gold/50" aria-hidden>
                  /
                </span>
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-gold-light">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-gold-light/80">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <p className="eyebrow flex items-center gap-3 text-gold">
          <span className="h-px w-8 bg-gold/70" aria-hidden />
          {eyebrow}
        </p>
        <h1 className={`mt-4 max-w-3xl font-display font-light leading-[1.05] ${compact ? 'text-4xl md:text-5xl' : 'text-5xl md:text-6xl'}`}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-[0.95rem] font-light leading-relaxed text-ivory/60">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export function InlineCrumbs({ label }: { label: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em] text-charcoal/40">
      <Link href="/" className="transition-colors hover:text-gold-deep">
        Home
      </Link>
      <span aria-hidden>/</span>
      <Link href="/shop" className="transition-colors hover:text-gold-deep">
        Shop
      </Link>
      <span aria-hidden>/</span>
      <span className="text-charcoal/70">{label}</span>
    </nav>
  );
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn-link group text-charcoal">
      <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
      {children}
    </Link>
  );
}
