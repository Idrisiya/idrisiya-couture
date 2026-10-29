/* ============================================================================
   WhatsApp helpers — click-to-chat with correctly encoded prefilled messages.
   ========================================================================== */

import { site } from '@/data/site';
import type { Product } from '@/data/products';
import { formatNaira } from '@/data/products';

export interface WhatsAppTarget {
  wa: string;
  display: string;
}

export const whatsAppNumbers = site.phones.map((p) => ({ wa: p.wa, display: p.display }));

/** Build a wa.me link that works on mobile apps and WhatsApp Web/Desktop. */
export function waLink(message: string, numberIndex = 0): string {
  const number = site.phones[numberIndex]?.wa ?? site.phones[0].wa;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Generic intro message used by header/footer/floating shortcuts. */
export const generalMessage = `Hello ${site.name}, I would like to make an enquiry about your collection.`;

export const orderIntro = `Hello ${site.name}, I would like to order this product.`;

export interface OrderSelection {
  size?: string;
  colour?: string;
  quantity?: number;
}

/** Message for a single product, including size / colour / quantity / link. */
export function productOrderMessage(
  product: Pick<Product, 'name' | 'price' | 'slug'>,
  selection: OrderSelection = {},
  origin?: string,
): string {
  const lines = [orderIntro, '', `Product: ${product.name}`];
  lines.push(`Price: ${product.price === null ? 'Contact for Price' : formatNaira(product.price)}`);
  if (selection.size) lines.push(`Size: ${selection.size}`);
  if (selection.colour) lines.push(`Colour: ${selection.colour}`);
  lines.push(`Quantity: ${selection.quantity ?? 1}`);
  if (origin) lines.push(`Product link: ${origin}/shop/${product.slug}`);
  lines.push('', 'Please confirm availability and delivery details.');
  return lines.join('\n');
}

export interface CartLineMessage {
  name: string;
  price: number | null;
  size: string;
  colour: string;
  quantity: number;
  slug: string;
}

export function cartOrderMessage(lines: CartLineMessage[], subtotal: number | null, origin?: string): string {
  const out = [`Hello ${site.name}, I would like to place an order.`, '', 'My selection:'];
  lines.forEach((l, i) => {
    out.push(
      `${i + 1}. ${l.name} — Size: ${l.size} — Colour: ${l.colour} — Qty: ${l.quantity} — ${
        l.price === null ? 'Contact for Price' : formatNaira(l.price * l.quantity)
      }`,
    );
  });
  out.push('');
  if (subtotal !== null) out.push(`Subtotal: ${formatNaira(subtotal)} (items with "Contact for Price" excluded)`);
  if (origin) out.push(`Reference: ${origin}/cart`);
  out.push(
    '',
    'Please confirm final prices, availability, delivery fees and delivery details.',
  );
  return out.join('\n');
}
