/* ============================================================================
   IDRISIYA COUTURE — Brand & contact settings
   ----------------------------------------------------------------------------
   Everything a non-developer may need to change lives in simple text here.
   WhatsApp numbers are stored in three forms:
     display → what the customer reads
     tel     → click-to-call link
     wa      → international click-to-chat destination (no "+", no leading 0)
   ========================================================================== */

import { siteUrl } from '@/lib/siteUrl';

export const site = {
  name: 'IDRISIYA COUTURE',
  shortName: 'IDRISIYA',
  slogan: 'The Fashion Hub — Luxury for Less.',
  tagline: 'Classic Never Goes Out of Fashion.',
  location: {
    area: 'Olowotedo Area',
    state: 'Ogun State',
    country: 'Nigeria',
    full: 'Olowotedo Area, Ogun State, Nigeria.',
  },
  phones: [
    {
      label: 'WhatsApp 1',
      display: '07081017665',
      pretty: '+234 708 101 7665',
      tel: '+2347081017665',
      wa: '2347081017665',
    },
    {
      label: 'WhatsApp 2',
      display: '08106506876',
      pretty: '+234 810 650 6876',
      tel: '+2348106506876',
      wa: '2348106506876',
    },
  ],
  // Social profiles — replace the "#" placeholders with your real page links.
  socials: [
    { name: 'Instagram', href: '#', icon: 'instagram' as const },
    { name: 'Facebook', href: '#', icon: 'facebook' as const },
    { name: 'TikTok', href: '#', icon: 'tiktok' as const },
  ],
  // Resolved from NEXT_PUBLIC_SITE_URL, falling back to the Vercel domain.
  // See lib/siteUrl.ts and .env.example.
  url: siteUrl,
} as const;

export const primaryWhatsApp = site.phones[0].wa;

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Dresses', href: '/shop?category=dresses' },
  { label: 'Two-Piece Sets', href: '/shop?category=two-piece-sets' },
  { label: 'Accessories', href: '/shop?category=accessories' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;
