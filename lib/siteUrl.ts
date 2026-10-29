/* ============================================================================
   Canonical site URL — used for SEO, sitemap, robots and product links that
   are shared inside WhatsApp messages.

   Resolution order:
     1. NEXT_PUBLIC_SITE_URL  — set this to your custom domain in Vercel.
     2. The production Vercel domain for this project.
   It must be NEXT_PUBLIC_* so the value is identical on the server and in the
   browser; otherwise WhatsApp product links would differ between render paths.
   ========================================================================== */

const FALLBACK = 'https://idrisiya-couture.vercel.app';

function normalise(value: string): string {
  const withProtocol = value.startsWith('http') ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, '');
}

export const siteUrl: string = normalise(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK,
);

/** Build an absolute URL for the canonical site. */
export const absoluteUrl = (path = ''): string =>
  `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
