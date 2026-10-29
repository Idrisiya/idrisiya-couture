/* ============================================================================
   IDRISIYA COUTURE — Product catalogue (EDIT ME)
   ----------------------------------------------------------------------------
   HOW TO EDIT
   1. Each object below is one product card + one product detail page.
   2. `image` accepts any public URL (including your Cloudinary URLs) or a local
      file placed in /public/images. Example Cloudinary URL:
      https://res.cloudinary.com/nrbvg573/image/upload/v1793220248/<asset-id>.jpg
   3. `price` is a number in Naira. Set it to `null` to display
      "Contact for Price" instead of a figure.
   4. NEVER invent stock levels — `availability` only communicates that the team
      confirms every order on WhatsApp.

   ⚠️ PLACEHOLDER NOTE
   Your Cloudinary collection currently holds 3 atelier photographs (fabric
   stacks, threads, a vintage sewing machine) — no fashion lookbook shots yet.
   Those three are used honestly in the atelier / editorial sections. The
   product images below are cohesive studio stand-ins so no card is ever empty
   or broken. Replace each `image` path with your own photo URL when ready —
   nothing else on the site needs to change.

   PRICES BELOW ARE SAMPLE VALUES for layout purposes. Confirm/replace them
   with your real prices before launch.

   QUICK REFERENCE — what changing a field does
     image      → swap the photo (local path or https URL)
     price      → number in ₦, or null to show "Contact for Price"
     featured   → true puts it in "The Couture Collection" on the homepage
     badge      → 'new' | 'sale' | 'limited' | 'bestseller' | remove to hide
     addedAt    → controls the "Newest arrivals" sort order
     sizes / colours → update the chips on the product page automatically
   ========================================================================== */

export type Availability = 'in-stock' | 'made-to-order' | 'enquire';

export interface Colour {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  collection?: string;
  image: string;
  gallery?: string[];
  price: number | null;
  compareAt?: number | null;
  sizes: string[];
  colours: Colour[];
  badge?: 'new' | 'sale' | 'limited' | 'bestseller';
  availability: Availability;
  featured?: boolean;
  fabric?: string;
  shortDescription: string;
  description: string;
  /** ISO date — used by the "Newest first" sort */
  addedAt: string;
}

export type CategorySlug =
  | 'dresses'
  | 'two-piece-sets'
  | 'tops-blouses'
  | 'casual-wear'
  | 'corporate-wear'
  | 'occasion-wear'
  | 'accessories';

export const categories: {
  slug: CategorySlug;
  name: string;
  short: string;
  blurb: string;
  image: string;
}[] = [
  {
    slug: 'dresses',
    name: 'Elegant Dresses',
    short: 'Dresses',
    blurb: 'Floor-sweeping silhouettes and quietly striking day dresses.',
    image: '/images/p-gold-sequin.jpg',
  },
  {
    slug: 'two-piece-sets',
    name: 'Two-Piece Sets',
    short: 'Two-Piece Sets',
    blurb: 'Considered pairings that move effortlessly from day to evening.',
    image: '/images/p-ankara-set.jpg',
  },
  {
    slug: 'tops-blouses',
    name: "Tops & Blouses",
    short: 'Tops',
    blurb: 'Fluid satins and sculpted shoulders to anchor any look.',
    image: '/images/p-satin-blouse.jpg',
  },
  {
    slug: 'casual-wear',
    name: 'Casual Wear',
    short: 'Casual',
    blurb: 'Relaxed elegance for the days that call for ease.',
    image: '/images/p-floral-midi.jpg',
  },
  {
    slug: 'corporate-wear',
    name: 'Corporate Wear',
    short: 'Corporate',
    blurb: 'Sharp tailoring with a soft, feminine hand.',
    image: '/images/p-tan-suit.jpg',
  },
  {
    slug: 'occasion-wear',
    name: 'Occasion Wear',
    short: 'Occasion',
    blurb: 'For the entrances, the anniversaries and the aisles.',
    image: '/images/p-black-jumpsuit.jpg',
  },
  {
    slug: 'accessories',
    name: 'Fashion Accessories',
    short: 'Accessories',
    blurb: 'The gold detail that completes the story.',
    image: '/images/p-gold-clutch.jpg',
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<
  CategorySlug,
  (typeof categories)[number]
>;

const SIZES_WOMEN = ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'];
const SIZES_ONE = ['One Size'];

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'champagne-mirage-sequin-gown',
    name: 'Champagne Mirage Sequined Gown',
    category: 'occasion-wear',
    collection: 'The Golden Hour',
    image: '/images/p-gold-sequin.jpg',
    price: 78500,
    compareAt: 92000,
    sizes: SIZES_WOMEN,
    colours: [
      { name: 'Champagne Gold', hex: '#C9A15A' },
      { name: 'Rose Gold', hex: '#B98276' },
    ],
    badge: 'bestseller',
    availability: 'made-to-order',
    featured: true,
    fabric: 'Hand-beaded sequin on stretch mesh',
    shortDescription: 'An off-shoulder sequin column with a whisper of a train.',
    description:
      'Cut close through the bodice and released into a soft floor-skimming flare, the Champagne Mirage is made for evenings that deserve an entrance. Each sequin catches light differently, so the gown shifts from molten gold to pale champagne as you move. Fully lined with an inner corselette for structure.',
    addedAt: '2026-10-14',
  },
  {
    id: 'p2',
    slug: 'amara-lace-bridal-gown',
    name: 'Amara Lace Bridal Gown',
    category: 'dresses',
    collection: 'Bridal Atelier',
    image: '/images/p-white-lace.jpg',
    price: 265000,
    sizes: SIZES_WOMEN,
    colours: [
      { name: 'Ivory', hex: '#F3EAD9' },
      { name: 'Champagne', hex: '#E2CDAE' },
    ],
    badge: 'new',
    availability: 'made-to-order',
    featured: true,
    fabric: 'French corded lace over silk crepe',
    shortDescription: 'Long-sleeved ivory lace with a soft, unbroken line.',
    description:
      'A bridal gown drawn with restraint: a fine lace bodice, an unbroken line of silk crepe and a chapel-length veil. The neckline is finished by hand so it sits flush against the collarbone. Fully boned bodice, hidden back zip and covered buttons.',
    addedAt: '2026-10-21',
  },
  {
    id: 'p3',
    slug: 'ada-tailored-blazer-suit',
    name: 'Ada Tailored Blazer Suit',
    category: 'corporate-wear',
    collection: 'Power Hours',
    image: '/images/p-tan-suit.jpg',
    price: 69500,
    sizes: SIZES_WOMEN,
    colours: [
      { name: 'Camel', hex: '#B98A55' },
      { name: 'Charcoal', hex: '#3A3A3A' },
      { name: 'Ivory', hex: '#EFE6D6' },
    ],
    badge: 'new',
    availability: 'in-stock',
    featured: true,
    fabric: 'Stretch suiting crepe',
    shortDescription: 'A double-breasted blazer with matching slim trousers.',
    description:
      'The suit that carries a whole working week. A soft-shouldered double-breasted blazer, fully lined, paired with a slim-cut trouser that falls cleanly from the hip. Wear it buttoned as a dress with a heel, or open over a camisole.',
    addedAt: '2026-10-24',
  },
  {
    id: 'p4',
    slug: 'zuri-ankara-two-piece-set',
    name: 'Zuri Ankara Two-Piece Set',
    category: 'two-piece-sets',
    collection: 'Classic Never Goes Out of Fashion',
    image: '/images/p-ankara-set.jpg',
    price: 54000,
    sizes: SIZES_WOMEN,
    colours: [
      { name: 'Rust Print', hex: '#A4552F' },
      { name: 'Indigo Print', hex: '#2C3A6B' },
    ],
    badge: 'bestseller',
    availability: 'made-to-order',
    featured: true,
    fabric: 'Premium wax print cotton',
    shortDescription: 'A peplum top and straight trouser in rich geometric print.',
    description:
      'A modern reading of the ankara two-piece: a fitted peplum top with a defined waist and a straight-leg trouser cut to graze the ankle. The print is a geometric wax design in rust and indigo with fine gold accents. Can be made in your own fabric — just send us a message.',
    addedAt: '2026-10-09',
  },
  {
    id: 'p5',
    slug: 'emerald-hour-suit-set',
    name: 'Emerald Hour Suit Set',
    category: 'two-piece-sets',
    collection: 'Power Hours',
    image: '/images/p-emerald-set.jpg',
    price: 72500,
    sizes: SIZES_WOMEN,
    colours: [
      { name: 'Emerald', hex: '#1F5B43' },
      { name: 'Black', hex: '#111111' },
    ],
    availability: 'made-to-order',
    featured: true,
    fabric: 'Bonded crepe with gold hardware',
    shortDescription: 'Cropped blazer and wide-leg trouser in deep emerald.',
    description:
      'Saturated emerald, cut sharp. A cropped single-button blazer with a sculpted shoulder sits over a high-waisted wide-leg trouser finished with a detachable gold belt. Equally at home at a board meeting or a dinner reservation.',
    addedAt: '2026-10-18',
  },
  {
    id: 'p6',
    slug: 'noir-wide-leg-jumpsuit',
    name: 'Noir Wide-Leg Jumpsuit',
    category: 'occasion-wear',
    image: '/images/p-black-jumpsuit.jpg',
    price: 58000,
    compareAt: 66000,
    sizes: SIZES_WOMEN,
    colours: [
      { name: 'Jet Black', hex: '#0D0D0D' },
      { name: 'Deep Chocolate', hex: '#3B2A21' },
    ],
    badge: 'sale',
    availability: 'in-stock',
    fabric: 'Heavyweight stretch jersey',
    shortDescription: 'A deep-V jumpsuit with a belted, floor-grazing leg.',
    description:
      'One piece, no decisions. A deep-V neckline, a defined waist and a wide leg that moves like a skirt when you walk. Heavyweight jersey keeps the line clean without clinging. Finished with a removable self-tie belt.',
    addedAt: '2026-09-30',
  },
  {
    id: 'p7',
    slug: 'aurelie-satin-wrap-blouse',
    name: 'Aurélie Satin Wrap Blouse',
    category: 'tops-blouses',
    image: '/images/p-satin-blouse.jpg',
    price: 28500,
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14'],
    colours: [
      { name: 'Champagne', hex: '#E7D2A8' },
      { name: 'Ivory', hex: '#F6EFE2' },
      { name: 'Black', hex: '#111111' },
    ],
    badge: 'new',
    availability: 'in-stock',
    fabric: 'Sand-washed silk satin',
    shortDescription: 'A softly draped wrap blouse in warm champagne satin.',
    description:
      'The quiet workhorse of a considered wardrobe. A wrap front with a self-tie at the waist, a fluid sleeve and a hem long enough to tuck. The satin has a matte, sand-washed finish — luxurious without shine.',
    addedAt: '2026-10-26',
  },
  {
    id: 'p8',
    slug: 'terracotta-bloom-midi-dress',
    name: 'Terracotta Bloom Midi Dress',
    category: 'casual-wear',
    image: '/images/p-floral-midi.jpg',
    price: 42000,
    sizes: SIZES_WOMEN,
    colours: [
      { name: 'Terracotta Bloom', hex: '#B76A47' },
      { name: 'Sand Bloom', hex: '#D3B18C' },
    ],
    badge: 'new',
    availability: 'in-stock',
    featured: true,
    fabric: 'Printed viscose crêpe',
    shortDescription: 'Flutter sleeves and a tie waist in a warm floral print.',
    description:
      'An easy midi with movement built in: flutter sleeves, a soft tie waist and a skirt that catches the breeze. Printed on breathable viscose crêpe in warm terracotta and cream. Fully lined to the knee.',
    addedAt: '2026-10-23',
  },
  {
    id: 'p9',
    slug: 'gilded-strappy-heel',
    name: 'Gilded Strappy Heel',
    category: 'accessories',
    image: '/images/p-gold-heels.jpg',
    price: 32000,
    sizes: ['EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41'],
    colours: [{ name: 'Metallic Gold', hex: '#C8A048' }],
    badge: 'limited',
    availability: 'enquire',
    fabric: 'Metallic leather upper, 90mm heel',
    shortDescription: 'A fine gold strap sandal on a slim 90mm heel.',
    description:
      'Fine straps, a slim 90mm heel and a cushioned footbed that makes an evening possible. The gold finish is brushed rather than mirrored, so it reads warm against the skin. Comes with a dust bag.',
    addedAt: '2026-10-05',
  },
  {
    id: 'p10',
    slug: 'shimmer-chain-pouch',
    name: 'Shimmer Chain Pouch',
    category: 'accessories',
    image: '/images/p-gold-clutch.jpg',
    price: null,
    sizes: SIZES_ONE,
    colours: [
      { name: 'Champagne Gold', hex: '#D9BE7C' },
      { name: 'Champagne Shimmer', hex: '#CBB27E' },
    ],
    badge: 'new',
    availability: 'enquire',
    fabric: 'Woven metallic clutch with detachable gold chain',
    shortDescription: 'A structured evening pouch with a fine gold chain.',
    description:
      'A compact, structured pouch in a fine woven metallic weave, finished with gold hardware and a detachable chain so it can be carried on the shoulder or in the hand. Fits a phone, a cardholder and a lipstick. Contact us for current colourways and pricing.',
    addedAt: '2026-10-27',
  },
  {
    id: 'p11',
    slug: 'golda-beaded-column-gown',
    name: 'Golda Beaded Column Gown',
    category: 'dresses',
    collection: 'The Golden Hour',
    image: '/images/p-gold-bag.jpg',
    price: null,
    sizes: SIZES_WOMEN,
    colours: [
      { name: 'Antique Gold', hex: '#C3A05C' },
      { name: 'Champagne', hex: '#E3D0A6' },
    ],
    badge: 'new',
    availability: 'enquire',
    fabric: 'Hand-beaded sequin with a draped train',
    shortDescription: 'A hand-beaded column with a softly pooling train.',
    description:
      'Full sequin coverage, a fitted through-line and a train that pools on the floor like poured light. Made to your measurements and fully lined so the beading never catches. Contact us for current colourways and pricing.',
    addedAt: '2026-10-25',
  },
];

/* ------------------------------------------------------------------ helpers */

export const formatNaira = (value: number) => `₦${value.toLocaleString('en-NG')}`;

export const priceLabel = (p: Product) => (p.price === null ? 'Contact for Price' : formatNaira(p.price));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const byCategory = (slug: CategorySlug) => products.filter((p) => p.category === slug);

export const featuredProducts = products.filter((p) => p.featured);

export const newArrivals = [...products]
  .sort((a, b) => +new Date(b.addedAt) - +new Date(a.addedAt))
  .slice(0, 6);

export const availabilityLabel: Record<Availability, string> = {
  'in-stock': 'Available to order',
  'made-to-order': 'Made to order',
  enquire: 'Enquire for availability',
};

export const badgeLabel: Record<NonNullable<Product['badge']>, string> = {
  new: 'New Arrival',
  sale: 'Sale',
  limited: 'Limited',
  bestseller: 'Bestseller',
};

/** Products are only marked "sale" where a real comparison price is entered. */
export const isOnSale = (p: Product) => p.badge === 'sale' && !!p.compareAt && p.compareAt > (p.price ?? 0);
