import { useState, type FormEvent } from 'react';
import config from '../lib/contact-form.config.json';

export default function ContactForm() {
  const [notice, setNotice] = useState('');
  const email = config.forms.contact.overrideEmail;
  function compose(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const body = `Name: ${fields.get('name')}\nEmail: ${fields.get('email')}\n\n${fields.get('message')}`.replace(/\r\n|\r|\n/g, '\r\n');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent('TPK Miami inquiry')}&body=${encodeURIComponent(body)}`;
    setNotice('Your email app has been requested. Review and send the draft there; nothing has been sent by this website.');
  }
  const inputClass = 'w-full border-2 border-black bg-white px-3 py-2 text-base font-sans';
  return <form onSubmit={compose} className="space-y-4">
    <div><label htmlFor="contact-name" className="block mb-1">Name</label><input id="contact-name" name="name" autoComplete="name" maxLength={120} className={inputClass} /></div>
    <div><label htmlFor="contact-email" className="block mb-1">Email *</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} /></div>
    <div><label htmlFor="contact-message" className="block mb-1">Message *</label><textarea id="contact-message" name="message" required maxLength={5000} rows={5} className={inputClass} /></div>
    <p className="text-sm">This opens your email app. Review and send the draft there, or email <a className="underline break-all" href={`mailto:${email}`}>{email}</a> directly.</p>
    <button type="submit" className="font-bangers text-2xl px-6 py-2 border-4 border-black bg-yellow-400 shadow-[4px_4px_0_#000]">Open email draft</button>
    <p role="status" aria-live="polite" className="text-sm">{notice}</p>
  </form>;
}
