import { useState } from 'react';
import { asset } from '../../lib/assets';
import { Menu, X } from 'lucide-react';

const navLinks = [
{ label: 'Schedule', href: '#schedule' },
{ label: 'Shop', href: '#shop' },
{ label: 'Photos', href: '#photos' },
{ label: 'TPKTV', href: '#tpktv' },
{ label: 'Contact', href: '#contact' }];


const instagramSvg =
<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>;


export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div
        className="text-center py-1.5 px-4 font-oswald text-sm font-bold tracking-widest border-b-4"
        style={{
          background: 'hsl(var(--accent))',
          color: 'hsl(var(--primary))',
          borderColor: 'hsl(var(--primary))'
        }}>✦ MIAMI'S PREMIERE D&D POP-UP EXPERIENCE ✦


      </div>

      {/* Main header bar */}
      <div
        className="border-b-4"
        style={{
          background: '#ffffff',
          borderColor: 'hsl(var(--secondary))'
        }}>
        
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <a href={import.meta.env.BASE_URL} className="shrink-0">
            <img
              src={asset('/airo-assets/images/logo/horizontal')}
              alt="Total Party Kill! Miami"
              className="block h-auto max-h-12 w-auto max-w-[260px] object-contain"
              loading="eager" />
            
          </a>

          {/* Desktop nav — floats in a yellow comic word-balloon box */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center">
            <div
              className="flex items-center gap-1 px-4 py-2 border-4"
              style={{
                background: 'hsl(var(--accent))',
                borderColor: 'hsl(var(--primary))',
                borderRadius: '0px',
                boxShadow: '5px 5px 0 hsl(var(--primary))'
              }}>
              

              {navLinks.map((link) =>
              <a
                key={link.href}
                href={link.href}
                className="font-oswald text-sm font-bold uppercase px-3 py-1 transition-all duration-150 rounded hover:bg-black/10"
                style={{ color: 'hsl(var(--primary))' }}>
                
                  {link.label}
                </a>
              )}

              <span
                className="w-px h-5 mx-1"
                style={{ background: 'hsl(var(--primary) / 0.3)' }}
                aria-hidden="true" />
              

              <a
                href="https://www.instagram.com/tpk.miami/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow @tpk.miami on Instagram"
                className="flex items-center gap-1.5 font-oswald text-sm font-bold uppercase px-3 py-1 border-2 transition-all duration-150 hover:opacity-80"
                style={{
                  color: 'hsl(var(--background))',
                  background: 'hsl(var(--primary))',
                  borderColor: 'hsl(var(--primary))',
                  borderRadius: '6px'
                }}>
                
                {instagramSvg}
                @tpk.miami
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            style={{ color: 'hsl(var(--primary))' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
            
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav — yellow word-balloon panel */}
        {mobileOpen &&
        <div
          className="lg:hidden border-t-4 px-4 py-4"
          style={{
            borderColor: 'hsl(var(--secondary))',
            background: 'hsl(var(--primary))'
          }}>
          
            <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-1 border-4 p-3"
            style={{
              background: 'hsl(var(--accent))',
              borderColor: 'hsl(var(--primary))',
              borderRadius: '10px',
              boxShadow: '4px 4px 0 hsl(var(--secondary))'
            }}>
            
              {navLinks.map((link) =>
            <a
              key={link.href}
              href={link.href}
              className="font-oswald text-base font-bold uppercase py-2 px-3 rounded transition-all hover:bg-black/10"
              style={{ color: 'hsl(var(--primary))' }}
              onClick={() => setMobileOpen(false)}>
              
                  {link.label}
                </a>
            )}
              <div
              className="my-1 h-px"
              style={{ background: 'hsl(var(--primary) / 0.3)' }}
              aria-hidden="true" />
            
              <a
              href="https://www.instagram.com/tpk.miami/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow @tpk.miami on Instagram"
              className="flex items-center gap-2 font-oswald text-base font-bold uppercase py-2 px-3 border-2 transition-opacity hover:opacity-80"
              style={{
                color: 'hsl(var(--background))',
                background: 'hsl(var(--primary))',
                borderColor: 'hsl(var(--primary))',
                borderRadius: '6px'
              }}
              onClick={() => setMobileOpen(false)}>
              
                {instagramSvg}
                @tpk.miami
              </a>
            </nav>
          </div>
        }
      </div>
    </header>);

}
