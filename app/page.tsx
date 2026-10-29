import Hero from '@/components/home/Hero';
import ShopByCategory from '@/components/home/ShopByCategory';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoBanner from '@/components/home/PromoBanner';
import Atelier from '@/components/home/Atelier';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import LuxuryForLess from '@/components/home/LuxuryForLess';
import WhyChoose from '@/components/home/WhyChoose';
import WhatsAppCta from '@/components/home/WhatsAppCta';
import { site } from '@/data/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: 'IDRISIYA COUTURE',
  slogan: site.slogan,
  description:
    "Luxury women's fashion boutique in Olowotedo Area, Ogun State, Nigeria offering elegant dresses, two-piece sets, corporate and occasion wear, and accessories.",
  image: `${site.url}/brand/idrisiya-logo.png`,
  telephone: site.phones.map((p) => p.tel),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Olowotedo Area',
    addressRegion: 'Ogun State',
    addressCountry: 'NG',
  },
  currenciesAccepted: 'NGN',
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <ShopByCategory />
      <FeaturedProducts />
      <PromoBanner />
      <Atelier />
      <NewArrivalsSection />
      <LuxuryForLess />
      <WhyChoose />
      <WhatsAppCta />
    </>
  );
}
