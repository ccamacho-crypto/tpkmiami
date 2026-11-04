import { useEffect, useRef, useMemo } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Helmet } from '@dr.pogodin/react-helmet';
import home from '../content/pages/home.json';
import { asset } from '../lib/assets';
import ContactForm from '@/components/ContactForm';

const socialSlides = [
{ src: '/airo-assets/images/pages/home/social-slide-1', alt: 'TPK Miami event photo' },
{ src: '/airo-assets/images/pages/home/social-slide-2', alt: 'TPK Miami event photo' },
{ src: '/airo-assets/images/pages/home/social-slide-3', alt: 'TPK Miami event photo' },
{ src: '/airo-assets/images/pages/home/social-slide-4', alt: 'TPK Miami event photo' },
{ src: '/airo-assets/images/pages/home/social-slide-5', alt: 'TPK Miami event photo' },
{ src: '/airo-assets/images/pages/home/social-slide-6', alt: 'TPK Miami event photo' },
{ src: '/airo-assets/images/pages/home/social-slide-7', alt: 'TPK Miami event photo' },
{ src: '/airo-assets/images/pages/home/social-slide-8', alt: 'TPK Miami event photo' },
{ src: '/airo-assets/images/pages/home/social-slide-9', alt: 'TPK Miami event photo' }];

const flyerSlides = [
{ src: '/airo-assets/images/pages/home/flyer-1', alt: 'TPK Miami event flyer' },
{ src: '/airo-assets/images/pages/home/flyer-2', alt: 'TPK Miami event flyer' },
{ src: '/airo-assets/images/pages/home/flyer-3', alt: 'TPK Miami event flyer' },
{ src: '/airo-assets/images/pages/home/flyer-4', alt: 'TPK Miami event flyer' },
{ src: '/airo-assets/images/pages/home/flyer-5', alt: 'TPK Miami event flyer' },
{ src: '/airo-assets/images/pages/home/flyer-6', alt: 'TPK Miami event flyer' },
{ src: '/airo-assets/images/pages/home/flyer-7', alt: 'TPK Miami event flyer' },
{ src: '/airo-assets/images/pages/home/flyer-8', alt: 'TPK Miami event flyer' },
{ src: '/airo-assets/images/pages/home/flyer-9', alt: 'TPK Miami event flyer' },
{ src: '/airo-assets/images/pages/home/flyer-10', alt: 'TPK Miami event flyer' }];


function FlyerCarousel() {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  return (
    <Carousel opts={{ loop: true }} plugins={[autoplay.current]}>
      <CarouselContent>
        {flyerSlides.map((slide, i) =>
        <CarouselItem key={i}>
            <img
            src={asset(slide.src)}
            alt={slide.alt}
            className="w-full h-auto block"
            style={{ display: 'block' }}
            loading={i === 0 ? 'eager' : 'lazy'} />
          
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious
        className="left-2"
        style={{
          background: 'hsl(var(--accent))',
          border: '2px solid hsl(var(--primary))',
          color: 'hsl(var(--primary))'
        }} />
      
      <CarouselNext
        className="right-2"
        style={{
          background: 'hsl(var(--accent))',
          border: '2px solid hsl(var(--primary))',
          color: 'hsl(var(--primary))'
        }} />
      
    </Carousel>);

}


// Halftone dot background helper
const dots = (opacity = 0.1, size = 8) => ({
  backgroundImage: `radial-gradient(circle, rgba(26,18,8,${opacity}) 1.5px, transparent 1.5px)`,
  backgroundSize: `${size}px ${size}px`
});

export default function HomePage() {
  const parallaxRef = useRef<HTMLImageElement>(null);
  const photosParallaxRef = useRef<HTMLDivElement>(null);

  const autoplayRef = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));
  const shuffledSlides = useMemo(() => [...socialSlides].sort(() => Math.random() - 0.5), []);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const heroRate = isMobile ? 0.1 : 0.4;
      const photosRate = isMobile ? 0.05 : 0.15;

      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * heroRate}px)`;
      }
      if (photosParallaxRef.current) {
        const scrollY = window.scrollY;
        photosParallaxRef.current.style.transform = `translateY(${scrollY * photosRate}px)`;
      }

    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Total Party Kill! Miami — Tabletop RPG &amp; Board Gaming Community</title>
        <meta
          name="description"
          content="Discover new games, connect with other gamers, and level up your skills with Total Party Kill! Miami — your local tabletop RPG and board gaming community hub." />
        
        <link rel="canonical" href="https://tpkmiami.com" />
        <meta property="og:title" content="Total Party Kill! Miami" />
        <meta property="og:description" content="Miami's tabletop RPG and board gaming community hub." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tpkmiami.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main id="main-content">

        {/* ══════════════════════════════════════════
                         HERO
                      ══════════════════════════════════════════ */}
        <section
          className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
          style={{ background: 'hsl(var(--primary))' }}>
          
          <img
            ref={parallaxRef}
            src={asset('/airo-assets/images/uploads/background-95crtr613m-1791148729638-file-7la9vhbxcl')}
            alt=""
            aria-hidden="true"
            className="absolute w-full h-full object-cover object-center opacity-60 pointer-events-none"
            style={{ top: 0, left: 0, willChange: 'transform' }}
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={1080} />
          
          {/* halftone */}
          <div className="absolute inset-0 pointer-events-none" style={dots(0.22, 8)} aria-hidden="true" />

          {/* Dice. Beer. Adventure! tagline — lower right */}
          <img
            src={asset('/airo-assets/images/pages/home/hero-tagline')}
            alt="Dice. Beer. Adventure!"
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 pointer-events-none w-[45vw] sm:w-[45vw] md:w-[45vw]"
            style={{ opacity: 0.92 }} />
          

          <div className="relative z-10 w-full max-w-2xl mx-4 sm:mx-auto">

            {/* Title above the box */}
            <h1
              className="font-bangers text-5xl sm:text-6xl md:text-7xl leading-none mb-3 text-center"
              style={{
                color: 'hsl(var(--accent))',
                textShadow: '3px 3px 0 hsl(var(--primary)), 5px 5px 0 rgba(26,18,8,0.5)',
                WebkitTextStroke: '1px hsl(var(--primary))'
              }}>
              <span className="sr-only">{home.hero.headline}</span>
            </h1>

            <div
              className="relative px-8 pt-8 pb-10"
              style={{
                background: '#ffffff',
                border: '4px solid hsl(var(--primary))',
                transform: 'rotate(-1.5deg)',
                boxShadow: '8px 8px 0 hsl(var(--primary))'
              }}>
              
              <span
                className="absolute top-2 left-3 font-oswald text-xs font-bold uppercase tracking-widest px-2 py-0.5 border-2"
                style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--primary))', borderColor: 'hsl(var(--primary))' }}>
                
                <span>{home.hero.panelLabel}</span>
              </span>

              <p
                className="font-special-elite text-lg sm:text-xl mb-3 italic"
                style={{ color: 'hsl(var(--secondary))' }}>
                
                <span>{home.hero.subhead}</span>
              </p>

              <p
                className="font-special-elite text-base leading-relaxed italic"
                style={{ color: 'hsl(var(--primary))' }}>
                
                <span className="whitespace-pre-line">{home.hero.body}</span>
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
                         SCHEDULE
                      ══════════════════════════════════════════ */}
        <section
          id="schedule"
          className="relative py-xxl"
          style={{ background: 'transparent' }}>
          
          <div className="absolute inset-0 pointer-events-none" style={dots(0.07, 10)} aria-hidden="true" />

          <div className="relative max-w-6xl mx-auto px-4">
            {/* heading */}
            <div className="mb-10">
              <div
                className="inline-block px-5 py-2 border-4 mb-1"
                style={{ background: 'hsl(var(--accent))', borderColor: 'hsl(var(--primary))', boxShadow: '4px 4px 0 hsl(var(--primary))' }}>
                <h2 className="font-bangers text-4xl sm:text-5xl leading-none" style={{ color: 'hsl(var(--primary))' }}>
                  <span>{home.schedule.heading}</span>
                </h2>
              </div>
              <p className="font-oswald font-bold uppercase tracking-wider text-sm mt-2" style={{ color: 'hsl(var(--secondary))' }}>
                <span>{home.schedule.subheading}</span>
              </p>
            </div>

            {/* two-column: flyer slider + calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

              {/* LEFT — flyer slider */}
              <div
                style={{
                  border: '4px solid hsl(var(--primary))',
                  boxShadow: '6px 6px 0 hsl(var(--primary))',
                  background: 'hsl(var(--primary))',
                  overflow: 'hidden'
                }}>
                <FlyerCarousel />
              </div>

              {/* RIGHT — event rows */}
              <div className="flex flex-col gap-0 border-4" style={{ borderColor: 'hsl(var(--primary))', boxShadow: '6px 6px 0 hsl(var(--primary))' }}>
                {home.schedule.events.map((evt, i) => {
                  const isTicketed = evt.spots === 'Ticketed';
                  return <div
                  key={evt.id}
                  className="flex flex-col sm:flex-row items-stretch border-b-4 last:border-b-0 min-h-[88px]"
                  style={{ borderColor: 'hsl(var(--primary))', background: isTicketed ? 'hsl(var(--secondary))' : i % 2 === 0 ? 'hsl(var(--card))' : 'hsl(var(--background))' }}>
                  
                    {/* day badge */}
                    <div
                    className="flex flex-col items-center justify-center px-0 py-4 border-b-4 sm:border-b-0 sm:border-r-4 w-full sm:w-[110px] shrink-0"
                    style={{ background: 'hsl(var(--primary))', borderColor: isTicketed ? 'hsl(var(--accent))' : 'hsl(var(--secondary))' }}>
                      <span className="font-bangers text-base leading-tight text-center w-full block" style={{ color: 'hsl(var(--accent))' }}>
                        <span>{evt.day}</span>
                      </span>
                    </div>

                    {/* event info */}
                    <div className="flex-1 px-5 py-4 flex flex-col gap-1">
                      <p className="font-bangers text-2xl sm:text-3xl leading-tight" style={{ color: isTicketed ? 'hsl(var(--accent))' : 'hsl(var(--primary))' }}>
                        <span>{evt.title}</span>
                      </p>
                      <p className="font-special-elite text-sm" style={{ color: isTicketed ? '#ffffff' : 'hsl(var(--foreground))' }}>
                        <span>{evt.time}</span>
                      </p>
                      <p className="font-special-elite text-sm" style={{ color: isTicketed ? '#ffffff' : 'hsl(var(--foreground))' }}>
                        {evt.location}
                      </p>
                      {isTicketed && <span className="font-oswald font-bold text-xs uppercase tracking-widest mt-1" style={{ color: 'hsl(var(--accent))' }}>🎟 Ticketed Event</span>}
                    </div>
                  </div>;
                })}
              </div>

            </div>
          </div>
        </section>


        {/* Featured event section removed */}

        {/* ══════════════════════════════════════════
                         TPKTV — YOUTUBE
                      ══════════════════════════════════════════ */}
        <section
          id="photos"
          className="relative py-xxl overflow-hidden"
          style={{ background: 'hsl(var(--primary))' }}>
          {/* Beholder parallax background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div ref={photosParallaxRef} className="absolute will-change-transform" style={{ top: '-20%', bottom: '-20%', left: 0, right: 0, backgroundImage: `url(${asset('/airo-assets/images/uploads/background-95crtr613m-1791154901397-file-wftwdc9gzm')})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', opacity: 0.28 }} />
          </div>
          {/* Dark overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'hsl(var(--primary) / 0.5)' }} aria-hidden="true" />
          {/* Halftone */}
          <div className="absolute inset-0 pointer-events-none" style={dots(0.1, 8)} aria-hidden="true" />

          <div className="relative max-w-5xl mx-auto px-4">
            {/* heading */}
            <div className="mb-10 text-center">
              <div className="inline-block px-5 py-2 border-4 mb-1" style={{ background: 'hsl(var(--primary))', borderColor: 'hsl(var(--secondary))', boxShadow: '4px 4px 0 hsl(var(--secondary))' }}>
                
                <h2 className="font-bangers text-4xl sm:text-5xl leading-none" style={{ color: 'hsl(var(--background))' }}>
                  <span>{home.gallery.heading}</span>
                </h2>
              </div>
              <p className="font-oswald font-bold uppercase tracking-wider text-sm mt-2" style={{ color: '#ffffff' }}>
                <span>{home.gallery.subheading}</span>
              </p>
            </div>
          </div>

          {/* ── Full-bleed Carousel ── */}
          <div className="relative w-full">
            <Carousel opts={{ loop: true }} plugins={[autoplayRef.current]} className="w-full">
              <CarouselContent className="-ml-0">
                {shuffledSlides.map((img, i) => <CarouselItem key={i} className="pl-0 basis-full">
                    <div className="relative overflow-hidden">
                      <img src={asset(img.src)} alt={img.alt} className="w-full h-auto block" loading="lazy"
                    width={1200}
                    height={800} />
                    
                      <div className="absolute inset-0 pointer-events-none" style={dots(0.06, 5)} aria-hidden="true" />
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious
                className="left-4 z-10 border-4"
                style={{ background: 'hsl(var(--primary))', borderColor: 'hsl(var(--accent))', color: 'hsl(var(--accent))' }} />
              
              <CarouselNext
                className="right-4 z-10 border-4"
                style={{ background: 'hsl(var(--primary))', borderColor: 'hsl(var(--accent))', color: 'hsl(var(--accent))' }} />
              
            </Carousel>
          </div>

          {/* ── Instagram Widget ── */}
          <div className="relative max-w-3xl mx-auto px-4 sm:px-8 mt-10">
            <div
              className="border-4"
              style={{ borderColor: 'hsl(var(--primary))', background: 'hsl(var(--primary))', boxShadow: '6px 6px 0 hsl(var(--secondary))' }}>
              
              {/* Profile header */}
              <div className="flex items-center gap-4 px-5 py-4 border-b-4" style={{ borderColor: 'hsl(var(--secondary))' }}>
                <div
                  className="shrink-0 w-16 h-16 rounded-full border-4 overflow-hidden flex items-center justify-center"
                  style={{ borderColor: 'hsl(var(--accent))', background: 'hsl(var(--background))' }}>
                  
                  <img src={asset('/airo-assets/images/pages/home/instagram-avatar')} alt="TPK Miami" className="w-full h-full object-cover" width={64} height={64} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-oswald font-bold text-lg uppercase" style={{ color: 'hsl(var(--accent))' }}>@tpk.miami</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="hsl(var(--accent))" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  </div>
                  <p className="font-oswald text-sm mt-0.5" style={{ color: 'hsl(var(--background) / 0.75)' }}>
                    Total Party Kill! Miami — TTRPG events &amp; adventures in the 305
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/tpk.miami/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 hidden sm:flex items-center gap-2 font-oswald font-bold uppercase text-sm px-4 py-2 border-4 transition-all duration-150 hover:opacity-80"
                  style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--primary))', borderColor: 'hsl(var(--accent))', boxShadow: '3px 3px 0 hsl(var(--secondary))' }}>
                  
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="hsl(var(--accent))" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  Follow
                </a>
              </div>
              {/* Footer */}
              <div className="flex items-center justify-between px-5 py-3 border-t-4" style={{ borderColor: 'hsl(var(--secondary))' }}>
                <span className="font-oswald text-xs uppercase tracking-widest" style={{ color: 'hsl(var(--background) / 0.5)' }}>
                  From the table — live photos
                </span>
                <a
                  href="https://www.instagram.com/tpk.miami/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-oswald text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-70"
                  style={{ color: 'hsl(var(--accent))' }}>
                  
                  Follow @tpk.miami →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
                         PHOTO GALLERY
                      ══════════════════════════════════════════ */}
        <section id="tpktv" className="relative py-xxl" style={{ background: '#ffffff' }}>
          
          <div className="max-w-content mx-auto px-4">
            {/* Section heading */}
            <div className="text-center mb-lg">
              <img
                src={asset('/airo-assets/images/pages/home/tpktv-logo')}
                alt="TPK.TV"
                className="mx-auto mb-4"
                style={{
                  height: 'auto',
                  maxHeight: 'clamp(100px, 18vw, 200px)',
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(4px 4px 0px #000)'
                }} />
              
              <p
                className="font-special-elite text-lg"
                style={{ color: '#000000' }}>
                
                Watch our actual-play sessions, interviews &amp; more on YouTube
              </p>
            </div>

            {/* Comic-panel video grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-base">

              {/* Featured — latest uploads playlist */}
              <div
                className="md:col-span-2"
                style={{
                  border: '3px solid #000',
                  boxShadow: '6px 6px 0 #000',
                  background: '#000'
                }}>
                
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/77gavYbyIm8?si=E1TdkrSbJFxJENWs"
                    title="TotalPartyKill! Television — Latest Actual Play"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy" />
                  
                </div>
                <div
                  className="px-4 py-3"
                  style={{ background: 'hsl(var(--primary))', borderTop: '3px solid #000' }}>
                  
                  <p
                    className="font-bangers text-xl tracking-wide"
                    style={{ color: 'hsl(var(--accent))' }}>
                    
                    ▶ LATEST FROM TPKTV
                  </p>
                  <p
                    className="font-special-elite text-sm"
                    style={{ color: '#ffffff' }}>
                    
                    Actual play, interviews &amp; more
                  </p>
                </div>
              </div>

              {/* TPK.TALKS playlist */}
              <div
                style={{
                  border: '3px solid #000',
                  boxShadow: '5px 5px 0 #000',
                  background: '#000'
                }}>
                
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/SRHMxLrJfLg?si=Nuuo9pa6kFWfttA8"
                    title="TPK.TALKS"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy" />
                  
                </div>
                <div
                  className="px-4 py-3"
                  style={{ background: 'hsl(var(--primary))', borderTop: '3px solid #000' }}>
                  
                  <p
                    className="font-bangers text-lg tracking-wide"
                    style={{ color: 'hsl(var(--accent))' }}>
                    
                    TPK.TALKS
                  </p>
                  <p
                    className="font-special-elite text-sm"
                    style={{ color: '#ffffff' }}>
                    
                    Interviews &amp; community spotlights
                  </p>
                </div>
              </div>

              {/* Actual Play series */}
              <div
                style={{
                  border: '3px solid #000',
                  boxShadow: '5px 5px 0 #000',
                  background: '#000'
                }}>
                
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/gCS31sEg4EA?si=xYMiu9ji1xUbR2zw"
                    title="TPK Unboxing"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy" />
                  
                </div>
                <div
                  className="px-4 py-3"
                  style={{ background: 'hsl(var(--primary))', borderTop: '3px solid #000' }}>
                  
                  <p
                    className="font-bangers text-lg tracking-wide"
                    style={{ color: 'hsl(var(--accent))' }}>
                    
                    TPK UNBOXING
                  </p>
                  <p
                    className="font-special-elite text-sm"
                    style={{ color: '#ffffff' }}>
                    
                    Unboxing the latest tabletop releases
                  </p>
                </div>
              </div>
            </div>

            {/* Subscribe CTA */}
            <div className="text-center mt-xl">
              <a
                href="https://www.youtube.com/@tpktv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-bangers text-2xl tracking-wide px-8 py-4 transition-transform hover:scale-105"
                style={{
                  background: '#c41e1e',
                  color: '#fff',
                  border: '3px solid #000',
                  boxShadow: '5px 5px 0 #000',
                  textDecoration: 'none'
                }}>
                
                <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor" aria-hidden="true">
                  <path d="M27.4 3.1a3.5 3.5 0 0 0-2.5-2.5C22.8 0 14 0 14 0S5.2 0 3.1.6A3.5 3.5 0 0 0 .6 3.1C0 5.2 0 10 0 10s0 4.8.6 6.9a3.5 3.5 0 0 0 2.5 2.5C5.2 20 14 20 14 20s8.8 0 10.9-.6a3.5 3.5 0 0 0 2.5-2.5C28 14.8 28 10 28 10s0-4.8-.6-6.9zM11.2 14.3V5.7L18.5 10l-7.3 4.3z" />
                </svg>
                SUBSCRIBE ON YOUTUBE
              </a>
            </div>
          </div>
        </section>

                {/* ══════════════════════════════════════════
          CONTACT
          ══════════════════════════════════════════ */}
        <section
          id="contact"
          className="relative py-xxl"
          style={{ background: 'transparent' }}>
          
          <div className="absolute inset-0 pointer-events-none" style={dots(0.09, 8)} aria-hidden="true" />

          <div className="relative max-w-2xl mx-auto px-4">
            <div className="text-center mb-8">
              <div
                className="inline-block px-5 py-2 border-4 mb-1"
                style={{ background: 'hsl(var(--secondary))', borderColor: 'hsl(var(--primary))', boxShadow: '4px 4px 0 hsl(var(--primary))' }}>
                
                <h2 className="font-bangers text-4xl sm:text-5xl leading-none" style={{ color: 'hsl(var(--background))' }}>
                  <span>{home.contact.heading}</span>
                </h2>
              </div>
              <p className="font-oswald font-bold uppercase tracking-wider text-sm mt-2" style={{ color: 'hsl(var(--secondary))' }}>
                <span>{home.contact.subheading}</span>
              </p>
              <p className="font-special-elite text-base mt-1" style={{ color: 'hsl(var(--primary))' }}>
                <span>{home.contact.body}</span>
              </p>
            </div>

            <div
              className="p-8 border-4"
              style={{ background: 'hsl(var(--background))', borderColor: 'hsl(var(--primary))', boxShadow: '8px 8px 0 hsl(var(--primary))' }}>
              
              <ContactForm />
            </div>
          </div>
        </section>

      </main>
    </>);

}