import { useRef, useState, type FormEvent } from 'react';
import config from '../lib/contact-form.config.json';

export default function ContactForm() {
  const [notice, setNotice] = useState('');
  const [sending, setSending] = useState(false);
  const inFlight = useRef(false);
  const email = config.forms.contact.overrideEmail;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    if (fields.get('botcheck')) return;
    inFlight.current = true;
    setSending(true);
    setNotice('Submitting your message…');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: config.forms.contact.accessKey,
          name: fields.get('name'),
          email: fields.get('email'),
          message: fields.get('message'),
          subject: 'TPK Miami website inquiry',
          from_name: 'TPK Miami website',
          botcheck: false,
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Submission not accepted');
      setNotice('Submission accepted by our email service. Thank you for contacting TPK Miami.');
      form.reset();
    } catch {
      setNotice('We could not confirm your submission. Your message is still here. Please try again later or email us directly. If you retry, a duplicate message is possible.');
    } finally {
      window.clearTimeout(timeout);
      inFlight.current = false;
      setSending(false);
    }
  }

  const inputClass = 'w-full border-2 border-black bg-white px-3 py-2 text-base font-sans';
  return <form onSubmit={submit} className="space-y-4" aria-busy={sending}>
    <fieldset disabled={sending} className="space-y-4">
      <div><label htmlFor="contact-name" className="block mb-1">Name</label><input id="contact-name" name="name" autoComplete="name" maxLength={120} className={inputClass} /></div>
      <div><label htmlFor="contact-email" className="block mb-1">Email *</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} /></div>
      <div><label htmlFor="contact-message" className="block mb-1">Message *</label><textarea id="contact-message" name="message" required maxLength={5000} rows={5} className={inputClass} /></div>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <p className="text-sm">Send your message here—no email app needed. Your contact details and message are processed by <a className="underline" href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">Web3Forms</a> to email our team. You can also email <a className="underline break-all" href={`mailto:${email}`}>{email}</a> directly.</p>
      <button type="submit" className="font-bangers text-2xl px-6 py-2 border-4 border-black bg-yellow-400 shadow-[4px_4px_0_#000] disabled:opacity-60">{sending ? 'Sending…' : 'Send message'}</button>
    </fieldset>
    <p role="status" aria-live="polite" className="text-sm">{notice}</p>
  </form>;
}
