import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import EnquiryForm from '@/components/contact/EnquiryForm';
import { SectionHeading } from '@/components/ui';
import { ArrowRight, Phone, Pin, WhatsApp } from '@/components/Icons';
import { site } from '@/data/site';
import { generalMessage, waLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact IDRISIYA COUTURE — Olowotedo Area, Ogun State, Nigeria. WhatsApp 07081017665 or 08106506876 for product enquiries, sizing help and orders.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title={
          <>
            We&apos;d Love to
            <br />
            <span className="italic text-gold-light">Hear From You</span>
          </>
        }
        subtitle="Have a question about a product or need help choosing your next look? Contact IDRISIYA COUTURE and we'll be happy to assist."
        crumbs={[{ label: 'Contact' }]}
        image="/images/atelier-threads.jpg"
      />

      {/* ---------------- contact cards + form ---------------- */}
      <section id="enquiry" className="bg-ivory py-12 md:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <Reveal>
            <div className="border border-charcoal/10 bg-white p-6 sm:p-7">
              <p className="eyebrow text-gold-deep">The Boutique</p>
              <h2 className="mt-3 font-display text-3xl text-charcoal">IDRISIYA COUTURE</h2>
              <p className="mt-2 text-[0.8rem] font-light italic text-charcoal/50">{site.slogan}</p>

              <div className="mt-6 space-y-3">
                {site.phones.map((p, i) => (
                  <div key={p.wa} className="border border-charcoal/10 p-4">
                    <p className="text-[0.56rem] uppercase tracking-[0.24em] text-gold-deep">{p.label}</p>
                    <a
                      href={`tel:${p.tel}`}
                      className="mt-1 flex items-center gap-2 font-display text-2xl text-charcoal transition-colors hover:text-gold-deep"
                    >
                      <Phone className="h-4 w-4 text-gold-deep" />
                      {p.display}
                    </a>
                    <div className="mt-3 flex gap-2">
                      <a
                        href={waLink(generalMessage, i)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn flex-1 border border-[#25D366]/40 !py-2.5 !text-[0.58rem] text-[#15733f] transition-colors hover:bg-[#25D366]/12"
                      >
                        <WhatsApp className="h-3.5 w-3.5" /> WhatsApp
                      </a>
                      <a href={`tel:${p.tel}`} className="btn btn-dark flex-1 !py-2.5 !text-[0.58rem]">
                        Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-3 border border-charcoal/10 bg-[#FBF6EC] p-4">
                <Pin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                <div>
                  <p className="text-[0.56rem] uppercase tracking-[0.24em] text-charcoal/45">Location</p>
                  <p className="mt-1 text-[0.88rem] text-charcoal/75">{site.location.full}</p>
                  <p className="mt-1.5 text-[0.7rem] font-light text-charcoal/45">
                    Exact street address and opening hours are shared on request — message us before visiting.
                  </p>
                </div>
              </div>

              <div className="mt-4 text-[0.72rem] font-light leading-relaxed text-charcoal/50">
                <p className="uppercase tracking-[0.18em] text-charcoal/40">Response</p>
                <p className="mt-1">
                  We reply to WhatsApp messages as soon as we can. Every order — including sizes, colours, final price
                  and delivery — is confirmed personally in that conversation.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      {/* ---------------- delivery info ---------------- */}
      <section id="delivery" className="surface-cocoa relative overflow-hidden py-14 md:py-20">
        <div className="shell relative">
          <Reveal>
            <SectionHeading
              eyebrow="Ordering & Delivery"
              title="How ordering works"
              subtitle="Simple, personal and confirmed with you at every step."
              dark
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '01', t: 'Choose your piece', d: 'Browse the collection and note the size and colour you want.' },
              { n: '02', t: 'Message us', d: 'Tap WhatsApp Order — your message arrives ready with the details filled in.' },
              { n: '03', t: 'We confirm', d: 'We check availability, confirm the final price and discuss sizing or custom changes.' },
              { n: '04', t: 'Delivery arranged', d: 'Delivery within Ogun State and to other states is arranged directly with you, with fees agreed upfront.' },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 70} className="h-full">
                <div className="flex h-full flex-col border border-white/10 bg-white/[0.03] p-5">
                  <span className="font-display text-2xl text-gold/50">{s.n}</span>
                  <p className="mt-3 font-display text-lg text-ivory">{s.t}</p>
                  <p className="mt-2 text-[0.78rem] font-light leading-relaxed text-ivory/55">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 text-center text-[0.66rem] uppercase tracking-[0.16em] text-ivory/35">
              No online payment is taken on this website · Payment is arranged with the boutique
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- official banner ---------------- */}
      <section className="bg-[#0b0908] py-14 md:py-20">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.85fr_1fr]">
          <Reveal>
            <div className="mx-auto max-w-[340px] border border-gold/35 bg-black p-2">
              <Image
                src="/brand/idrisiya-banner.png"
                alt="Official IDRISIYA COUTURE promotional banner with both WhatsApp numbers and the Olowotedo Area, Ogun State location"
                width={768}
                height={1376}
                sizes="(max-width: 1024px) 80vw, 340px"
                className="h-auto w-full object-contain"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="h-px w-8 bg-gold/70" aria-hidden />
              Save Our Details
            </p>
            <h2 className="h-section mt-4 text-ivory">
              One message,
              <br />
              <span className="italic text-gold-light">and we&apos;re on it.</span>
            </h2>
            <p className="mt-4 max-w-md text-[0.92rem] font-light leading-relaxed text-ivory/60">
              Whether you have a question about a piece, need a size recommendation, or want something made
              especially for you — reach out on either number and you&apos;ll speak to us directly.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink(generalMessage, 0)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                <WhatsApp className="h-4 w-4" />
                {site.phones[0].display}
              </a>
              <a
                href={waLink(generalMessage, 1)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-gold"
              >
                <WhatsApp className="h-4 w-4" />
                {site.phones[1].display}
              </a>
            </div>
            <a href="/shop" className="btn-link group mt-7 inline-flex text-gold-light">
              Browse the collection
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
