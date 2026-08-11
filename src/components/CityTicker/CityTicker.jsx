const CITIES = [
  'Железноводск 10 мин',
  'Аэропорт Мин. Воды 12 мин',
  'Пятигорск 30 мин',
  'Ессентуки 30 мин',
  'Кисловодск 30 мин',
];
const LOOP = [...CITIES, ...CITIES];

export default function CityTicker() {
  return (
    <section aria-label="Четыре города рядом" style={{ margin: 'clamp(48px, 6vw, 88px) 0', borderTop: '1px solid var(--color-divider)', borderBottom: '1px solid var(--color-divider)', overflow: 'hidden', padding: '22px 0' }}>
      <div data-ticker="" style={{ display: 'flex', width: 'max-content', animation: 'k-ticker 46s linear infinite', fontFamily: 'var(--font-heading)', fontSize: 'clamp(20px, 2.2vw, 30px)', letterSpacing: '.04em', textTransform: 'uppercase', fontFeatureSettings: "'tnum' 1", color: 'color-mix(in srgb, var(--color-text) 84%, transparent)' }}>
        {LOOP.map((c, i) => (
          <span key={i} style={{ display: 'flex' }}>
            <span style={{ paddingRight: 48 }}>{c}</span>
            <span style={{ paddingRight: 48, color: 'var(--color-accent)' }}>·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
