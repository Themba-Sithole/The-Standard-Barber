import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SERVICES, BARBERS, formatPrice, formatDuration, type Service, type Barber } from '../data';
import { createBooking, type Booking } from '../lib/bookings';
import { googleCalendarUrl, downloadIcs, formatBookingDate, formatTime } from '../lib/calendar';

type Step = 1 | 2 | 3 | 4;

interface FormState {
  service: Service | null;
  barber: Barber | null;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function getDayOfWeek(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).getDay();
}

function getTimeSlots(dateStr: string): string[] {
  if (!dateStr) return [];
  const dow = getDayOfWeek(dateStr);
  if (dow === 0) return [];

  const isMonFri = dow >= 1 && dow <= 5;
  const startH = isMonFri ? 9 : 8;
  const endH = isMonFri ? 17.5 : 16.5;

  const slots: string[] = [];
  for (let h = startH; h <= endH; h += 0.5) {
    const hour = Math.floor(h);
    const min = h % 1 === 0 ? '00' : '30';
    slots.push(`${String(hour).padStart(2, '0')}:${min}`);
  }

  if (dateStr === todayISO()) {
    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes() + 30;
    return slots.filter((s) => {
      const [h, m] = s.split(':').map(Number);
      return h * 60 + m > current;
    });
  }

  return slots;
}

const STEPS = ['Service', 'Barber', 'Date & Time', 'Your Details'];

export default function Booking() {
  const location = useLocation();
  const state = location.state as { selectedService?: string; selectedBarber?: string } | null;
  const initServiceId = state?.selectedService;
  const initBarberId = state?.selectedBarber;

  const initialService = initServiceId ? (SERVICES.find((s) => s.id === initServiceId) ?? null) : null;
  const initialBarber = initBarberId ? (BARBERS.find((b) => b.id === initBarberId) ?? null) : null;

  const [step, setStep] = useState<Step>(() => {
    if (initialService && initialBarber) return 3;
    if (initialService) return 2;
    return 1;
  });

  const [form, setForm] = useState<FormState>({
    service: initialService,
    barber: initialBarber,
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  // Re-derive available slots on each render — no async needed since Formspree doesn't track availability
  const timeSlots = getTimeSlots(form.date);

  function validateStep(s: Step): boolean {
    const errs: Partial<Record<keyof FormState, string>> = {};

    if (s === 1 && !form.service) errs.service = 'Please select a service.';

    if (s === 2 && !form.barber) errs.barber = 'Please select a barber.';

    if (s === 3) {
      if (!form.date) {
        errs.date = 'Please choose a date.';
      } else if (form.date < todayISO()) {
        errs.date = 'Appointment date must be in the future.';
      } else if (getDayOfWeek(form.date) === 0) {
        errs.date = 'We are closed on Sundays.';
      }
      if (!form.time) errs.time = 'Please choose a time.';
    }

    if (s === 4) {
      if (!form.name.trim()) errs.name = 'Your name is required.';
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errs.email = 'A valid email address is required.';
      if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 9)
        errs.phone = 'A valid phone number is required.';
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (!validateStep(step)) return;
    if (step < 4) setStep((s) => (s + 1) as Step);
    else void handleSubmit();
  }

  function back() {
    setStep((s) => (s - 1) as Step);
    setSubmitError(null);
  }

  async function handleSubmit() {
    if (!validateStep(4)) return;
    if (!form.service || !form.barber || !form.date || !form.time) return;

    setSubmitting(true);
    setSubmitError(null);

    const result = await createBooking({
      service_id: form.service.id,
      service_name: form.service.name,
      service_duration: form.service.duration,
      service_price: form.service.price,
      barber_id: form.barber.id,
      barber_name: form.barber.name,
      date: form.date,
      time: form.time,
      customer_name: form.name.trim(),
      customer_email: form.email.trim(),
      customer_phone: form.phone.trim(),
    });

    setSubmitting(false);

    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    setConfirmedBooking(result.booking);
  }

  if (confirmedBooking) {
    return <Confirmation booking={confirmedBooking} />;
  }

  const progress = ((step - 1) / 3) * 100;

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-copper text-xs tracking-widest uppercase mb-3">Make an Appointment</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ivory mb-10">Book Your Visit</h1>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex justify-between mb-3">
            {STEPS.map((label, i) => (
              <span
                key={label}
                className={`text-xs tracking-wider uppercase transition-colors ${
                  i + 1 <= step ? 'text-copper' : 'text-ivory/25'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="h-px bg-charcoal-700">
            <div className="h-px bg-copper transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Step panel */}
        <div className="bg-charcoal-800 border border-charcoal-700 p-8 md:p-10">
          {step === 1 && (
            <StepService
              selected={form.service}
              onSelect={(s) => {
                setForm((f) => ({ ...f, service: s }));
                setFieldErrors((e) => ({ ...e, service: undefined }));
              }}
              error={fieldErrors.service}
            />
          )}
          {step === 2 && (
            <StepBarber
              selected={form.barber}
              onSelect={(b) => {
                setForm((f) => ({ ...f, barber: b }));
                setFieldErrors((e) => ({ ...e, barber: undefined }));
              }}
              error={fieldErrors.barber}
            />
          )}
          {step === 3 && (
            <StepDateTime
              date={form.date}
              time={form.time}
              slots={timeSlots}
              onDateChange={(d) => {
                setForm((f) => ({ ...f, date: d, time: '' }));
                setFieldErrors((e) => ({ ...e, date: undefined }));
              }}
              onTimeChange={(t) => {
                setForm((f) => ({ ...f, time: t }));
                setFieldErrors((e) => ({ ...e, time: undefined }));
              }}
              dateError={fieldErrors.date}
              timeError={fieldErrors.time}
            />
          )}
          {step === 4 && (
            <StepDetails
              form={form}
              onChange={(k, v) => {
                setForm((f) => ({ ...f, [k]: v }));
                setFieldErrors((e) => ({ ...e, [k]: undefined }));
              }}
              errors={fieldErrors}
            />
          )}

          {/* Submission error */}
          {submitError && (
            <div
              className="mt-6 p-4 bg-red-900/20 border border-red-800/50 text-red-400 text-sm"
              role="alert"
            >
              <p className="font-medium mb-1">Submission failed</p>
              <p>{submitError}</p>
              <p className="mt-2 text-red-400/70 text-xs">
                Your details have been kept — click "Confirm Booking" to try again, or call us on{' '}
                <a href="tel:+27214245678" className="underline">+27 21 424 5678</a>.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-10 pt-8 border-t border-charcoal-700">
            {step > 1 ? (
              <button
                onClick={back}
                disabled={submitting}
                className="text-ivory/50 text-sm tracking-wide hover:text-ivory transition-colors disabled:opacity-30"
              >
                ← Back
              </button>
            ) : (
              <span />
            )}
            <button
              onClick={next}
              disabled={submitting}
              className="px-8 py-3.5 bg-copper text-charcoal font-semibold text-sm tracking-widest uppercase hover:bg-copper-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending…' : step === 4 ? 'Confirm Booking' : 'Continue →'}
            </button>
          </div>
        </div>

        {/* Selection summary */}
        {(form.service || form.barber || form.date) && (
          <div className="mt-6 border border-charcoal-700 p-6 text-sm space-y-3">
            <p className="text-copper text-xs tracking-widest uppercase mb-4">Your Selection</p>
            {form.service && (
              <div className="flex justify-between">
                <span className="text-ivory/50">Service</span>
                <span className="text-ivory">
                  {form.service.name} &middot; {formatPrice(form.service.price)}
                </span>
              </div>
            )}
            {form.barber && (
              <div className="flex justify-between">
                <span className="text-ivory/50">Barber</span>
                <span className="text-ivory">{form.barber.name}</span>
              </div>
            )}
            {form.date && (
              <div className="flex justify-between">
                <span className="text-ivory/50">Date</span>
                <span className="text-ivory">{formatBookingDate(form.date)}</span>
              </div>
            )}
            {form.time && (
              <div className="flex justify-between">
                <span className="text-ivory/50">Time</span>
                <span className="text-ivory">{formatTime(form.time)}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Step 1: Service ── */
function StepService({
  selected,
  onSelect,
  error,
}: {
  selected: Service | null;
  onSelect: (s: Service) => void;
  error?: string;
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-ivory mb-6">Choose a service</h2>
      {error && <p className="text-red-400 text-sm mb-4" role="alert">{error}</p>}
      <div className="space-y-px" role="radiogroup" aria-label="Select service">
        {SERVICES.map((s) => {
          const isSelected = selected?.id === s.id;
          return (
            <button
              key={s.id}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(s)}
              className={`w-full text-left p-5 border transition-all flex justify-between items-start gap-4 ${
                isSelected
                  ? 'border-copper bg-copper/5'
                  : 'border-charcoal-600 hover:border-charcoal-600/80 hover:bg-charcoal-700'
              }`}
            >
              <div className="flex-1">
                <p className={`font-semibold ${isSelected ? 'text-ivory' : 'text-ivory/80'}`}>{s.name}</p>
                <p className="text-ivory/40 text-sm mt-1">{s.description}</p>
                <p className="text-ivory/30 text-xs mt-2">{formatDuration(s.duration)}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`font-serif text-xl ${isSelected ? 'text-copper' : 'text-ivory/60'}`}>
                  {formatPrice(s.price)}
                </p>
                {isSelected && (
                  <div className="mt-2 w-4 h-4 rounded-full bg-copper flex items-center justify-center ml-auto">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                      <path d="M1 3l2 2 4-4" stroke="#1a1917" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 2: Barber ── */
function StepBarber({
  selected,
  onSelect,
  error,
}: {
  selected: Barber | null;
  onSelect: (b: Barber) => void;
  error?: string;
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-ivory mb-6">Choose your barber</h2>
      {error && <p className="text-red-400 text-sm mb-4" role="alert">{error}</p>}
      <div className="space-y-px" role="radiogroup" aria-label="Select barber">
        {BARBERS.map((b) => {
          const isSelected = selected?.id === b.id;
          return (
            <button
              key={b.id}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(b)}
              className={`w-full text-left p-5 border transition-all flex items-center gap-5 ${
                isSelected
                  ? 'border-copper bg-copper/5'
                  : 'border-charcoal-600 hover:border-charcoal-600/80 hover:bg-charcoal-700'
              }`}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-charcoal-700">
                <img src={b.photo} alt={b.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold ${isSelected ? 'text-ivory' : 'text-ivory/80'}`}>{b.name}</p>
                <p className="text-ivory/40 text-sm">{b.role}</p>
                <p className="text-ivory/30 text-xs mt-1">{b.speciality}</p>
              </div>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-copper flex items-center justify-center flex-shrink-0">
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                    <path d="M1 3.5l2.5 2.5 5-5" stroke="#1a1917" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 3: Date & Time ── */
function StepDateTime({
  date,
  time,
  slots,
  onDateChange,
  onTimeChange,
  dateError,
  timeError,
}: {
  date: string;
  time: string;
  slots: string[];
  onDateChange: (d: string) => void;
  onTimeChange: (t: string) => void;
  dateError?: string;
  timeError?: string;
}) {
  const isClosed = date ? getDayOfWeek(date) === 0 : false;

  return (
    <div>
      <h2 className="font-serif text-2xl text-ivory mb-6">Choose date &amp; time</h2>

      <div className="mb-6">
        <label htmlFor="booking-date" className="block text-sm text-ivory/60 mb-2">
          Date
        </label>
        <input
          id="booking-date"
          type="date"
          min={todayISO()}
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className={`w-full bg-charcoal-700 border text-ivory px-4 py-3 text-sm focus:outline-none focus:border-copper transition-colors ${
            dateError ? 'border-red-700' : 'border-charcoal-600'
          }`}
          aria-describedby={dateError ? 'date-error' : undefined}
          aria-invalid={!!dateError}
        />
        {dateError && (
          <p id="date-error" className="text-red-400 text-xs mt-1.5" role="alert">
            {dateError}
          </p>
        )}
        {isClosed && (
          <p className="text-amber-500 text-xs mt-1.5">We are closed on Sundays. Please select another date.</p>
        )}
      </div>

      {date && !isClosed && (
        <div>
          <p className="text-sm text-ivory/60 mb-3">Available time slots</p>
          {slots.length === 0 ? (
            <p className="text-ivory/40 text-sm">No slots available for this date.</p>
          ) : (
            <>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2" role="radiogroup" aria-label="Select time">
                {slots.map((slot) => {
                  const isSelected = time === slot;
                  return (
                    <button
                      key={slot}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => onTimeChange(slot)}
                      className={`py-2.5 text-xs text-center border transition-all ${
                        isSelected
                          ? 'border-copper bg-copper text-charcoal font-semibold'
                          : 'border-charcoal-600 text-ivory/70 hover:border-copper/60 hover:text-ivory'
                      }`}
                    >
                      {formatTime(slot)}
                    </button>
                  );
                })}
              </div>
              {timeError && (
                <p className="text-red-400 text-xs mt-3" role="alert">
                  {timeError}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Step 4: Details ── */
function StepDetails({
  form,
  onChange,
  errors,
}: {
  form: FormState;
  onChange: (k: keyof FormState, v: string) => void;
  errors: Partial<Record<keyof FormState, string>>;
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-ivory mb-2">Your details</h2>
      <p className="text-ivory/40 text-sm mb-8">
        Used solely to manage your appointment request.
      </p>
      <div className="space-y-5">
        <Field
          label="Full Name"
          id="name"
          value={form.name}
          onChange={(v) => onChange('name', v)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          label="Email Address"
          id="email"
          type="email"
          value={form.email}
          onChange={(v) => onChange('email', v)}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          label="Phone Number"
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(v) => onChange('phone', v)}
          error={errors.phone}
          autoComplete="tel"
          placeholder="+27 82 000 0000"
        />
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-ivory/60 mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`w-full bg-charcoal-700 border text-ivory px-4 py-3 text-sm placeholder:text-ivory/20 focus:outline-none focus:border-copper transition-colors ${
          error ? 'border-red-700' : 'border-charcoal-600'
        }`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-400 text-xs mt-1.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Confirmation ── */
function Confirmation({ booking }: { booking: Booking }) {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Status icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full border border-copper/50 flex items-center justify-center">
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
              <path d="M2 9l7 7L22 2" stroke="#b8703a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="text-copper text-xs tracking-widest uppercase mb-3">Request Received</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ivory mb-4">
            Booking request received&mdash;your appointment is awaiting confirmation.
          </h1>
          <p className="text-ivory/50 text-sm max-w-lg mx-auto">
            We will be in touch to confirm your slot. For immediate assistance, call us on{' '}
            <a href="tel:+27214245678" className="text-copper hover:underline">
              +27 21 424 5678
            </a>
            .
          </p>
        </div>

        {/* Details summary */}
        <div className="bg-charcoal-800 border border-charcoal-700 p-8 mb-8">
          <p className="text-copper text-xs tracking-widest uppercase mb-6">Submitted Details</p>
          <dl className="space-y-4">
            {[
              { label: 'Service', value: booking.service_name },
              { label: 'Barber', value: booking.barber_name },
              { label: 'Date', value: formatBookingDate(booking.date) },
              { label: 'Time', value: formatTime(booking.time) },
              { label: 'Duration', value: `${booking.service_duration} minutes` },
              { label: 'Price', value: formatPrice(booking.service_price) },
              { label: 'Name', value: booking.customer_name },
              { label: 'Email', value: booking.customer_email },
              { label: 'Phone', value: booking.customer_phone },
              { label: 'Location', value: '14 Kloof Street, Gardens, Cape Town, 8001' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between gap-4 text-sm border-b border-charcoal-700 pb-3 last:border-0 last:pb-0"
              >
                <dt className="text-ivory/40 min-w-[100px] flex-shrink-0">{label}</dt>
                <dd className="text-ivory text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Calendar note */}
        <p className="text-ivory/40 text-xs text-center mb-4">
          Save this as a tentative calendar event while you wait for confirmation.
        </p>

        {/* Calendar actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <a
            href={googleCalendarUrl(booking)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-5 py-3 bg-copper text-charcoal font-semibold text-sm tracking-wide uppercase hover:bg-copper-400 transition-colors flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.89 3 3 3.9 3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
            </svg>
            Add to Google Calendar
          </a>
          <button
            onClick={() => downloadIcs(booking)}
            className="flex-1 px-5 py-3 border border-charcoal-600 text-ivory text-sm tracking-wide uppercase hover:border-ivory/40 transition-colors flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-6 2h12v2H6v-2z" />
            </svg>
            Download for Apple Calendar
          </button>
        </div>

        <div className="text-center">
          <a
            href="/booking"
            className="text-copper text-sm tracking-widest uppercase border-b border-copper/40 hover:border-copper pb-1 transition-colors"
          >
            Make another booking request &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
