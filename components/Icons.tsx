import React from 'react';

type P = React.SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

export const Search = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.4-3.4" />
  </svg>
);

export const Bag = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 8h14l-1.1 12H6.1L5 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);

export const Menu = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ArrowLeft = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 12H5" />
    <path d="m11 18-6-6 6-6" />
  </svg>
);

export const ChevronDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const Plus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Minus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const Trash = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13" />
  </svg>
);

export const Pin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const Phone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
  </svg>
);

export const Sparkle = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.5 13.6 9 19 10.6 13.6 12.2 12 17.7 10.4 12.2 5 10.6 10.4 9 12 3.5Z" />
    <path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
  </svg>
);

export const Hanger = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 8.2a2.2 2.2 0 1 1 2.2-2.2" />
    <path d="M12 8.2 4 14.6a1.4 1.4 0 0 0 .9 2.5h14.2a1.4 1.4 0 0 0 .9-2.5L12 8.2Z" />
  </svg>
);

export const Chat = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 12.5c0 3.9-3.6 7-8 7a9 9 0 0 1-2.6-.4L5 21l1-3.6A6.7 6.7 0 0 1 4 12.5c0-3.9 3.6-7 8-7s8 3.1 8 7Z" />
    <path d="M9 12h.01M12 12h.01M15 12h.01" />
  </svg>
);

export const Scissors = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="6" r="2.4" />
    <circle cx="6" cy="18" r="2.4" />
    <path d="M8.1 7.6 20 18M20 6 8.1 16.4" />
  </svg>
);

export const Gown = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 3.5h6l-.7 3.2 5.2 13.8H4.5L9.7 6.7 9 3.5Z" />
    <path d="M9.7 6.7h4.6" />
  </svg>
);

export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.13-.42-2.15-1.33-.79-.71-1.32-1.58-1.48-1.88-.15-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46 0 1.45 1.05 2.85 1.2 3.05.15.2 2.07 3.31 5.02 4.5.7.3 1.25.48 1.68.61.7.22 1.35.19 1.86.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    <path d="M12.03 2C6.55 2 2.1 6.44 2.1 11.9c0 1.75.46 3.46 1.34 4.96L2 22l5.29-1.38a9.94 9.94 0 0 0 4.74 1.2h.01c5.47 0 9.92-4.44 9.92-9.9C21.96 6.44 17.5 2 12.03 2Zm0 18.13h-.01a8.24 8.24 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.26-8.23a8.23 8.23 0 0 1 8.25 8.24c0 4.54-3.71 8.22-8.26 8.22Z" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M16.8 7.2h.01" />
  </svg>
);

export const Facebook = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 21v-7.2h2.6l.4-3h-3V8.9c0-.87.24-1.46 1.5-1.46H17V4.75c-.3-.04-1.3-.13-2.47-.13-2.45 0-4.03 1.45-4.03 4.1v2.08H8v3h2.5V21h3Z" />
  </svg>
);

export const TikTok = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M16.6 3h-2.9v11.3a2.4 2.4 0 1 1-2.4-2.4c.2 0 .4 0 .6.06V9a5.3 5.3 0 1 0 4.7 5.26V8.1a5.6 5.6 0 0 0 3.3 1.07V6.28A3.28 3.28 0 0 1 16.6 3Z" />
  </svg>
);

export const iconMap = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: TikTok,
} as const;

export const CategoryIcon: Record<string, (p: P) => React.ReactElement> = {
  dresses: Gown,
  'two-piece-sets': Hanger,
  'tops-blouses': Sparkle,
  'casual-wear': Sparkle,
  'corporate-wear': Scissors,
  'occasion-wear': Sparkle,
  accessories: Sparkle,
};

export const Shield = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 2.6v5.2c0 4.4-3 8-7 10.2-4-2.2-7-5.8-7-10.2V5.6L12 3Z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
  </svg>
);
