export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-ivory">
      <span className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border border-gold/25 border-t-gold" />
        <span className="font-display text-sm tracking-[0.3em] text-gold-deep">IC</span>
      </span>
      <p className="mt-6 text-[0.6rem] uppercase tracking-[0.3em] text-charcoal/40">IDRISIYA COUTURE</p>
    </div>
  );
}
