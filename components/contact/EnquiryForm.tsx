'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import { site } from '@/data/site';
import { Check, WhatsApp } from '@/components/Icons';

type Errors = Partial<Record<'name' | 'phone' | 'message', string>>;

export default function EnquiryForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General enquiry',
    product: '',
    message: '',
    number: 0,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = (): Errors => {
    const errs: Errors = {};
    if (form.name.trim().length < 2) errs.name = 'Please enter your name.';
    if (!/^[+\d][\d\s-]{6,17}$/.test(form.phone.trim())) errs.phone = 'Please enter a valid phone number.';
    if (form.message.trim().length < 10) errs.message = 'Please tell us a little more (10 characters or more).';
    return errs;
  };

  const buildMessage = () => {
    const lines = [
      `Hello ${site.name},`,
      '',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
    ];
    if (form.email.trim()) lines.push(`Email: ${form.email.trim()}`);
    lines.push(`Enquiry type: ${form.subject}`);
    if (form.product) lines.push(`Product: ${form.product}`);
    lines.push('', `Message: ${form.message.trim()}`);
    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = document.querySelector<HTMLElement>('[data-invalid="true"]');
      first?.focus();
      return;
    }
    setSent(true);
    window.open(
      `https://wa.me/${site.phones[form.number].wa}?text=${encodeURIComponent(buildMessage())}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center border border-gold/35 bg-[#0f0c09] p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-ivory">Your message is ready</h3>
        <p className="mt-3 max-w-sm text-[0.85rem] font-light leading-relaxed text-ivory/60">
          A WhatsApp window has opened with your enquiry filled in — just press send. If it didn&apos;t open, use one
          of the direct buttons and we&apos;ll reply as soon as we can.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a
            href={`https://wa.me/${site.phones[form.number].wa}?text=${encodeURIComponent(buildMessage())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            <WhatsApp className="h-4 w-4" />
            Open WhatsApp again
          </a>
          <button
            type="button"
            className="btn btn-outline-gold"
            onClick={() => {
              setSent(false);
              setForm({
                name: '',
                phone: '',
                email: '',
                subject: 'General enquiry',
                product: '',
                message: '',
                number: 0,
              });
            }}
          >
            Write another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="on-dark border border-white/12 bg-[#0f0c09] p-6 sm:p-8">
      <p className="eyebrow text-gold">Send an Enquiry</p>
      <h3 className="mt-2 font-display text-2xl text-ivory">Tell us what you need</h3>
      <p className="mt-2 text-[0.8rem] font-light leading-relaxed text-ivory/50">
        Complete the form and we&apos;ll open WhatsApp with your message ready to send.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label text-ivory/70">
            Full name *
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={set('name')}
            data-invalid={!!errors.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`field ${errors.name ? '!border-[#c1564d]' : ''}`}
            placeholder="Your name"
            autoComplete="name"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-[0.68rem] text-[#e0897f]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="field-label text-ivory/70">
            Phone / WhatsApp *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={set('phone')}
            data-invalid={!!errors.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`field ${errors.phone ? '!border-[#c1564d]' : ''}`}
            placeholder="e.g. 0801 234 5678"
            autoComplete="tel"
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-[0.68rem] text-[#e0897f]">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="field-label text-ivory/70">
            Email <span className="normal-case tracking-normal opacity-60">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={set('email')}
            className="field"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="subject" className="field-label text-ivory/70">
            Enquiry type
          </label>
          <select id="subject" name="subject" value={form.subject} onChange={set('subject')} className="field">
            {['General enquiry', 'Product enquiry', 'Sizing help', 'Delivery question', 'Custom / made-to-measure'].map(
              (o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="product" className="field-label text-ivory/70">
            Which product? <span className="normal-case tracking-normal opacity-60">(optional)</span>
          </label>
          <select id="product" name="product" value={form.product} onChange={set('product')} className="field">
            <option value="">Not sure yet / general</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="field-label text-ivory/70">
            Your message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={set('message')}
            data-invalid={!!errors.message}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`field resize-y ${errors.message ? '!border-[#c1564d]' : ''}`}
            placeholder="Tell us what you're looking for, your size, or the piece you have in mind…"
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-[0.68rem] text-[#e0897f]">
              {errors.message}
            </p>
          )}
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="field-label text-ivory/70">Send to</legend>
          <div className="flex gap-2">
            {site.phones.map((p, i) => (
              <button
                key={p.wa}
                type="button"
                onClick={() => setForm((f) => ({ ...f, number: i }))}
                aria-pressed={form.number === i}
                className={`flex-1 border px-3 py-2.5 text-[0.72rem] tracking-[0.06em] transition-all ${
                  form.number === i
                    ? 'border-gold bg-gold/15 text-gold-light'
                    : 'border-white/15 text-ivory/60 hover:border-gold/50'
                }`}
              >
                {p.display}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <button type="submit" className="btn btn-gold mt-6 w-full">
        <WhatsApp className="h-4 w-4" />
        Send via WhatsApp
      </button>
      <p className="mt-3 text-center text-[0.62rem] leading-relaxed text-ivory/35">
        This form opens WhatsApp with your message — it does not submit to a server or take payment.
      </p>
    </form>
  );
}
