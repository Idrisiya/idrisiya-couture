import Link from 'next/link';
import { ArrowRight } from './Icons';

/** Small caps label with a gold rule — repeated across sections. */
export function Eyebrow({ children, className = '', dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${dark ? 'text-gold' : 'text-gold-deep'} ${className}`}>
      <span className={`h-px w-8 ${dark ? 'bg-gold/70' : 'bg-gold/80'}`} aria-hidden />
      {children}
    </p>
  );
}

/** Centered section heading block. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
  align = 'center',
  className = '',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  dark?: boolean;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${dark ? 'text-gold' : 'text-gold-deep'} ${align === 'center' ? 'flex items-center justify-center gap-3' : 'flex items-center gap-3'}`}>
          <span className={`h-px w-8 ${dark ? 'bg-gold/70' : 'bg-gold/80'}`} aria-hidden />
          {eyebrow}
          {align === 'center' && <span className={`h-px w-8 ${dark ? 'bg-gold/70' : 'bg-gold/80'}`} aria-hidden />}
        </p>
      )}
      <h2 className={`h-section mt-4 ${dark ? 'text-ivory' : 'text-charcoal'}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-[0.95rem] font-light leading-relaxed ${dark ? 'text-ivory/60' : 'text-charcoal/60'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Thin gold divider with a centred diamond. */
export function Divider({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className={`h-px w-16 bg-gradient-to-r from-transparent ${dark ? 'to-gold/60' : 'to-gold/70'}`} />
      <span className={`rotate-45 border ${dark ? 'border-gold/60' : 'border-gold/80'} p-[3px]`} />
      <span className={`h-px w-16 bg-gradient-to-l from-transparent ${dark ? 'to-gold/60' : 'to-gold/70'}`} />
    </div>
  );
}

export function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className={`btn-link group ${dark ? 'text-gold-light' : 'text-charcoal'}`}>
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
