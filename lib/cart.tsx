'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

export interface CartItem {
  key: string;
  slug: string;
  name: string;
  image: string;
  price: number | null;
  size: string;
  colour: string;
  quantity: number;
}

type Action =
  | { type: 'add'; item: Omit<CartItem, 'key'> }
  | { type: 'remove'; key: string }
  | { type: 'qty'; key: string; quantity: number }
  | { type: 'clear' }
  | { type: 'hydrate'; items: CartItem[] };

const STORAGE_KEY = 'idrisiya-cart-v1';
const MAX_QTY = 20;

const keyFor = (i: Pick<CartItem, 'slug' | 'size' | 'colour'>) => `${i.slug}__${i.size}__${i.colour}`;

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'add': {
      const key = keyFor(action.item);
      const existing = state.find((i) => i.key === key);
      if (existing) {
        return state.map((i) =>
          i.key === key ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + action.item.quantity) } : i,
        );
      }
      return [...state, { ...action.item, key }];
    }
    case 'remove':
      return state.filter((i) => i.key !== action.key);
    case 'qty':
      return state
        .map((i) => (i.key === action.key ? { ...i, quantity: Math.max(0, Math.min(MAX_QTY, action.quantity)) } : i))
        .filter((i) => i.quantity > 0);
    case 'clear':
      return [];
    case 'hydrate':
      return action.items;
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number | null;
  hasUnpriced: boolean;
  isOpen: boolean;
  hydrated: boolean;
  addItem: (item: Omit<CartItem, 'key'>) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  /* Load cart once on mount so it survives page changes and reloads. */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          dispatch({
            type: 'hydrate',
            items: parsed.filter(
              (i: unknown): i is CartItem =>
                !!i && typeof i === 'object' && 'key' in (i as object) && 'slug' in (i as object),
            ),
          });
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  /* Persist after hydration only, so we never overwrite storage with []. */
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable — cart still works in-session */
    }
  }, [items, hydrated]);

  /* Lock body scroll while the drawer is open. */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const addItem = useCallback((item: Omit<CartItem, 'key'>) => {
    dispatch({ type: 'add', item });
    setToast(`${item.name} added to cart`);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const priced = items.filter((i) => i.price !== null);
    const subtotal = priced.length
      ? priced.reduce((sum, i) => sum + (i.price as number) * i.quantity, 0)
      : items.length
        ? 0
        : null;
    return {
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.length ? subtotal : null,
      hasUnpriced: items.some((i) => i.price === null),
      isOpen,
      hydrated,
      addItem,
      removeItem: (key) => dispatch({ type: 'remove', key }),
      setQuantity: (key, quantity) => dispatch({ type: 'qty', key, quantity }),
      clearCart: () => dispatch({ type: 'clear' }),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [items, isOpen, hydrated, addItem]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex justify-center px-4 sm:bottom-8"
      >
        {toast && (
          <div className="animate-floatUp rounded-none border border-gold/40 bg-ink/95 px-5 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-ivory shadow-luxe backdrop-blur">
            <span className="mr-2 text-gold">✦</span>
            {toast}
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
