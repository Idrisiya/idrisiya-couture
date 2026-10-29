'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import type { Product } from '@/data/products';
import { Check } from './Icons';

/**
 * Quick add-to-cart from a product card. Uses the first available size and
 * colour; the product page lets the customer choose precisely.
 */
export default function AddToCartButton({
  product,
  className = 'btn btn-dark w-full',
  label = 'Add to Cart',
  onAdded,
}: {
  product: Product;
  className?: string;
  label?: string;
  onAdded?: () => void;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handle = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      size: product.sizes[0],
      colour: product.colours[0]?.name ?? 'As styled',
      quantity: 1,
    });
    setAdded(true);
    onAdded?.();
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button type="button" onClick={handle} className={className} aria-live="polite">
      {added ? (
        <>
          <Check className="h-3.5 w-3.5" /> Added
        </>
      ) : (
        label
      )}
    </button>
  );
}
