import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Terms from './pages/Terms';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(10px)',
        transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {children}
    </div>
  );
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />
      <main className="flex-1">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <WelcomeModal />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}
