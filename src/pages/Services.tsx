import { useNavigate } from 'react-router-dom';
import { SERVICES, formatPrice, formatDuration } from '../data';
import Reveal from '../components/Reveal';

export default function Services() {
  const navigate = useNavigate();

  function book(serviceId: string) {
    navigate('/booking', { state: { selectedService: serviceId } });
  }

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto">
        <Reveal animation="fadeUp">
          <p className="text-copper text-xs tracking-widest uppercase mb-4">What We Offer</p>
          <h1 className="font-serif text-5xl md:text-6xl text-ivory mb-6">Services &amp; Pricing</h1>
          <p className="text-ivory/50 max-w-xl leading-relaxed">
            Every service includes a consultation, professional finish, and the time to do it properly.
            No rush, no compromise.
          </p>
        </Reveal>
      </section>

      {/* Services list */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="space-y-px">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} animation="fadeUp" delay={i * 60}>
              <article className="bg-charcoal-800 hover:bg-charcoal-700 transition-colors group">
                <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-start">
                  <div>
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-ivory/20 text-sm font-mono">0{i + 1}</span>
                      <h2 className="font-serif text-2xl md:text-3xl text-ivory">{service.name}</h2>
                    </div>
                    <p className="text-ivory/40 text-sm mb-4 ml-8">{service.description}</p>
                    <p className="text-ivory/60 text-sm leading-relaxed ml-8 max-w-2xl">{service.detail}</p>
                    <div className="ml-8 mt-5 flex items-center gap-6">
                      <span className="text-ivory/30 text-xs tracking-wide">{formatDuration(service.duration)}</span>
                      <span className="w-px h-4 bg-charcoal-600" aria-hidden="true" />
                      <span className="text-ivory/30 text-xs tracking-wide">Includes consultation &amp; finish</span>
                    </div>
                  </div>
                  <div className="md:text-right flex md:flex-col items-center md:items-end gap-6 ml-8 md:ml-0">
                    <p className="text-copper text-3xl font-light font-serif">{formatPrice(service.price)}</p>
                    <button
                      onClick={() => book(service.id)}
                      className="btn-copper px-6 py-3 bg-copper text-charcoal font-semibold text-xs tracking-widest uppercase hover:bg-copper-400 transition-colors whitespace-nowrap"
                    >
                      Book This Service
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Note */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <Reveal animation="fadeUp">
          <div className="border border-charcoal-700 p-8">
            <h3 className="text-ivory font-semibold mb-3">Good to know</h3>
            <ul className="space-y-2 text-ivory/50 text-sm">
              <li>— Prices are in South African Rand (ZAR) and include all products used.</li>
              <li>— A 50% deposit may be required for first-time online bookings.</li>
              <li>— Please arrive 5 minutes before your appointment.</li>
              <li>— Cancellations within 2 hours of your appointment incur a 50% fee. See our <a href="/terms" className="text-copper hover:underline">Terms &amp; Conditions</a>.</li>
            </ul>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-800 py-20 px-6 text-center">
        <Reveal animation="fadeUp">
          <h2 className="font-serif text-4xl text-ivory mb-4">Not sure which to choose?</h2>
          <p className="text-ivory/50 mb-8">Call us and we'll help you pick the right service for your hair and budget.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+27214245678"
              className="px-8 py-4 border border-ivory/30 text-ivory text-sm tracking-widest uppercase hover:border-ivory/60 transition-colors"
            >
              +27 21 424 5678
            </a>
            <button
              onClick={() => book(SERVICES[0].id)}
              className="btn-copper px-8 py-4 bg-copper text-charcoal font-semibold tracking-widest uppercase text-sm hover:bg-copper-400 transition-colors"
            >
              Book Now
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
