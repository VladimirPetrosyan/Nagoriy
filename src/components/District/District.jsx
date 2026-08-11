import Reveal from '../common/Reveal.jsx';

const FEATURES_A = [
  ['01', 'Бульвар Открытие'],
  ['02', 'Две школы и три детских сада внутри района'],
  ['03', 'Аквопарк'],
];
const FEATURES_B = [
  ['04', 'Развлекательный центр'],
  ['05', 'Коммерческая недвижимость'],
  ['06', 'Медицинский центр'],
];
const STATS = [
  ['150 га', 'площадь застройки'],
  ['22', 'жилых квартала района'],
  ['8–14', 'этажей'],
  ['2029', 'сдача первой очереди'],
];

function FeatureList({ items, baseIndex }) {
  return (
    <div style={{ borderTop: '1px solid var(--color-divider)' }}>
      {items.map(([num, label], i) => (
        <Reveal
          key={num}
          as="div"
          variant="left"
          index={baseIndex + i}
          className="feature-row"
          style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0 20px', alignItems: 'center', borderBottom: '1px solid var(--color-divider)' }}
        >
          <span className="feature-num" style={{ fontFeatureSettings: "'tnum' 1", color: 'var(--color-accent-800, #4a4d36)', fontSize: 14 }}>{num}</span>
          <span className="feature-label" style={{ fontSize: '15.5px' }}>{label}</span>
        </Reveal>
      ))}
    </div>
  );
}

export default function District() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px)' }}>
      <section id="kvartal" style={{ padding: 'clamp(56px, 7vw, 100px) 0 0' }}>
        <span data-mask="" style={{ display: 'block', fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-accent-800, #4a4d36)', marginBottom: 22 }}>
          Район
        </span>
        <h2 data-mask="" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(32px, 3.9vw, 52px)', lineHeight: 1.12, letterSpacing: '-.008em', margin: '0 0 0 -.03em', maxWidth: '22.2ch' }}>
          В Нагорье есть все необходимое для вашего комфортного проживания.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0 clamp(28px, 4vw, 56px)', marginTop: 'clamp(36px, 4vw, 56px)' }}>
          <FeatureList items={FEATURES_A} baseIndex={0} />
          <FeatureList items={FEATURES_B} baseIndex={3} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 28, marginTop: 'clamp(40px, 5vw, 64px)' }}>
          {STATS.map(([value, label], i) => (
            <Reveal key={label} variant="up" index={i} className="stat-tile" style={{ padding: 4 }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: 34, lineHeight: 1.1, fontFeatureSettings: "'tnum' 1", margin: 0 }}>{value}</p>
              <p style={{ fontSize: 13, letterSpacing: '.09em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 84%, transparent)', margin: '10px 0 0' }}>{label}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
