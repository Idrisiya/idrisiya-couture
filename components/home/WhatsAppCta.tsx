import Reveal from '@/components/Reveal';
import { site } from '@/data/site';
import { generalMessage, waLink } from '@/lib/whatsapp';
import { Phone, WhatsApp } from '@/components/Icons';

export default function WhatsAppCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-14 text-ivory md:py-20" aria-labelledby="wa-heading">
      <div className="glow-gold left-1/2 top-0 h-72 w-[38rem] -translate-x-1/2 opacity-30" aria-hidden />
      <div className="shell relative text-center">
        <Reveal>
          <p className="eyebrow text-gold">Order Direct</p>
          <h2 id="wa-heading" className="h-section mx-auto mt-4 max-w-2xl text-ivory">
            One message is all it takes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.94rem] font-light leading-relaxed text-ivory/60">
            Send us the piece you love, your size and your colour. We&apos;ll confirm availability, price and
            delivery details personally.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-9 grid max-w-3xl gap-3 sm:grid-cols-2">
            {site.phones.map((p, i) => (
              <div key={p.wa} className="border border-white/12 bg-white/[0.03] p-5 text-left transition-colors hover:border-gold/45">
                <p className="text-[0.56rem] uppercase tracking-[0.24em] text-gold">{p.label}</p>
                <a
                  href={`tel:${p.tel}`}
                  className="mt-1.5 flex items-center gap-2.5 font-display text-2xl text-ivory transition-colors hover:text-gold-light"
                >
                  <Phone className="h-4 w-4 text-gold/70" />
                  {p.display}
                </a>
                <a
                  href={waLink(generalMessage, i)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-4 w-full border border-[#25D366]/35 !py-2.5 !text-[0.6rem] text-[#4ddf82] transition-colors hover:bg-[#25D366]/12"
                >
                  <WhatsApp className="h-3.5 w-3.5" />
                  Chat on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.62rem] uppercase tracking-[0.2em] text-ivory/40">
            <span>{site.location.area}</span>
            <span className="text-gold" aria-hidden>
              ✦
            </span>
            <span>{site.location.state}</span>
            <span className="text-gold" aria-hidden>
              ✦
            </span>
            <span>{site.location.country}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
