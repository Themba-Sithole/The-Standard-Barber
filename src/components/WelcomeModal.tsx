import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'tsbc-welcome-shown';

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const shown = sessionStorage.getItem(STORAGE_KEY);
    if (!shown) {
      const t = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  function handleBook() {
    dismiss();
    navigate('/booking');
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative bg-charcoal-800 border border-charcoal-700 max-w-md w-full p-10 text-center">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-ivory/40 hover:text-ivory transition-colors"
          aria-label="Close offer"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
          </svg>
        </button>

        {/* Scissors icon */}
        <div className="flex justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="6" stroke="#b8703a" strokeWidth="1.5" fill="none"/>
            <circle cx="12" cy="28" r="6" stroke="#b8703a" strokeWidth="1.5" fill="none"/>
            <line x1="16.2" y1="9" x2="34" y2="31" stroke="#b8703a" strokeWidth="1.5"/>
            <line x1="16.2" y1="31" x2="34" y2="9" stroke="#b8703a" strokeWidth="1.5"/>
          </svg>
        </div>

        <p className="text-copper text-xs tracking-widest uppercase mb-3">First Visit Offer</p>
        <h2 id="modal-title" className="font-serif text-3xl text-ivory mb-4">
          10% Off Your First Cut
        </h2>
        <p className="text-ivory/60 text-sm leading-relaxed mb-2">
          New to The Standard? Welcome. Your first appointment comes with 10% off any service — no strings attached.
        </p>
        <p className="text-ivory/40 text-xs mb-8">
          Use code <span className="text-copper font-semibold tracking-widest">FIRST10</span> when booking online.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleBook}
            className="flex-1 px-6 py-3 bg-copper text-charcoal font-semibold text-sm tracking-wide uppercase hover:bg-copper-400 transition-colors"
          >
            Book Now
          </button>
          <button
            onClick={dismiss}
            className="flex-1 px-6 py-3 border border-charcoal-600 text-ivory/60 text-sm tracking-wide uppercase hover:text-ivory hover:border-ivory/30 transition-colors"
          >
            Maybe Later
          </button>
        </div>

        <p className="mt-6 text-ivory/25 text-xs">Valid for first-time clients only. Cannot be combined with other offers.</p>
      </div>
    </div>
  );
}
