import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CallbackTrigger } from '../Callback/CallbackForm.jsx';
import { SITE } from '../../config/site.js';

const LINKS = [
  { href: '#kvartal', label: 'Район' },
  { href: '#karta', label: 'Генплан' },
  { href: '#pokupka', label: 'Условия' },
  { href: '#kvartiry', label: 'Квартиры' },
  { href: '#gorod', label: 'Инфраструктура' },
  { href: '#akvapark', label: 'Аквапарк' },
  { href: '#ofis', label: 'На карте' },
];

function BurgerIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.29-.14-1.7-.84-1.96-.93-.26-.1-.46-.14-.65.14-.2.29-.75.93-.92 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.44-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.08-.15-.65-1.58-.9-2.16-.24-.57-.48-.5-.65-.5-.17-.01-.37-.01-.56-.01-.2 0-.51.07-.78.37-.26.29-1.02 1-1.02 2.43 0 1.44 1.05 2.83 1.19 3.02.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.13-.26-.2-.55-.34z" />
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.87.51 3.62 1.4 5.13L2 22l4.99-1.36C8.44 21.5 10.17 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.2c-1.67 0-3.22-.47-4.54-1.28l-.33-.2-3.32.9.89-3.24-.21-.34A8.17 8.17 0 0 1 3.8 12c0-4.53 3.68-8.2 8.2-8.2s8.2 3.67 8.2 8.2-3.68 8.2-8.2 8.2z" />
    </svg>
  );
}

// Official MAX (max.ru) mark, from https://maxicons.ru/icons/Max_logo_black.svg
// — recolored to currentColor so it matches the WhatsApp glyph's theming.
function MaxIcon(props) {
  return (
    <svg viewBox="0 0 720 720" fill="currentColor" {...props}>
      <path d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z" />
    </svg>
  );
}

export default function Nav() {
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      el.classList.toggle('is-elevated', window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      ref={navRef}
      className="nav"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20, backdropFilter: 'blur(8px)',
        background: 'color-mix(in srgb, var(--color-bg) 90%, transparent)',
        paddingInline: 'max(24px, calc((100% - 1200px) / 2 + 24px))',
      }}
    >
      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>

      {/* — desktop — */}
      <div className="nav-actions">
        <a className="nav-icon-link" href={SITE.waLink} target="_blank" rel="noopener noreferrer" aria-label="Написать в WhatsApp">
          <WhatsAppIcon />
        </a>
        <a className="nav-icon-link" href={SITE.maxLink} target="_blank" rel="noopener noreferrer" aria-label="Написать в MAX">
          <MaxIcon />
        </a>
        <a className="nav-phone" href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
        <CallbackTrigger className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
          Заказать обратный звонок
        </CallbackTrigger>
      </div>

      {/* — mobile: single pinned row, left→right = right→left reading order
          requested: [CTA] [WhatsApp] [MAX] [phone] [burger] — burger sits
          rightmost, phone right next to it, then the two messengers, then
          the CTA button. — */}
      <div className="nav-mobile-bar">
        <CallbackTrigger className="btn btn-primary nav-mobile-cta">
          Заказать звонок
        </CallbackTrigger>
        <a className="nav-icon-link" href={SITE.waLink} target="_blank" rel="noopener noreferrer" aria-label="Написать в WhatsApp">
          <WhatsAppIcon />
        </a>
        <a className="nav-icon-link" href={SITE.maxLink} target="_blank" rel="noopener noreferrer" aria-label="Написать в MAX">
          <MaxIcon />
        </a>
        <a className="nav-mobile-phone" href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
        <button
          type="button"
          className="nav-burger"
          aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <CloseIcon /> : <BurgerIcon />}
        </button>
      </div>

      {/* Portaled to <body>: nav itself is position:fixed with its own
          z-index, which traps backdrop-filter to that local stacking
          context (only the nav bar area blurs). Rendering the drawer +
          backdrop as siblings of #root — same trick the callback modal
          already uses — lets the blur sample the whole page behind it. */}
      {createPortal(
        <>
          <div className={`nav-mobile-panel${mobileOpen ? ' is-open' : ''}`}>
            <div className="nav-mobile-head">
              <span className="nav-mobile-brand">Нагория</span>
              <button type="button" className="nav-mobile-close" aria-label="Закрыть меню" onClick={closeMobile}>
                <CloseIcon />
              </button>
            </div>

            <div className="nav-mobile-links">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={closeMobile}>{l.label}</a>
              ))}
            </div>
          </div>
          {mobileOpen && <div className="nav-mobile-backdrop" onClick={closeMobile} />}
        </>,
        document.body,
      )}
    </nav>
  );
}
