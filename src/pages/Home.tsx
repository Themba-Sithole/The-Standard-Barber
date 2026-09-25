import { useNavigate } from 'react-router-dom';
import { SERVICES, BARBERS, HOURS, formatPrice, formatDuration } from '../data';
import Reveal from '../components/Reveal';

const HERO_PHOTO = 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&h=900&fit=crop&auto=format&q=80';
const INTERIOR_PHOTO = 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&h=600&fit=crop&auto=format&q=80';

const REASONS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M14 3l2.5 5.5L22 9.5l-4 3.9 1 5.6L14 16.5l-5 2.5 1-5.6-4-3.9 5.5-1z"/>
      </svg>
    ),
    title: 'Master Craftsmen',
    desc: 'Every barber on our team has trained extensively and continuously refines their technique. No mediocre cuts leave this shop.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="14" cy="14" r="10"/>
        <path d="M14 8v6l3.5 3.5"/>
      </svg>
    ),
    title: 'No Waiting',
    desc: 'We run a tight schedule. Book your slot and walk in on time — your barber will be ready. We respect your time as much as you do.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M7 14c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.76-1.6 5.16-3.94 6.35"/>
        <path d="M14 21c0 0-4-2.5-4-7"/>
        <circle cx="14" cy="14" r="2"/>
      </svg>
    ),
    title: 'Premium Products',
    desc: 'We use Reuzel, American Crew, and Depot exclusively. Your hair is finished with products that hold, nourish, and smell exceptional.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 21s3-4 10-4 10 4 10 4"/>
        <circle cx="14" cy="10" r="5"/>
      </svg>
    ),
    title: 'Regulars Welcome',
    desc: 'We remember your preferences. No re-explaining your fade every visit — your barber knows exactly how you like it.',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal-800">
        <img
          src={HERO_PHOTO}
          alt="Barber at work at The Standard Barber Co."
          className="absolute inset-0 w-full h-full object-cover opacity-30 hero-fade"
          style={{ animationDuration: '1.6s', animationDelay: '0s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />

        <div className="relative text-center px-6 max-w-3xl mx-auto pt-32 pb-24">
          <p
            className="text-copper text-xs tracking-[0.3em] uppercase mb-6 hero-line"
            style={{ animationDelay: '0.1s' }}
          >
            Established in Cape Town
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl text-ivory leading-none mb-6">
            <span
              className="block hero-line"
              style={{ animationDelay: '0.25s' }}
            >
              The Standard
            </span>
            <em
              className="block hero-line"
              style={{ animationDelay: '0.4s' }}
            >
              set higher.
            </em>
          </h1>
          <p
            className="text-ivory/60 text-lg leading-relaxed max-w-xl mx-auto mb-12 hero-line"
            style={{ animationDelay: '0.6s' }}
          >
            A premium barbershop at the heart of the City Bowl. Precise cuts, honest conversation, and a cold drink waiting for you.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center hero-line"
            style={{ animationDelay: '0.75s' }}
          >
            <button
              onClick={() => navigate('/booking')}
              className="btn-copper px-8 py-4 bg-copper text-charcoal font-semibold tracking-widest uppercase text-sm hover:bg-copper-400 transition-colors"
            >
              Book Now
            </button>
            <button
              onClick={() => navigate('/services')}
              className="px-8 py-4 border border-ivory/30 text-ivory text-sm tracking-widest uppercase hover:border-ivory/60 transition-colors"
            >
              View Services
            </button>
          </div>
        </div>

        {/* Animated scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/30 hero-fade" style={{ animationDelay: '1.2s' }}>
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-ivory/20 scroll-line" />
        </div>
      </section>

      {/* ── Featured Services ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <Reveal animation="fadeUp">
            <p className="text-copper text-xs tracking-widest uppercase mb-3">What We Do</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory">Our Services</h2>
          </Reveal>
          <Reveal animation="fadeIn" delay={200}>
            <button
              onClick={() => navigate('/services')}
              className="text-copper text-sm tracking-widest uppercase border-b border-copper/40 hover:border-copper pb-1 transition-colors"
            >
              View All Services →
            </button>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal-700">
          {SERVICES.slice(0, 3).map((service, i) => (
            <Reveal key={service.id} animation="fadeUp" delay={i * 100}>
              <div className="bg-charcoal-800 p-8 group hover:bg-charcoal-700 transition-colors h-full cursor-default">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-xl text-ivory">{service.name}</h3>
                  <span className="text-copper font-semibold">{formatPrice(service.price)}</span>
                </div>
                <p className="text-ivory/50 text-sm leading-relaxed mb-6">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-ivory/30 text-xs tracking-wide">{formatDuration(service.duration)}</span>
                  <button
                    onClick={() => navigate('/booking', { state: { selectedService: service.id } })}
                    className="text-copper text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Book →
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Reasons ── */}
      <section className="py-24 px-6 bg-charcoal-800">
        <div className="max-w-6xl mx-auto">
          <Reveal animation="fadeUp" className="text-center mb-16">
            <p className="text-copper text-xs tracking-widest uppercase mb-3">Why The Standard</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory">Different by design.</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} animation="fadeUp" delay={i * 80} className="text-center">
                <div
                  className="text-copper flex justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}
                >
                  {r.icon}
                </div>
                <h3 className="text-ivory font-semibold mb-3">{r.title}</h3>
                <p className="text-ivory/50 text-sm leading-relaxed">{r.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team intro ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <Reveal animation="fadeUp" className="text-center mb-16">
          <p className="text-copper text-xs tracking-widest uppercase mb-3">The Team</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory">Your barbers.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BARBERS.map((barber, i) => (
            <Reveal key={barber.id} animation="fadeUp" delay={i * 120}>
              <div className="group cursor-default">
                <div className="aspect-[3/4] overflow-hidden mb-5 bg-charcoal-700">
                  <img
                    src={barber.photo}
                    alt={barber.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-copper text-xs tracking-widest uppercase mb-1">{barber.role}</p>
                <h3 className="font-serif text-xl text-ivory mb-2">{barber.name}</h3>
                <p className="text-ivory/50 text-sm">{barber.experience} experience · {barber.speciality}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal animation="fadeIn" delay={200} className="text-center mt-12">
          <button
            onClick={() => navigate('/about')}
            className="text-copper text-sm tracking-widest uppercase border-b border-copper/40 hover:border-copper pb-1 transition-colors"
          >
            Meet the full team →
          </button>
        </Reveal>
      </section>

      {/* ── Hours + interior ── */}
      <section className="py-24 bg-charcoal-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal animation="fadeLeft">
            <div>
              <p className="text-copper text-xs tracking-widest uppercase mb-3">Opening Hours</p>
              <h2 className="font-serif text-4xl text-ivory mb-10">We're open<br />when you need us.</h2>
              <dl className="space-y-4 mb-10">
                {HOURS.map((h, i) => (
                  <div
                    key={h.day}
                    className="flex justify-between items-center border-b border-charcoal-700 pb-4"
                    style={{
                      animation: 'none',
                      transitionDelay: `${i * 60}ms`,
                    }}
                  >
                    <dt className="text-ivory/60 text-sm">{h.day}</dt>
                    <dd className={`text-sm font-medium ${h.open ? 'text-ivory' : 'text-ivory/30'}`}>{h.hours}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-ivory/40 text-sm mb-8">14 Kloof Street, Gardens, Cape Town, 8001</p>
              <button
                onClick={() => navigate('/booking')}
                className="btn-copper px-8 py-4 bg-copper text-charcoal font-semibold tracking-widest uppercase text-sm hover:bg-copper-400 transition-colors"
              >
                Reserve Your Slot
              </button>
            </div>
          </Reveal>
          <Reveal animation="fadeRight" delay={150}>
            <div className="aspect-[4/3] overflow-hidden bg-charcoal-700">
              <img
                src={INTERIOR_PHOTO}
                alt="Interior of The Standard Barber Co."
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-24 px-6 text-center">
        <Reveal animation="fadeUp">
          <p className="text-copper text-xs tracking-widest uppercase mb-4">Ready?</p>
          <h2 className="font-serif text-5xl md:text-6xl text-ivory mb-6">
            Your next cut<br />starts here.
          </h2>
          <p className="text-ivory/50 mb-10 max-w-md mx-auto">
            Choose your service, pick your barber, and lock in your time. It takes two minutes.
          </p>
          <button
            onClick={() => navigate('/booking')}
            className="btn-copper px-10 py-4 bg-copper text-charcoal font-semibold tracking-widest uppercase text-sm hover:bg-copper-400 transition-colors"
          >
            Book an Appointment
          </button>
        </Reveal>
      </section>
    </div>
  );
}
