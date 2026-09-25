import { useNavigate } from 'react-router-dom';
import { BARBERS } from '../data';
import Reveal from '../components/Reveal';

const SHOP_PHOTO = 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop&auto=format&q=80';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <Reveal animation="fadeUp">
          <p className="text-copper text-xs tracking-widest uppercase mb-4">Our Story</p>
          <h1 className="font-serif text-5xl md:text-6xl text-ivory max-w-2xl mb-8">
            Built on craft. Driven by standards.
          </h1>
        </Reveal>
      </section>

      {/* Story */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <Reveal animation="fadeLeft">
            <div className="space-y-6 text-ivory/70 leading-relaxed">
              <p>
                The Standard Barber Co. opened in 2018 on Kloof Street after Sipho Dlamini returned from two years in London, where he sharpened his craft in some of the city's most demanding shops.
              </p>
              <p>
                Sipho came back to Cape Town with a clear idea: a barbershop that took the craft seriously without taking itself too seriously. A place where regulars felt at home, first-timers felt welcome, and nobody left wondering if they got their money's worth.
              </p>
              <p>
                The shop has stayed small on purpose. Three chairs, three barbers, and a tight schedule that means your appointment starts on time. We don't do walk-ins because we don't want you waiting. We do do complimentary drinks, because a good visit should feel like one.
              </p>
              <p>
                Six years on, we're still on Kloof Street. The team has grown carefully -- Kwame and Lunga joined because they shared the same standards, not because we needed bodies behind chairs. Every client, every cut, every time.
              </p>
            </div>
          </Reveal>
          <Reveal animation="fadeRight" delay={150}>
            <div className="space-y-8">
              <div className="aspect-[4/3] overflow-hidden bg-charcoal-700">
                <img
                  src={SHOP_PHOTO}
                  alt="Inside The Standard Barber Co."
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="grid grid-cols-3 gap-px bg-charcoal-700">
                {[
                  { value: '2018', label: 'Est.' },
                  { value: '3', label: 'Barbers' },
                  { value: '6+', label: 'Years on Kloof' },
                ].map((s, i) => (
                  <Reveal key={s.label} animation="fadeUp" delay={i * 80}>
                    <div className="bg-charcoal-800 p-6 text-center">
                      <p className="font-serif text-3xl text-copper mb-1">{s.value}</p>
                      <p className="text-ivory/40 text-xs tracking-widest uppercase">{s.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-charcoal-800 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal animation="fadeUp">
            <p className="text-copper text-xs tracking-widest uppercase mb-4">The Team</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory mb-16">Three barbers.<br />One standard.</h2>
          </Reveal>

          <div className="space-y-20">
            {BARBERS.map((barber, i) => (
              <div
                key={barber.id}
                className={`grid grid-cols-1 md:grid-cols-[400px_1fr] gap-10 md:gap-16 items-start ${
                  i % 2 === 1 ? 'md:grid-cols-[1fr_400px]' : ''
                }`}
              >
                <Reveal animation={i % 2 === 1 ? 'fadeRight' : 'fadeLeft'} delay={60}>
                  <div className={`aspect-[3/4] overflow-hidden bg-charcoal-700 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={barber.photo}
                      alt={barber.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </Reveal>
                <Reveal animation={i % 2 === 1 ? 'fadeLeft' : 'fadeRight'} delay={120}>
                  <div className={`py-4 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                    <p className="text-copper text-xs tracking-widest uppercase mb-3">{barber.role}</p>
                    <h3 className="font-serif text-3xl md:text-4xl text-ivory mb-2">{barber.name}</h3>
                    <p className="text-ivory/40 text-sm mb-8">{barber.experience} in the trade · Specialises in {barber.speciality}</p>
                    <p className="text-ivory/70 leading-relaxed text-lg">{barber.bio}</p>
                    <button
                      onClick={() => navigate('/booking', { state: { selectedBarber: barber.id } })}
                      className="mt-10 px-6 py-3 border border-copper/50 text-copper text-xs tracking-widest uppercase hover:bg-copper hover:text-charcoal transition-all duration-300"
                    >
                      Book with {barber.name.split(' ')[0]}
                    </button>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <Reveal animation="fadeUp" className="mb-12 text-center">
          <h2 className="font-serif text-4xl text-ivory">What we believe in.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal-700">
          {[
            { title: 'Precision over speed', body: 'A great haircut takes the time it takes. We schedule properly so no barber ever has to rush a client.' },
            { title: 'Honesty over flattery', body: 'We will tell you what works for your face and hair type. Our job is to make you look good, not just agree with you.' },
            { title: 'Consistency above all', body: 'Your third visit should be as good as your first. We hold ourselves to this and we lose sleep when we fall short.' },
          ].map((v, i) => (
            <Reveal key={v.title} animation="fadeUp" delay={i * 80}>
              <div className="bg-charcoal-800 p-8 md:p-10 h-full">
                <h3 className="font-serif text-xl text-copper mb-4">{v.title}</h3>
                <p className="text-ivory/60 text-sm leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-800 py-20 px-6 text-center">
        <Reveal animation="fadeUp">
          <h2 className="font-serif text-4xl text-ivory mb-4">Come and see for yourself.</h2>
          <p className="text-ivory/50 mb-8 max-w-md mx-auto">14 Kloof Street, Gardens. We're easy to find and even easier to get into once you book.</p>
          <button
            onClick={() => navigate('/booking')}
            className="btn-copper px-8 py-4 bg-copper text-charcoal font-semibold tracking-widest uppercase text-sm hover:bg-copper-400 transition-colors"
          >
            Book an Appointment
          </button>
        </Reveal>
      </section>
    </div>
  );
}
