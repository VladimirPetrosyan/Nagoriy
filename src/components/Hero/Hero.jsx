import { SITE } from '../../config/site.js';
import Counter from '../common/Counter.jsx';
import Reveal from '../common/Reveal.jsx';
import { CallbackTrigger } from '../Callback/CallbackForm.jsx';

const STATS = [
  { count: 150, suffix: 'га', label: 'территория' },
  { count: 22, suffix: null, label: 'жилых квартала' },
  { count: 2, suffix: 'школы', label: '1600 и 1500 мест' },
  { count: 3, suffix: 'сада', label: '280 и 350 мест' },
  { count: 12, suffix: 'мин', label: 'до аэропорта' },
];

export default function Hero() {
  return (
    <>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px)' }}>
        <section style={{ padding: 'clamp(48px, 8vw, 104px) 0 0', position: 'relative', isolation: 'isolate' }}>
          <div
            data-hero-bg=""
            aria-hidden="true"
            style={{
              position: 'absolute', zIndex: -1, top: 0, left: '50%',
              marginLeft: '-50vw', width: '100vw', height: 'clamp(440px, 58vw, 880px)', overflow: 'hidden',
              pointerEvents: 'none',
              maskImage: 'linear-gradient(to bottom, #000 62%, transparent 96%)',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 62%, transparent 96%)',
            }}
          >
            <div data-hero-drift="" style={{ position: 'absolute', inset: '-4%' }}>
              <img
                src="/assets/gory-fon.webp"
                alt=""
                fetchPriority="high"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%' }}
              />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(229,225,208,.32) 0%, rgba(229,225,208,.46) 36%, rgba(229,225,208,.72) 62%, rgba(229,225,208,.92) 82%, #e5e1d0 96%)' }} />
          </div>

          <Reveal as="span" variant="tracking" style={{ display: 'block', fontSize: 13, textTransform: 'uppercase', color: 'var(--color-accent-800, #4a4d36)', fontFeatureSettings: "'tnum' 1", marginBottom: 26, '--tracking-end': '.14em' }}>
            Железноводск · Кавказские Минеральные Воды · 150 га
          </Reveal>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(44px, 6.4vw, 90px)', lineHeight: 1.07, letterSpacing: '-.012em', margin: '0 0 0 -.04em' }}>
            <span data-mask="" style={{ display: 'block' }}>Нагория - новый уровень ЖК, где курорт</span>
            <span data-mask="" style={{ display: 'block' }}>становится стилем жизни.</span>
          </h1>

          <div data-2col="" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)', gap: '28px clamp(28px, 5vw, 80px)', alignItems: 'end', marginTop: 42 }}>
            <p data-reveal="" style={{ fontSize: 17, lineHeight: 1.68, margin: 0, maxWidth: '56ch', color: 'var(--color-text)', textAlign: 'justify', hyphens: 'auto' }}>
              «Нагория» — жилой район на 150 гектарах в Железноводске, единственном городе Кавказских Минеральных Вод,
              что стоит в лесу у подножия двух гор, с бюветами минеральной воды в шаге от жилых улиц. Двадцать два
              квартала на 8–14 этажей, дворы без машин, свои школы и детские сады, сквер с деревянной набережной
              вдоль реки. Курортная привычка гулять, а не ездить, заложена здесь в саму планировку.
            </p>
            <div data-reveal-2="" style={{ borderLeft: '1px solid var(--color-divider)', paddingLeft: 'clamp(20px, 3vw, 36px)' }}>
              <span style={{ display: 'block', fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 84%, transparent)' }}>
                Стоимость квадратного метра
              </span>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(30px, 3.4vw, 44px)', lineHeight: 1.1, fontFeatureSettings: "'tnum' 1", margin: '12px 0 0' }}>
                {SITE.priceFrom}
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 24 }}>
                <CallbackTrigger className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                  Заказать обратный звонок
                </CallbackTrigger>
                <a className="btn btn-ghost" style={{ whiteSpace: 'nowrap' }} href="#kvartiry">Смотреть квартиры</a>
              </div>
            </div>
          </div>

          <div data-reveal-3="" style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'clamp(32px, 4vw, 52px)', fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 84%, transparent)', fontFeatureSettings: "'tnum' 1" }}>
            <span data-pulse="" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent)', animation: 'k-pulse 2.6s ease-in-out infinite' }} />
            <span>Первая очередь в продаже · сдача II квартал 2029</span>
          </div>

          <div data-stats-grid="" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 1, marginTop: 'clamp(36px, 4.5vw, 60px)', background: 'var(--color-divider)', border: '1px solid var(--color-divider)' }}>
            {STATS.map((s, i) => (
              <Reveal key={s.label} variant="up" index={i} className="stat-tile" style={{ background: 'var(--color-bg)', padding: 'clamp(20px, 2.4vw, 30px)' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px, 3.6vw, 46px)', lineHeight: 1, fontFeatureSettings: "'tnum' 1", margin: 0 }}>
                  <Counter target={s.count} suffix={s.suffix} />
                </p>
                <p style={{ fontSize: '12.5px', letterSpacing: '.09em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 84%, transparent)', margin: '12px 0 0' }}>
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
