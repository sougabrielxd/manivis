'use client';

import { Bug, ClipboardCheck, Leaf, Recycle, Zap } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { OFERTA_ITEMS, type OfertaIconKey } from '../data/ofertaItems';

const ICONS: Record<OfertaIconKey, React.ReactNode> = {
  recycle:   <Recycle        size={45} strokeWidth={1.4} aria-hidden />,
  zap:       <Zap            size={45} strokeWidth={1.4} aria-hidden />,
  leaf:      <Leaf           size={45} strokeWidth={1.4} aria-hidden />,
  bug:       <Bug            size={45} strokeWidth={1.4} aria-hidden />,
  clipboard: <ClipboardCheck size={45} strokeWidth={1.4} aria-hidden />,
};

const ICONS_SM: Record<OfertaIconKey, React.ReactNode> = {
  recycle:   <Recycle        size={35} strokeWidth={1.6} aria-hidden />,
  zap:       <Zap            size={35} strokeWidth={1.6} aria-hidden />,
  leaf:      <Leaf           size={35} strokeWidth={1.6} aria-hidden />,
  bug:       <Bug            size={35} strokeWidth={1.6} aria-hidden />,
  clipboard: <ClipboardCheck size={35} strokeWidth={1.6} aria-hidden />,
};

const HintArrow = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
    <path
      d="M1.5 5.5h8M6 2l3.5 3.5L6 9"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function OfertaCards() {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const open = useCallback((id: string, el: HTMLButtonElement | null) => {
    lastTriggerRef.current = el;
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
    requestAnimationFrame(() => lastTriggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!openId) return;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, [openId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const active = OFERTA_ITEMS.find((i) => i.id === openId && i.hasModal);
  const activeModal = active && active.hasModal ? active.modal : undefined;

  return (
    <>
      <div className="oferecemos-grid">
        {OFERTA_ITEMS.map((item) =>
          item.hasModal ? (
            <button
              key={item.id}
              type="button"
              className="oferta-item oferta-item--clickable reveal"
              onClick={(e) => open(item.id, e.currentTarget)}
              aria-haspopup="dialog"
              aria-expanded={openId === item.id}
              aria-controls={`oferta-dialog-${item.id}`}
            >
              <div className="oferta-icon">{ICONS[item.icon]}</div>
              <div className="oferta-label">{item.label}</div>
              <span className="oferta-hint">
                Saiba mais
                <HintArrow />
              </span>
            </button>
          ) : (
            <div key={item.id} className="oferta-item reveal">
              <div className="oferta-icon">{ICONS[item.icon]}</div>
              <div className="oferta-label">{item.label}</div>
            </div>
          )
        )}
      </div>

      {active && activeModal && (
        <div className="prob-modal-backdrop" onClick={close} role="presentation">
          <div
            id={`oferta-dialog-${active.id}`}
            className="prob-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="prob-modal-header">
              <div className="prob-modal-header-main">
                <span className="prob-modal-header-icon">
                  {ICONS_SM[active.icon]}
                </span>
                <h2 id={titleId} className="prob-modal-title">
                  {activeModal.title}
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                className="prob-modal-close"
                onClick={close}
                aria-label="Fechar"
              >
                ×
              </button>
            </header>

            <div className="prob-modal-body">
              <p className="prob-modal-context">{activeModal.description}</p>

              {activeModal.sections?.map((section) => (
                <section key={section.title} className="prob-modal-block">
                  <h3 className="prob-modal-section-title">{section.title}</h3>
                  <ul className="prob-modal-list">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="prob-modal-footer">
              <button type="button" className="prob-modal-dismiss" onClick={close}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
