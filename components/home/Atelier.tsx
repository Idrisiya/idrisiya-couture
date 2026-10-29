import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { Divider } from '@/components/ui';
import { ArrowRight, Scissors, Sparkle } from '@/components/Icons';

/* Your three original Cloudinary collection photographs, used as the
   atelier story imagery (they are fabric, thread and sewing-machine shots). */
const assets = {
  fabrics: '/images/atelier-fabrics.jpg',
  sewing: '/images/atelier-sewing.jpg',
  threads: '/images/atelier-threads.jpg',
};

export default function Atelier() {
  return (
    <section className="surface-cocoa relative overflow-hidden py-16 md:py-24" aria-labelledby="atelier-heading">
      <div className="glow-gold -right-20 top-1/4 h-80 w-80 opacity-30" aria-hidden />
      <div className="shell relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* image collage */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold/25">
              <Image
                src="/images/atelier-craft.jpg"
                alt="Fabric being pinned on a dress form in the IDRISIYA COUTURE atelier"
                fill
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden />
            </div>

            {/* real Cloudinary assets, layered */}
            <div className="absolute -bottom-6 -left-3 grid w-[58%] grid-cols-2 gap-2 sm:-bottom-8 sm:-left-5">
              <div className="relative aspect-square overflow-hidden border border-gold/30 bg-black shadow-luxe">
                <Image
                  src={assets.fabrics}
                  alt="Stacked bolts of colourful fabric in the IDRISIYA COUTURE studio"
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden border border-gold/30 bg-black shadow-luxe">
                <Image
                  src={assets.sewing}
                  alt="Vintage black and gold Singer sewing machine used in the atelier"
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute bottom-4 right-4 hidden h-24 w-24 items-center justify-center border border-gold/40 bg-ink/85 text-center backdrop-blur sm:flex">
              <p className="text-[0.5rem] uppercase leading-relaxed tracking-[0.2em] text-gold-light">
                Made
                <br />
                with care
              </p>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <Reveal delay={120} className="order-1 lg:order-2">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/70" aria-hidden />
            Inside the Atelier
          </p>
          <h2 id="atelier-heading" className="h-section mt-4 text-ivory">
            The fabric first.
            <br />
            <span className="italic text-gold-light">Then the feeling.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[0.94rem] font-light leading-relaxed text-ivory/65">
            Every IDRISIYA COUTURE piece begins the same way — hands on cloth. Fabrics are chosen for the way they
            fall and move, pieces are cut with intention, and finishes are checked one at a time before a garment is
            ready for you.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: Scissors,
                title: 'Considered construction',
                text: 'Clean seams, structure where it matters, comfort where it counts.',
              },
              {
                icon: Sparkle,
                title: 'Finishing details',
                text: 'The gold hardware, the covered button, the hem that sits just right.',
              },
            ].map((f) => (
              <div key={f.title} className="border-l border-gold/30 pl-4">
                <f.icon className="h-5 w-5 text-gold" />
                <p className="mt-2.5 font-display text-[1.05rem] text-ivory">{f.title}</p>
                <p className="mt-1.5 text-[0.78rem] font-light leading-relaxed text-ivory/50">{f.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Divider dark className="!justify-start" />
          </div>

          <Link href="/about" className="btn btn-outline-gold group mt-8 w-full sm:w-auto">
            Our Story
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
