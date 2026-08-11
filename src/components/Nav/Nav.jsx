import { useEffect, useRef } from 'react';
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

export default function Nav() {
  const navRef = useRef(null);

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

  return (
    <nav
      ref={navRef}
      className="nav"
      style={{
        position: 'sticky', top: 0, zIndex: 20, backdropFilter: 'blur(8px)',
        background: 'color-mix(in srgb, var(--color-bg) 90%, transparent)',
        paddingInline: 'max(24px, calc((100% - 1200px) / 2 + 24px))',
      }}
    >
      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>
      <a className="btn btn-primary" style={{ whiteSpace: 'nowrap' }} href={SITE.tgLink} target="_blank" rel="noopener noreferrer">
        Бронь в Telegram
      </a>
    </nav>
  );
}
