import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        cocoa: '#2B1D17',
        gold: { DEFAULT: '#D4AF37', light: '#F4D88A', deep: '#A9812A' },
        ivory: '#FFF9ED',
        charcoal: '#252525',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Jost', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: { luxe: '0.28em', wide2: '0.14em' },
      boxShadow: { luxe: '0 30px 80px -30px rgba(0,0,0,0.55)' },
      maxWidth: { shell: '1280px' },
      keyframes: {
        floatUp: { '0%': { opacity: '0', transform: 'translateY(26px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
        softPulse: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.55' } },
      },
      animation: {
        floatUp: 'floatUp .9s cubic-bezier(.22,.68,0,1) both',
        shimmer: 'shimmer 6s linear infinite',
        softPulse: 'softPulse 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
