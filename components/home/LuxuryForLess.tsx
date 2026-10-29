import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { ArrowRight } from '@/components/Icons';

export default function LuxuryForLess() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-ivory md:py-24" aria-labelledby="lfl-heading">
      <div className="glow-gold left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 opacity-25" aria-hidden />
      <div className="shell relative grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal>
          <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden border border-gold/25">
              <Image
                src="/images/p-white-lace.jpg"
                alt="Bridal lace gown from IDRISIYA COUTURE"
                fill
                sizes="(max-width: 1024px) 92vw, 45vw"
                className="object-cover object-top"
              />
            </div>
            <div className="relative aspect-square overflow-hidden border border-gold/25">
              <Image
                src="/images/p-satin-blouse.jpg"
                alt="Champagne satin wrap blouse"
                fill
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden border border-gold/25">
              <Image
                src="/images/p-floral-midi.jpg"
                alt="Terracotta floral midi dress"
                fill
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/70" aria-hidden />
            Our Promise
          </p>
          <h2 id="lfl-heading" className="h-section mt-4 text-ivory">
            Luxury <span className="gold-text italic">for Less</span>
          </h2>
          <p className="mt-4 font-display text-xl italic leading-snug text-gold-light/90">
            Beautiful fashion. Elegant choices. Styles you&apos;ll love.
          </p>
          <p className="mt-5 max-w-lg text-[0.94rem] font-light leading-relaxed text-ivory/65">
            Looking considered doesn&apos;t have to mean spending the most. Our edit focuses on pieces that earn
            their place in your wardrobe — the dress you reach for, the set that works twice, the gold detail that
            finishes everything.
          </p>

          <ul className="mt-7 space-y-3">
            {[
              'A curated edit, not an endless scroll',
              'Honest pricing, confirmed with you before you pay',
              'Sizing guidance over WhatsApp before you commit',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[0.86rem] font-light text-ivory/70">
                <span className="mt-1.5 text-[0.6rem] text-gold" aria-hidden>
                  ✦
                </span>
                {t}
              </li>
            ))}
          </ul>

          <Link href="/shop" className="btn btn-gold group mt-9 w-full sm:w-auto">
            Explore All Products
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
