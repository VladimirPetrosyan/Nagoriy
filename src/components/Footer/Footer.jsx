import { SITE } from '../../config/site.js';
import Reveal from '../common/Reveal.jsx';

export default function Footer() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px)' }}>
      <footer style={{ borderTop: '1px solid var(--color-divider)', padding: '36px 0 56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 28, fontSize: '13.5px', lineHeight: 1.7, color: 'color-mix(in srgb, var(--color-text) 84%, transparent)' }}>
        <Reveal variant="up" index={0}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 22, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-text)', margin: '0 0 10px' }}>
            Нагория
          </p>
          <p style={{ margin: 0 }}>Район города-курорта Железноводска: аквапарк, сквер и набережная</p>
        </Reveal>

        <Reveal variant="up" index={1}>
          <p style={{ margin: 0, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: 12 }}>Расположение</p>
          <p style={{ margin: '8px 0 0' }}>Железноводск</p>
          <p style={{ margin: 0 }}>Ежедневно 09:00 — 21:00</p>
          <p style={{ margin: 0 }}>ГК ССК · с 2012 года · топ-10 застройщиков РФ</p>
        </Reveal>

        <Reveal variant="up" index={2}>
          <p style={{ margin: 0, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: 12 }}>Бронирование</p>
          <p style={{ margin: '8px 0 0' }}>
            <a className="link-underline" href={SITE.tgLink} target="_blank" rel="noopener noreferrer">Telegram</a>{' · '}
            <a className="link-underline" href={SITE.waLink} target="_blank" rel="noopener noreferrer">WhatsApp</a>{' · '}
            <a className="link-underline" href={SITE.maxLink} target="_blank" rel="noopener noreferrer">MAX</a>
          </p>
          <p style={{ margin: 0 }}><a className="link-underline" href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a></p>
        </Reveal>

        <Reveal variant="up" index={3}>
          <p style={{ margin: 0, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: 12 }}>Документы</p>
          <p style={{ margin: '8px 0 0' }}><a className="link-underline" href={SITE.tgLink} target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a></p>
          <p style={{ margin: 0 }}><a className="link-underline" href={SITE.tgLink} target="_blank" rel="noopener noreferrer">Проектная декларация</a></p>
        </Reveal>
      </footer>
    </div>
  );
}
