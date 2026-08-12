import { SITE } from '../../config/site.js';

const PLANS = [
  {
    id: 'plan-1k', img: '/assets/plans/plan-1k.webp', badge: 'доступна по акции',
    title: '1-комнатная квартира',
    specs: ['Площадь 25,8 м²', 'Этаж 3', 'Корпус 5'],
    meta: 'Сдача 2 кв. 2029 г. · Квартира №690', delay: '0s',
  },
  {
    id: 'plan-2k', img: '/assets/plans/plan-2k.webp', badge: 'доступна по акции',
    title: '2-комнатная квартира',
    specs: ['Площадь 36,7 м²', 'Этаж 3', 'Корпус 2'],
    meta: 'Сдача 2 кв. 2029 г. · Квартира №383', delay: '.08s',
  },
  {
    id: 'plan-3k', img: '/assets/plans/plan-3k.webp', badge: 'доступна по акции',
    title: '3-комнатная квартира',
    specs: ['Площадь 57,5 м²', 'Этаж 4', 'Корпус 2'],
    meta: 'Сдача 2 кв. 2029 г. · Квартира №395', delay: '.16s',
  },
  {
    id: 'plan-4k', img: '/assets/plans/plan-4k.webp', badge: 'доступна по акции',
    title: '4-комнатная квартира',
    specs: ['Площадь 73,1 м²', 'Этаж 3', 'Корпус 2'],
    meta: 'Сдача 2 кв. 2029 г. · Квартира №162', delay: '.24s',
  },
  {
    id: 'plan-terrasa', img: '/assets/plans/plan-terrasa.webp', badge: 'с террасой',
    title: '2-комнатная с террасой',
    specs: ['Площадь 68,4 м² + терраса 14,2 м²', 'Этаж 8 · последний', 'Корпус 2 · вид на горы'],
    meta: 'Сдача 2 кв. 2029 г. · Квартира №204', delay: '.32s',
  },
];

// Entrance (scroll-timeline) animation lives on data-plan-card-wrap; the
// hover lift lives on the inner data-plan-card article. Splitting them
// avoids a CSS Animation vs. Transition conflict — a running animation on
// `transform` silently wins over a `:hover` transition on the same
// element, which would otherwise make the hover lift a no-op.
function PlanCard({ plan }) {
  return (
    <div data-plan-card-wrap="" style={{ animationDelay: plan.delay }}>
    <article data-plan-card="" style={{
        display: 'flex', flexDirection: 'column', gap: 16,
        background: 'color-mix(in srgb, var(--color-bg) 60%, #fbf9ee)',
        border: '1px solid var(--color-divider)', padding: '18px 18px 22px',
      }}
    >
      <div data-plan-frame-2="" style={{ border: '1px solid var(--color-divider)', background: '#fdfcf6', aspectRatio: '4/3.4', display:'flex', justifyContent:'center' }}>
        <img src={plan.img} alt={plan.title} loading="lazy" />
        <span data-sheen="" aria-hidden="true" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span data-plan-badge="" style={{ alignSelf: 'start', fontSize: '10.5px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--color-accent-800, #4a4d36)', border: '1px solid var(--color-divider)', padding: '5px 9px' }}>
          {plan.badge}
        </span>
        <h3 data-plan-title="" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(20px, 1.9vw, 25px)', lineHeight: 1.16, margin: 0 }}>
          {plan.title}
        </h3>
        <ul style={{ listStyle: 'none', margin: '2px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
          {plan.specs.map((s) => (
            <li key={s} data-spec="" style={{ fontSize: 14, color: 'color-mix(in srgb, var(--color-text) 86%, transparent)', fontFeatureSettings: "'tnum' 1" }}>{s}</li>
          ))}
        </ul>
        <p style={{ fontSize: '12.5px', lineHeight: 1.55, margin: '6px 0 0', paddingLeft: 12, borderLeft: '2px solid var(--color-accent-800, #4a4d36)', color: 'color-mix(in srgb, var(--color-text) 78%, transparent)', fontFeatureSettings: "'tnum' 1" }}>
          {plan.meta}
        </p>
      </div>
      <a data-plan-cta="" className="btn btn-primary btn-block" style={{ marginTop: 'auto', whiteSpace: 'nowrap' }} href={SITE.tgLink} target="_blank" rel="noopener noreferrer">
        <span>Узнать наличие <em aria-hidden="true">↗</em></span>
      </a>
    </article>
    </div>
  );
}

export default function PlansSection() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px)' }}>
      <section id="kvartiry" style={{ padding: '0 0 clamp(24px, 3vw, 40px)' }}>
        <span data-mask="" style={{ display: 'block', fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-accent-800, #4a4d36)', marginBottom: 22 }}>
          Квартиры и цены
        </span>
        <h2 data-mask="" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(30px, 3.6vw, 46px)', lineHeight: 1.14, margin: 0 }}>
          Найдите идеальную планировку
        </h2>
        <p data-reveal="" style={{ fontSize: 16, lineHeight: 1.65, margin: '18px 0 0', maxWidth: '46ch', color: 'color-mix(in srgb, var(--color-text) 88%, transparent)' }}>
          Подберите планировку под ваш стиль жизни и бюджет — от компактной студии до четырёх комнат с видом на предгорья.
        </p>

        <div data-reveal-2="" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0 16px', alignItems: 'start', marginTop: 26, maxWidth: 660, background: 'color-mix(in srgb, var(--color-accent-800, #4a4d36) 7%, transparent)', border: '1px solid var(--color-divider)', padding: '18px 22px' }}>
          <span aria-hidden="true" style={{ display: 'grid', placeItems: 'center', width: 30, height: 30, border: '1px solid var(--color-divider)', background: 'var(--color-bg)', fontFamily: 'var(--font-heading)', fontSize: 16, lineHeight: 1, color: 'var(--color-accent-800, #4a4d36)' }}>i</span>
          <div>
            <span style={{ display: 'block', fontSize: '11.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-800, #4a4d36)' }}>
              Почему это ваш формат
            </span>
            <p style={{ fontSize: '14.5px', lineHeight: 1.62, margin: '7px 0 0', color: 'color-mix(in srgb, var(--color-text) 90%, transparent)' }}>
              Продуманные планировки помогают сразу увидеть, как квартира будет работать на ваш ритм жизни: для семьи, отдыха, переезда или покупки с прицелом на будущее.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(248px, 1fr))', gap: 'clamp(16px, 1.8vw, 24px)', marginTop: 'clamp(30px, 3.6vw, 44px)' }}>
          {PLANS.map((p) => <PlanCard key={p.id} plan={p} />)}
        </div>

        <p style={{ fontSize: 13, lineHeight: 1.6, color: 'color-mix(in srgb, var(--color-text) 84%, transparent)', margin: '22px 0 0' }}>
          Цена метра — 218 000 ₽, фиксация на 36 месяцев. Не является публичной офертой; полные планировки присылает менеджер в Telegram.
        </p>
      </section>
    </div>
  );
}
