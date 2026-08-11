const PHOTOS = [
  { src: '/assets/dvor_2.png', alt: 'Двор Нагории' },
  { src: '/assets/kommercia.jpg', alt: 'Коммерческая линия на бульваре' },
  { src: '/assets/genplan-top.jpg', alt: 'Генплан района' },
  { src: '/assets/park-reka.jpg', alt: 'Сквер и набережная у реки' },
  { src: '/assets/dvor.jpg', alt: 'Двор Нагории' },
  { src: '/assets/kommercia.jpg', alt: 'Аркада первых этажей' },
];
// Original reel repeats the sequence twice so the marquee (k-ticker, -50%)
// loops seamlessly.
const REEL = [...PHOTOS, ...PHOTOS];

export default function GalleryReel() {
  return (
    <section aria-label="Галерея проекта" style={{ padding: 'clamp(48px, 6vw, 84px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto 32px', padding: '0 clamp(20px, 5vw, 72px)' }}>
        <span data-mask="" style={{ display: 'block', fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-accent-800, #4a4d36)', marginBottom: 14 }}>
          Район в кадрах
        </span>
        <h2 data-mask="" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(26px, 3.2vw, 42px)', lineHeight: 1.14, margin: '0 0 0 -.03em', maxWidth: '22ch' }}>
          Кварталы, дворы, бульвар и набережная — как это выглядит в жизни
        </h2>
      </div>
      <div data-reel="" style={{ display: 'flex', gap: 18, width: 'max-content', animation: 'k-ticker 60s linear infinite', paddingInline: 18 }}>
        {REEL.map((p, i) => (
          <figure key={i} data-reel-item="" style={{ margin: 0, flex: '0 0 auto', width: 'min(46vw, 520px)', aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
            <img src={p.src} alt={p.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </figure>
        ))}
      </div>
    </section>
  );
}
