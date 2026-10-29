import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { SectionHeading } from '@/components/ui';
import { ArrowRight } from '@/components/Icons';
import { site } from '@/data/site';

/**
 * Dedicated section for the official IDRISIYA COUTURE promotional banner.
 * The original artwork (brand name, IC emblem, slogan, product photos,
 * phone numbers, location) is displayed in full — object-contain, never
 * cropped or stretched — so no contact detail can be lost on mobile.
 */
export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-[#0b0908] py-16 md:py-24" aria-labelledby="promo-heading">
      <div className="glow-gold left-1/2 top-0 h-[24rem] w-[36rem] -translate-x-1/2 opacity-25" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0 21px, rgba(212,175,55,.6) 21px 22px)',
        }}
        aria-hidden
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeading
            eyebrow="Official Brand Presentation"
            title={<span id="promo-heading">The IDRISIYA COUTURE Experience</span>}
            subtitle="Discover beautiful fashion, timeless elegance, and styles that make every moment special."
            dark
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-10 max-w-[560px] md:mt-14">
            <div className="relative">
              <span className="pointer-events-none absolute -inset-px border border-gold/40" aria-hidden />
              <span className="pointer-events-none absolute -inset-2 border border-gold/12" aria-hidden />
              <div className="relative bg-black p-2 sm:p-3">
                <Image
                  src="/brand/idrisiya-banner.png"
                  alt="Official IDRISIYA COUTURE promotional banner: gold IC emblem, brand name, the slogan 'The fashion hub — luxury for less', deals on all types of female wears, 'Classic never goes out of fashion', four fashion photographs, and contact details 07081017665 / 08106506876, Olowotedo Area, Ogun State."
                  width={768}
                  height={1376}
                  sizes="(max-width: 640px) 92vw, 540px"
                  className="h-auto w-full object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/shop" className="btn btn-gold group w-full sm:w-auto">
              Shop Our Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <p className="text-center text-[0.62rem] uppercase tracking-[0.18em] text-ivory/40 sm:text-left">
              {site.location.full}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
