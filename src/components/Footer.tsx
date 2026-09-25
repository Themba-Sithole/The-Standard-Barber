import { Link } from 'react-router-dom';
import logoSrc from '../assets/logo.png';
import { CONTACT, HOURS } from '../data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-800 border-t border-charcoal-700 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img
              src={logoSrc}
              alt="The Standard Barber Co."
              className="h-12 w-auto mb-4"
              style={{ mixBlendMode: 'screen' }}
            />
            <p className="text-ivory/50 text-sm leading-relaxed">
              Premium barbering in the heart of Cape Town's City Bowl.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-copper text-xs tracking-widest uppercase mb-5">Hours</h3>
            <dl className="space-y-2">
              {HOURS.map((h) => (
                <div key={h.day} className="flex flex-col">
                  <dt className="text-ivory/50 text-xs uppercase tracking-wide">{h.day}</dt>
                  <dd className={`text-sm ${h.open ? 'text-ivory' : 'text-ivory/30'}`}>{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-copper text-xs tracking-widest uppercase mb-5">Contact</h3>
            <address className="not-italic space-y-3">
              <p className="text-ivory/70 text-sm leading-relaxed">{CONTACT.address}</p>
              <a href={`tel:${CONTACT.phone}`} className="block text-ivory/70 text-sm hover:text-copper transition-colors">
                {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="block text-ivory/70 text-sm hover:text-copper transition-colors break-all">
                {CONTACT.email}
              </a>
            </address>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-copper text-xs tracking-widest uppercase mb-5">Navigation</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/services', label: 'Services' },
                  { to: '/about', label: 'About' },
                  { to: '/booking', label: 'Book Appointment' },
                  { to: '/terms', label: 'Terms & Conditions' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-ivory/60 text-sm hover:text-copper transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-t border-charcoal-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-ivory/30 text-xs">
          <p>© {year} The Standard Barber Co. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-copper transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
