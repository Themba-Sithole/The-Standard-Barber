import { createPortal } from 'react-dom';
import { useLayoutEffect, useRef, type ReactNode } from 'react';

// Native dialogs live above transformed/blurred ancestors and contain keyboard focus.
export default function Modal({ children, onClose, label, className = '' }: {
  children: ReactNode;
  onClose: () => void;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    const dialog = ref.current!;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width };
    body.style.position = 'fixed';
    body.style.top = '-'+scrollY+'px';
    body.style.width = '100%';
    dialog.showModal();
    return () => {
      dialog.close();
      Object.assign(body.style, previous);
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    };
  }, []);

  return createPortal(
    <dialog ref={ref} aria-label={label} className={className}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      {children}
    </dialog>, document.body
  );
}
