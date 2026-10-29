import Reveal from '@/components/Reveal';
import { SectionHeading } from '@/components/ui';
import { Chat, Gown, Hanger, Sparkle } from '@/components/Icons';

const benefits = [
  {
    icon: Gown,
    title: 'Elegant Styles',
    text: 'Discover fashion for different occasions and personal styles.',
  },
  {
    icon: Chat,
    title: 'Easy Ordering',
    text: 'Contact us directly to enquire about products and place orders.',
  },
  {
    icon: Sparkle,
    title: 'Personal Service',
    text: 'Get assistance with product details, sizes, and availability.',
  },
  {
    icon: Hanger,
    title: 'Fashion for Every Occasion',
    text: 'Explore outfits for everyday wear, outings, celebrations, and special moments.',
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#FBF6EC] py-16 md:py-24" aria-labelledby="why-heading">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="The Difference"
            title={<span id="why-heading">Why Choose IDRISIYA COUTURE?</span>}
            subtitle="Four things we can genuinely promise — no more, no less."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 80} className="h-full">
              <div className="group relative flex h-full flex-col border border-charcoal/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/55 hover:shadow-[0_30px_60px_-40px_rgba(43,29,23,0.5)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 text-gold-deep transition-colors duration-500 group-hover:bg-gold/10">
                  <b.icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-[0.58rem] uppercase tracking-[0.24em] text-charcoal/35">
                  0{i + 1}
                </p>
                <h3 className="mt-2 h-card text-[1.15rem] text-charcoal">{b.title}</h3>
                <p className="mt-2.5 text-[0.82rem] font-light leading-relaxed text-charcoal/60">{b.text}</p>
                <span className="mt-auto pt-5">
                  <span className="block h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-16" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
