'use client';

import { Droplets, HeartPulse, Layers, Wind } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { PROBLEM_MODALS, type ProblemIconKey } from '../data/problemModals';

const PROBLEM_ICONS: Record<ProblemIconKey, React.ReactNode> = {
  water:  <Droplets   size={36} strokeWidth={1.5} aria-hidden />,
  soil:   <Layers     size={36} strokeWidth={1.5} aria-hidden />,
  air:    <Wind       size={36} strokeWidth={1.5} aria-hidden />,
  health: <HeartPulse size={36} strokeWidth={1.5} aria-hidden />,
};

export function ProblemCards() {
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
    requestAnimationFrame(() => {
      lastTriggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!openId) return;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [openId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const active = PROBLEM_MODALS.find((p) => p.id === openId);

  return (
    <>
      <div className="prob-grid">
        {PROBLEM_MODALS.map((p) => (
          <button
            key={p.id}
            type="button"
            className="prob-card prob-card--clickable reveal"
            onClick={(e) => open(p.id, e.currentTarget)}
            aria-haspopup="dialog"
            aria-expanded={openId === p.id}
            aria-controls={`prob-dialog-${p.id}`}
          >
            <span className="prob-card-icon">
              {PROBLEM_ICONS[p.icon]}
            </span>
            <span className="prob-card-title">{p.title}</span>
            <p className="prob-card-summary">{p.summary}</p>
            <span className="prob-card-hint">
              Saiba mais
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                <path d="M1.5 5.5h8M6 2l3.5 3.5L6 9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div className="prob-modal-backdrop" onClick={close} role="presentation">
          <div
            id={`prob-dialog-${active.id}`}
            className="prob-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="prob-modal-header">
              <div className="prob-modal-header-main">
                <span className="prob-modal-header-icon">
                  {PROBLEM_ICONS[active.icon]}
                </span>
                <h2 id={titleId} className="prob-modal-title">
                  {active.title}
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
              <p className="prob-modal-context">{active.contextIntro}</p>

              {active.sections.map((section) => (
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
