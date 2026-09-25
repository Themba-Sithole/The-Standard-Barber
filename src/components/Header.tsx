import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoSrc from '../assets/logo.png';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/booking', label: 'Book Now' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal/95 backdrop-blur-sm border-b border-charcoal-700' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="The Standard Barber Co. — Home">
          <img
            src={logoSrc}
            alt="The Standard Barber Co."
            className="h-8 sm:h-10 w-auto"
            style={{ mixBlendMode: 'screen' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV.map((item) =>
            item.label === 'Book Now' ? (
              <button
                key={item.to}
                onClick={() => navigate('/booking')}
                className="px-5 py-2.5 bg-copper text-charcoal font-semibold text-sm tracking-wide uppercase hover:bg-copper-400 transition-colors"
              >
                Book Now
              </button>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-sm tracking-widest uppercase transition-colors ${
                    isActive ? 'text-copper' : 'text-ivory/70 hover:text-ivory'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`block w-6 h-px bg-ivory transition-transform duration-200 ${open ? 'rotate-45 translate-y-[9px]' : ''}`} />
          <span className={`block w-6 h-px bg-ivory transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-ivory transition-transform duration-200 ${open ? '-rotate-45 -translate-y-[9px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-charcoal/95 backdrop-blur-sm">
          <div className="mx-auto flex h-full w-full max-w-md flex-col px-6 pt-24 pb-10">
            <nav className="flex flex-col gap-6 pt-4" aria-label="Mobile navigation">
              {NAV.map((item) =>
                item.label === 'Book Now' ? (
                  <button
                    key={item.to}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      navigate('/booking');
                    }}
                    className="mt-2 w-full rounded-none border border-copper/60 bg-copper px-6 py-4 text-left text-sm font-semibold tracking-[0.2em] uppercase text-charcoal hover:bg-copper-400 transition-colors"
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `text-3xl font-serif leading-tight tracking-wide transition-colors ${
                        isActive ? 'text-copper' : 'text-ivory hover:text-copper'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>

            <div className="mt-auto border-t border-charcoal-700 pt-6 text-sm text-ivory/60">
              14 Kloof Street, Gardens, Cape Town
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
