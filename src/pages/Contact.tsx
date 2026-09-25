import { CONTACT, HOURS } from '../data';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto">
        <p className="text-copper text-xs tracking-widest uppercase mb-4">Find Us</p>
        <h1 className="font-serif text-5xl md:text-6xl text-ivory mb-6">Contact & Directions</h1>
        <p className="text-ivory/50 max-w-xl leading-relaxed">
          We're easy to find on Kloof Street in the heart of the City Bowl. Street parking is available on Kloof and surrounding streets.
        </p>
      </section>

      {/* Contact info grid */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal-700 mb-12">
          {[
            {
              label: 'Address',
              content: (
                <address className="not-italic text-ivory/70 text-sm leading-relaxed">
                  14 Kloof Street<br />
                  Gardens<br />
                  Cape Town, 8001<br />
                  South Africa
                </address>
              ),
            },
            {
              label: 'Phone & Email',
              content: (
                <div className="space-y-3">
                  <a href={`tel:${CONTACT.phone}`} className="block text-ivory/70 text-sm hover:text-copper transition-colors">
                    {CONTACT.phone}
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="block text-ivory/70 text-sm hover:text-copper transition-colors break-all">
                    {CONTACT.email}
                  </a>
                </div>
              ),
            },
            {
              label: 'Hours',
              content: (
                <dl className="space-y-2">
                  {HOURS.map((h) => (
                    <div key={h.day} className="flex flex-col">
                      <dt className="text-ivory/40 text-xs">{h.day}</dt>
                      <dd className={`text-sm ${h.open ? 'text-ivory/70' : 'text-ivory/25'}`}>{h.hours}</dd>
                    </div>
                  ))}
                </dl>
              ),
            },
          ].map((card) => (
            <div key={card.label} className="bg-charcoal-800 p-8">
              <p className="text-copper text-xs tracking-widest uppercase mb-5">{card.label}</p>
              {card.content}
            </div>
          ))}
        </div>

        {/* Embedded map */}
        <div className="w-full border border-charcoal-600 overflow-hidden" style={{ height: '420px' }}>
          <iframe
            title="The Standard Barber Co. location"
            src="https://maps.google.com/maps?q=14+Kloof+Street,+Gardens,+Cape+Town,+8001&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block', filter: 'grayscale(30%) contrast(1.05)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex items-center justify-center gap-3 pt-4 pb-2">
          <svg width="16" height="16" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ivory/40" aria-hidden="true">
            <path d="M18 3C12.48 3 8 7.48 8 13c0 7.5 10 20 10 20s10-12.5 10-20c0-5.52-4.48-10-10-10z"/>
            <circle cx="18" cy="13" r="3"/>
          </svg>
          <p className="text-ivory/50 text-sm">14 Kloof Street, Gardens, Cape Town</p>
          <a
            href="https://maps.google.com/?q=14+Kloof+Street+Gardens+Cape+Town"
            target="_blank"
            rel="noopener noreferrer"
            className="text-copper text-xs tracking-widest uppercase hover:underline ml-2"
          >
            Open in Google Maps →
          </a>
        </div>
      </section>

      {/* Book CTA */}
      <section className="bg-charcoal-800 py-20 px-6 text-center">
        <h2 className="font-serif text-4xl text-ivory mb-4">Ready to book?</h2>
        <p className="text-ivory/50 mb-8">Choose your service and barber online — takes two minutes.</p>
        <button
          onClick={() => navigate('/booking')}
          className="px-8 py-4 bg-copper text-charcoal font-semibold tracking-widest uppercase text-sm hover:bg-copper-400 transition-colors"
        >
          Book an Appointment
        </button>
      </section>
    </div>
  );
}
