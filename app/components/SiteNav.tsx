'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '#hero', label: 'Início' },
  { href: '#manipueira', label: 'Manipueira' },
  { href: '#problemas', label: 'Problemas' },
  { href: '#produtos', label: 'Produtos' },
  { href: '#oferecemos', label: 'O que oferecemos' },
  { href: '#time', label: 'Nosso Time' },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <nav className="site-nav" aria-label="Principal">
      <div className="nav-bar">
        <a href="#hero" className="nav-logo" onClick={close} aria-label="Manivis — página inicial">
          <Image
            src="/Branca.png"
            alt="Manivis"
            width={38}
            height={38}
            className="nav-logo-img"
            priority
          />
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`nav-burger ${open ? 'is-open' : ''}`}
          onClick={toggle}
          aria-expanded={open}
          aria-controls="nav-drawer"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className="nav-burger-line" aria-hidden />
          <span className="nav-burger-line" aria-hidden />
          <span className="nav-burger-line" aria-hidden />
        </button>
      </div>

      <div
        className={`nav-backdrop ${open ? 'is-visible' : ''}`}
        onClick={close}
        aria-hidden={!open}
      />

      <aside
        id="nav-drawer"
        className={`nav-drawer ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <ul className="nav-drawer-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={close}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </nav>
  );
}
