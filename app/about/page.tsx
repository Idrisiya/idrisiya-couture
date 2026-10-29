import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';
import { Divider, SectionHeading } from '@/components/ui';
import { ArrowRight, WhatsApp } from '@/components/Icons';
import { site } from '@/data/site';
import { generalMessage, waLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "More than fashion — it's your identity. Learn about IDRISIYA COUTURE, a luxury women's fashion boutique in Olowotedo Area, Ogun State, Nigeria.",
};

const values = [
  {
    t: 'Individuality',
    d: 'Style is personal. We help you find pieces that feel like you, not like a trend.',
  },
  {
    t: 'Confidence',
    d: 'The right outfit changes how you carry yourself. That is the point of getting dressed.',
  },
  {
    t: 'Elegance',
    d: 'Restraint, proportion and finish — the quiet details that make a look considered.',
  },
  {
    t: 'Accessibility',
    d: 'Elegant fashion should not be reserved for a select few. That is why we say luxury for less.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={
          <>
            More Than Fashion.
            <br />
            <span className="italic text-gold-light">It&apos;s Your Identity.</span>
          </>
        }
        subtitle={site.slogan}
        crumbs={[{ label: 'About Us' }]}
        image="/images/atelier-sewing.jpg"
      />

      {/* ---------------- editorial intro ---------------- */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-charcoal/10">
                <Image
                  src="/images/p-ankara-set.jpg"
                  alt="Model wearing a tailored ankara two-piece set by IDRISIYA COUTURE"
                  fill
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-3 hidden w-40 border border-gold/40 bg-ink p-4 text-center sm:block md:-right-6 md:w-48">
                <p className="font-display text-2xl text-gold-light">Est.</p>
                <p className="mt-1 text-[0.55rem] uppercase leading-relaxed tracking-[0.2em] text-ivory/60">
                  Olowotedo Area
                  <br />
                  Ogun State, Nigeria
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow flex items-center gap-3 text-gold-deep">
              <span className="h-px w-8 bg-gold/80" aria-hidden />
              IDRISIYA COUTURE
            </p>
            <h2 className="h-section mt-4 text-charcoal">Welcome to IDRISIYA COUTURE</h2>
            <div className="mt-6 space-y-4 text-[0.95rem] font-light leading-relaxed text-charcoal/70">
              <p>Your destination for beautiful women&apos;s fashion.</p>
              <p>
                We believe that style is a powerful expression of individuality, confidence, and elegance.
              </p>
              <p>
                Our aim is to make it easier for women to discover beautiful clothing for everyday wear, special
                occasions, and memorable moments.
              </p>
              <p>
                With a passion for fashion and attention to detail, IDRISIYA COUTURE celebrates personal style while
                making elegant fashion more accessible.
              </p>
            </div>

            <blockquote className="mt-8 border-l-2 border-gold/60 pl-5">
              <p className="font-display text-xl italic leading-snug text-charcoal md:text-2xl">
                &ldquo;Discover your style. Express your confidence. Make every outfit count.&rdquo;
              </p>
              <cite className="mt-3 block text-[0.58rem] uppercase not-italic tracking-[0.24em] text-charcoal/45">
                — The IDRISIYA COUTURE Philosophy
              </cite>
            </blockquote>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop" className="btn btn-gold group">
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={waLink(generalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
              >
                <WhatsApp className="h-4 w-4" />
                Talk to Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- signature / brand statement ---------------- */}
      <section className="surface-ink relative overflow-hidden py-16 md:py-24">
        <div className="glow-gold left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 opacity-25" aria-hidden />
        <div className="shell relative text-center">
          <Reveal>
            <p className="eyebrow text-gold">Our Signature</p>
            <p className="mx-auto mt-6 max-w-3xl font-display text-3xl font-light leading-[1.2] text-ivory md:text-[2.9rem]">
              The Fashion Hub — <span className="gold-text italic">Luxury for Less.</span>
            </p>
            <Divider dark className="mt-8" />
            <p className="mx-auto mt-7 max-w-xl text-[0.9rem] font-light leading-relaxed text-ivory/55">
              A boutique where considered design meets an approachable price — and where every order is a
              conversation, not a transaction.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- values ---------------- */}
      <section className="bg-[#FBF6EC] py-14 md:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="What We Stand For"
              title="Four words we build on"
              subtitle="These guide every piece we choose to carry."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 70} className="h-full">
                <div className="flex h-full flex-col border border-charcoal/10 bg-white p-6">
                  <span className="font-display text-3xl text-gold/40">0{i + 1}</span>
                  <p className="mt-3 font-display text-xl text-charcoal">{v.t}</p>
                  <p className="mt-2 text-[0.82rem] font-light leading-relaxed text-charcoal/60">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- real atelier photography ---------------- */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="In the Workroom"
              title="Where it begins"
              subtitle="Fabric, thread and a measurement taken twice — the honest part of the process."
            />
          </Reveal>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {[
              { src: '/images/atelier-fabrics.jpg', alt: 'Fabric bolts stacked in the IDRISIYA COUTURE workroom' },
              { src: '/images/atelier-threads.jpg', alt: 'Spools of thread, pins and tailoring tools' },
              { src: '/images/atelier-sewing.jpg', alt: 'The atelier sewing machine with gold detailing' },
            ].map((img, i) => (
              <Reveal key={img.src} delay={i * 80}>
                <div className="relative aspect-square overflow-hidden border border-charcoal/10">
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 92vw, 31vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- official banner ---------------- */}
      <section className="bg-[#0b0908] py-14 md:py-20">
        <div className="shell grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="h-px w-8 bg-gold/70" aria-hidden />
              The Boutique Card
            </p>
            <h2 className="h-section mt-4 text-ivory">Find us in Ogun State</h2>
            <p className="mt-4 max-w-md text-[0.92rem] font-light leading-relaxed text-ivory/60">
              Our official promotional card — everything you need in one place: the brand, the promise, the pieces
              and the numbers to reach us on.
            </p>
            <div className="mt-6 space-y-1.5 text-[0.9rem] font-light text-ivory/70">
              {site.phones.map((p) => (
                <p key={p.wa} className="flex items-center gap-2">
                  <span className="text-gold" aria-hidden>
                    ✦
                  </span>
                  {p.display}
                </p>
              ))}
              <p className="flex items-center gap-2">
                <span className="text-gold" aria-hidden>
                  ✦
                </span>
                {site.location.full}
              </p>
            </div>
            <Link href="/contact" className="btn btn-gold group mt-7">
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="mx-auto max-w-[360px] border border-gold/35 bg-black p-2">
              <Image
                src="/brand/idrisiya-banner.png"
                alt="Official IDRISIYA COUTURE promotional banner with contact numbers and Ogun State location"
                width={768}
                height={1376}
                sizes="(max-width: 1024px) 80vw, 360px"
                className="h-auto w-full object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
