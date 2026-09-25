import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

type Animation = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight';

interface RevealProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;        // ms
  duration?: number;     // ms
  threshold?: number;    // 0–1
  className?: string;
  once?: boolean;
}

const BASE: CSSProperties = {
  willChange: 'transform, opacity',
  transitionProperty: 'opacity, transform',
  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

const HIDDEN: Record<Animation, CSSProperties> = {
  fadeUp:    { opacity: 0, transform: 'translateY(28px)' },
  fadeIn:    { opacity: 0, transform: 'none' },
  fadeLeft:  { opacity: 0, transform: 'translateX(-28px)' },
  fadeRight: { opacity: 0, transform: 'translateX(28px)' },
};

const VISIBLE: CSSProperties = { opacity: 1, transform: 'none' };

export default function Reveal({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  className = '',
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...BASE,
        ...(visible ? VISIBLE : HIDDEN[animation]),
        transitionDuration: `${duration}ms`,
        transitionDelay: visible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}
