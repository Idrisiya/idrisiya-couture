'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import { generalMessage, waLink } from '@/lib/whatsapp';
import { Close, WhatsApp } from './Icons';

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-4 z-[75] flex flex-col items-end gap-3 transition-all duration-500 sm:bottom-7 sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {open && (
        <div className="w-[min(19rem,calc(100vw-2rem))] animate-floatUp border border-gold/30 bg-[#0a0806]/98 p-4 shadow-luxe backdrop-blur">
          <p className="eyebrow text-gold">Order &amp; Enquiries</p>
          <p className="mt-2 font-display text-lg leading-snug text-ivory">
            Chat with IDRISIYA COUTURE on WhatsApp
          </p>
          <div className="mt-3 space-y-2">
            {site.phones.map((p) => (
              <a
                key={p.wa}
                href={waLink(generalMessage, site.phones.indexOf(p))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 border border-white/12 px-3 py-2.5 text-sm text-ivory/85 transition-all hover:border-[#25D366]/60 hover:bg-[#25D366]/10"
              >
                <span className="flex items-center gap-2.5">
                  <WhatsApp className="h-4 w-4 text-[#4ddf82]" />
                  {p.display}
                </span>
                <span className="text-[0.58rem] uppercase tracking-[0.16em] text-gold">Chat</span>
              </a>
            ))}
          </div>
          <p className="mt-3 text-[0.6rem] leading-relaxed text-ivory/40">
            {site.location.full} · We reply as soon as we can.
          </p>
        </div>
      )}

      <div className="flex items-center gap-2">
        {open && (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-ivory/70 backdrop-blur transition-colors hover:text-ivory"
            aria-label="Close WhatsApp menu"
          >
            <Close className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Close WhatsApp contact options' : 'Open WhatsApp contact options'}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_-10px_rgba(37,211,102,0.75)] transition-transform hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/35 [animation-duration:2.8s]" aria-hidden />
          <WhatsApp className="relative h-7 w-7 sm:h-8 sm:w-8" />
        </button>
      </div>
    </div>
  );
}
