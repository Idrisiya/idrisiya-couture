# IDRISIYA COUTURE — Luxury Fashion E‑Commerce Website

A fully responsive, production‑ready storefront for **IDRISIYA COUTURE** — *The Fashion Hub — Luxury for Less.*
Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS.

---

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

Optional: `cp .env.example .env.local` and set `NEXT_PUBLIC_SITE_URL` (see *Deploying to Vercel*).

---

## What's included

| Page | Route | Notes |
|---|---|---|
| Home | `/` | Hero, category grid, featured products, official banner, atelier story, new arrivals, "Luxury for Less", why‑choose, WhatsApp CTA |
| Shop | `/shop` | Live search, category chips, price/newest sorting, load‑more, empty states |
| Product | `/shop/[slug]` | Gallery, size/colour/quantity, add‑to‑cart, WhatsApp order, related pieces |
| New Arrivals | `/new-arrivals` | Newest six products |
| About | `/about` | Editorial brand story, values, real atelier photography, official banner |
| Contact | `/contact` | Both WhatsApp numbers, click‑to‑call, validated enquiry form → WhatsApp, ordering steps |
| Cart | `/cart` | Quantity editing, subtotal, WhatsApp order summary |
| 404 | any unknown route | On‑brand "not in the boutique" page |

Shopping cart persists in `localStorage` (key `idrisiya-cart-v1`), so navigating between pages never resets it.

---

## How to edit your content

### 1. Products, prices, sizes, colours
**`data/products.ts`** — every product is one object:

```ts
{
  id: 'p1',
  slug: 'champagne-mirage-sequin-gown',   // becomes /shop/champagne-mirage-sequin-gown
  name: 'Champagne Mirage Sequined Gown',
  category: 'occasion-wear',              // see CategorySlug list
  image: '/images/p-gold-sequin.jpg',     // local file OR full https URL (e.g. Cloudinary)
  price: 78500,                           // number in ₦ — or `null` for "Contact for Price"
  compareAt: 92000,                       // optional crossed-out price (only with badge 'sale')
  sizes: ['UK 8', 'UK 10'],
  colours: [{ name: 'Champagne Gold', hex: '#C9A15A' }],
  badge: 'new',                           // 'new' | 'sale' | 'limited' | 'bestseller'
  availability: 'made-to-order',          // 'in-stock' | 'made-to-order' | 'enquire'
  featured: true,                         // shows in "The Couture Collection"
  addedAt: '2026-10-14',                  // drives "Newest" sorting
  ...
}
```

To add a product: copy a block, change the values. To remove one: delete the block.
Product cards, filters, search, sitemap and related products all update automatically.

**Categories** live in the same file (`categories` array) — rename, re‑order or re‑image them there.

### 2. WhatsApp numbers, location, socials
**`data/site.ts`** — numbers are stored three ways so nothing breaks:

| Field | Example | Used for |
|---|---|---|
| `display` | `07081017665` | what the customer reads |
| `tel` | `+2347081017665` | click‑to‑call |
| `wa` | `2347081017665` | click‑to‑chat (`wa.me`) |

Replace the `#` placeholders in `socials` with your Instagram / Facebook / TikTok URLs.
Update `url` to your real domain before launch (used for SEO tags and product‑link messages).

### 3. Images
Drop files into `public/images/` and reference them as `/images/filename.jpg`,
**or** paste any public `https://` URL directly into a product's `image` field.

### 4. Logo & promotional banner
- `public/brand/idrisiya-logo.png` — your original square logo (used in header, footer, mobile drawer)
- `public/brand/idrisiya-banner.png` — your original tall promotional banner (homepage + About + Contact)

Both are displayed with `object-contain` inside responsive frames — never stretched, cropped or redesigned.

---

## ⚠️ Important notes about placeholders

1. **Photos.** Your Cloudinary collection (`nrbvg573/ca8b3a46…`) currently contains **3 images — all atelier
   photography** (fabric bolts, thread/pin close‑ups, a vintage black‑and‑gold sewing machine). Those three are
   used honestly, exactly as supplied, in *Inside the Atelier* (homepage) and *About → In the Workroom*.
   No fashion lookbook shots were present in the collection, so the 11 product photographs and the hero image
   are cohesive gold‑and‑brown studio stand‑ins — this guarantees no card is ever empty, stretched or broken.
   **Replace each `image` path in `data/products.ts` with your real product photos before launch** — nothing
   else on the site needs to change.

   The catalogue currently holds 11 pieces across 7 categories:

   | Category | Pieces |
   |---|---|
   | Dresses | Amara Lace Bridal Gown, Golda Beaded Column Gown |
   | Two-Piece Sets | Zuri Ankara Two‑Piece Set, Emerald Hour Suit Set |
   | Tops & Blouses | Aurélie Satin Wrap Blouse |
   | Casual Wear | Terracotta Bloom Midi Dress |
   | Corporate Wear | Ada Tailored Blazer Suit |
   | Occasion Wear | Champagne Mirage Sequined Gown, Noir Wide‑Leg Jumpsuit |
   | Accessories | Gilded Strappy Heel, Shimmer Chain Pouch |

2. **Prices.** All ₦ figures are sample values for layout purposes. Confirm or replace them.
   Two products (the Shimmer Chain Pouch and the Golda Beaded Column Gown) intentionally show
   **"Contact for Price"** to demonstrate that state — set `price: null` on any product to use it.

3. **No online payment.** Checkout is a WhatsApp order enquiry. Every screen states clearly that final prices,
   availability, delivery fees and payment are agreed directly with the boutique. No payment is simulated.

4. **No inventory system.** Availability labels say "Available to order" / "Made to order" / "Enquire for
   availability" — never fake stock counts.

---

## Deploying to Vercel

This project is pre-configured for Vercel — there is nothing to change before your first deploy.

### One-click deploy
1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in with GitHub.
2. Import **`Idrisiya/idrisiya-couture`**.
3. Vercel auto-detects Next.js. Leave **Framework Preset: Next.js**, build `next build`,
   install `npm ci` — then press **Deploy**.
4. Your site is live at `https://idrisiya-couture.vercel.app` in about a minute.

Every later `git push` to `main` redeploys automatically; pull requests get their own preview URLs.

### Set your site URL (recommended)
The site needs to know its own public address — it is used in SEO tags, `sitemap.xml`, `robots.txt`,
and in the **product links inside WhatsApp order messages**.

In Vercel: **Project → Settings → Environment Variables → Add**

| Name | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | Production, Preview, Development |

No trailing slash. The `NEXT_PUBLIC_` prefix is required so the value matches on server and browser —
without it, WhatsApp product links would point at the wrong host.

If you skip this, the app safely falls back to `https://idrisiya-couture.vercel.app`.

After changing the variable you must **redeploy** for it to take effect
(Deployments → ⋯ → Redeploy).

### Custom domain
**Project → Settings → Domains → Add**, then point your DNS at Vercel as instructed.
Once the domain is live, set `NEXT_PUBLIC_SITE_URL` to it and redeploy so shared links and SEO tags
use the branded address.

### Notes
- `vercel.json` adds security headers (`X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`) plus long-lived caching for `/images`, `/fonts` and `/brand`.
- `next.config.mjs` fails the build on TypeScript or lint errors, and enables AVIF/WebP image
  optimisation on Vercel.
- `package.json` declares `node >= 20.9.0`; Vercel builds on Node 22.
- No database, API keys or payment credentials are required. Orders go to WhatsApp.
- **GitHub Pages will not work** for this project — it needs Next.js server features
  (image optimisation, dynamic `/shop` search params, generated `sitemap.xml` / `robots.txt`).


---

## Design system

| Token | Value |
|---|---|
| Luxury black | `#050505` |
| Dark chocolate | `#2B1D17` |
| Metallic gold | `#D4AF37` |
| Champagne gold | `#F4D88A` |
| Warm ivory | `#FFF9ED` |
| Charcoal text | `#252525` |

Fonts are **Cormorant Garamond** (display serif) and **Jost** (sans), self‑hosted in `public/fonts/`
so they load without any third‑party request.

---

## Accessibility & performance

- Semantic landmarks, skip link, labelled form fields, `aria-pressed` on option buttons, visible focus rings.
- Respects `prefers-reduced-motion` (all reveals and marquees are disabled).
- Next.js `Image` optimisation, responsive `sizes`, priority loading on hero images.
- SEO metadata per page, Open Graph/Twitter cards, `ClothingStore` + `Product` JSON‑LD, `sitemap.xml`, `robots.txt`.
- Zero horizontal overflow verified at 390px and 1440px.

---

## Contact
**IDRISIYA COUTURE** · Olowotedo Area, Ogun State, Nigeria.
WhatsApp **07081017665** · **08106506876**
