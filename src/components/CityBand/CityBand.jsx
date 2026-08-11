import Reveal from '../common/Reveal.jsx';

const COLUMNS = [
  {
    title: '01 · Образование и семья',
    items: [
      '2 школы на 1 600 и 1 500 мест',
      '3 детских сада на 280 и 350 мест',
      'Детские пространства по всему району',
      'Сквер с набережной у реки',
    ],
  },
  {
    title: '02 · Wellness и спорт',
    items: [
      'Форматы для восстановления после воды',
      'Спортивный корпус рядом с домом',
    ],
  },
  {
    title: '03 · Торговля и аквапарк',
    items: [
      'Аквапарк с термальным источником — круглый год',
      'Торговая галерея и рынок выходного дня',
      'От медицины до торговли — не выезжая',
    ],
  },
  {
    title: '04 · Коворкинг и клубный ритм',
    items: [
      'Лаунж и коворкинг в первых этажах',
      'Тихие общественные места во дворах',
      'Ритм в своём темпе, без спешки города',
    ],
  },
];

export default function CityBand() {
  return (
    <section id="gorod" style={{ background: '#646650', color: '#e1e3ce', padding: 'clamp(48px, 7vw, 96px) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px)' }}>
        <div data-2col="" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)', gap: '28px clamp(28px, 5vw, 80px)', alignItems: 'end' }}>
          <h2 data-mask="" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(30px, 3.7vw, 50px)', lineHeight: 1.12, margin: '0 0 0 -.03em', color: '#f8f7e6' }}>
            Торговые галереи, школы, спорт и аквапарк — всё внутри района
          </h2>
          <p data-reveal-2="" style={{ fontSize: '15.5px', lineHeight: 1.7, margin: 0, color: 'rgba(225,227,206,.85)', textAlign: 'justify', hyphens: 'auto' }}>
            Школы и сады, медицина, спортивный корпус, торговые галереи и рынок выходного дня — всё в границах «Нагории», в пешей доступности от подъезда.
          </p>
        </div>

        <p data-reveal-3="" style={{ margin: 'clamp(28px, 3vw, 40px) 0 0' }}>
          <a href="#akvapark" className="bounce-link" style={{ color: '#eef3a0', fontSize: 14, letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(238, 243, 160, .45)', paddingBottom: 4 }}>
            Отдельная глава об аквапарке <span className="bounce-arrow">↓</span>
          </a>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'clamp(20px, 2.2vw, 30px)', marginTop: 'clamp(36px, 4.5vw, 60px)' }}>
          {COLUMNS.map((col, i) => (
            <Reveal key={col.title} variant="up" index={i} className="city-card" style={{ background: '#646650', border: '1px solid rgba(225, 227, 206, .3)', padding: 'clamp(24px, 2.6vw, 34px)' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase', color: '#eef3a0', margin: 0 }}>
                {col.title}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gap: 12, fontSize: 15, lineHeight: 1.5, color: 'rgba(225,227,206,.88)' }}>
                {col.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
