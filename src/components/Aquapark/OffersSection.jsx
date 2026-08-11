import { SITE } from '../../config/site.js';
import useDrawOnView from '../common/useDrawOnView.js';

const OFFERS = [
  { kick: 'Ипотека', title: 'Семейная ипотека 3,5%', body: 'Льготная программа для семей с детьми со ставкой 3,5%.', cta: 'Подобрать квартиру', delay: '0.00s' },
  { kick: 'Подарок', title: 'Парковка в подарок', body: 'При покупке 3-К и 4-К квартиры.', cta: 'Узнать подробности', delay: '0.07s', circled: true },
  { kick: 'Подарок', title: 'Ремонт в подарок', body: 'Отделка «под ключ» за счёт застройщика.', cta: 'Узнать подробности', delay: '0.14s' },
  { kick: 'Спецусловия', title: 'Скидка 15 000 руб. с квадрата', body: 'Специальная цена при оплате собственными средствами на ограниченный пул квартир.', cta: 'Получить условия', delay: '0.21s' },
  { kick: 'Рассрочка', title: 'Рассрочка на 18 месяцев без % и переплат', body: 'Первоначальный взнос от 30% без удорожания. Доступно только 30 квартир.', cta: 'Получить график', delay: '0.28s' },
  { kick: 'Снижение цены', title: 'Снижение цены', body: 'На 3-К и 4-К квартиры.', cta: 'Получить условия', delay: '0.35s' },
  { kick: 'Ипотека', title: 'Траншевая ипотека', body: 'Кредит выдаётся частями по мере строительства дома.', cta: 'Рассчитать платёж', delay: '0.42s' },
];

function CircledTitle({ children }) {
  const [ref, drawn] = useDrawOnView();
  return (
    <span style={{ position: 'relative', display: 'inline-block', margin: '14px 0 0' }}>
      <h3 data-off-title="" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, lineHeight: 1.16, margin: 0, fontSize: 'clamp(21px, 2.05vw, 27px)', letterSpacing: '-.005em', color: 'var(--color-text)', padding: '2px 10px 4px' }}>
        {children}
      </h3>
      <svg
        ref={ref}
        data-circle=""
        {...(drawn ? { 'data-drawn': '' } : {})}
        viewBox="0 0 240 92"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: 'absolute', left: -12, top: -9, width: 'calc(100% + 26px)', height: 'calc(100% + 20px)', overflow: 'visible', pointerEvents: 'none' }}
      >
        <path d="M158 7C86 -3 22 8 9 34c-13 27 33 52 106 51 62-1 116-17 118-38C231 27 196 13 141 9" fill="none" stroke="#6f3d33" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function OffersSection() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px)' }}>
      <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 2vw, 22px)', padding: 'clamp(46px, 5.5vw, 82px) 0 0' }}>
        <span data-wipe="" style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
        <span data-div-mark="" style={{ width: 8, height: 8, background: '#646650', transform: 'rotate(45deg)' }} />
        <span data-wipe="" style={{ flex: 1, height: 1, background: 'var(--color-divider)', transformOrigin: 'right center' }} />
      </div>

      <section id="pokupka" style={{ padding: 'clamp(40px, 5vw, 68px) 0 0' }}>
        <span data-mask="" style={{ display: 'block', fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-accent-800, #4a4d36)', marginBottom: 22 }}>
          Предложения
        </span>
        <h2 data-mask="" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(30px, 3.6vw, 48px)', lineHeight: 1.1, letterSpacing: '-.015em', margin: '0 0 clamp(38px, 4.6vw, 64px) -.03em', maxWidth: '17ch' }}>
          Лучшие условия для тех, кто хочет зайти в проект вовремя
        </h2>

        <div data-off-grid="" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 'clamp(44px, 5vw, 68px) clamp(20px, 2.6vw, 38px)', alignItems: 'start' }}>
          {OFFERS.map((o) => (
            /* data-off-wrap carries the entrance (scroll-timeline) animation;
               data-off carries the hover lift — see the plan-card comment
               above for why these can't share one element. */
            <div key={o.title} data-off-wrap="" style={{ animationDelay: o.delay }}>
            <a data-off="" href={SITE.tgLink} target="_blank" rel="noopener noreferrer">
              <p data-off-kick="" style={{ fontSize: '10.5px', letterSpacing: '.18em', textTransform: 'uppercase', margin: 0, color: 'color-mix(in srgb, var(--color-text) 78%, transparent)' }}>
                {o.kick}
              </p>
              {o.circled ? (
                <CircledTitle>{o.title}</CircledTitle>
              ) : (
                <h3 data-off-title="" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, lineHeight: 1.16, margin: '14px 0 0', fontSize: 'clamp(21px, 2.05vw, 27px)', letterSpacing: '-.005em', color: 'var(--color-text)' }}>
                  {o.title}
                </h3>
              )}
              <p data-off-body="" style={{ fontSize: '12.5px', lineHeight: 1.6, margin: '14px 0 0', color: 'color-mix(in srgb, var(--color-text) 72%, transparent)' }}>
                {o.body}
              </p>
              <span data-off-link="" style={{ margin: '18px 0 0', fontSize: '9.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-accent-800, #4a4d36)' }}>
                {o.cta} <i aria-hidden="true">→</i>
              </span>
            </a>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '11.5px', lineHeight: 1.6, color: 'color-mix(in srgb, var(--color-text) 52%, transparent)', margin: 'clamp(44px, 5vw, 68px) 0 0' }}>
          Условия действуют на ограниченный пул квартир первой очереди и не являются публичной офертой.
        </p>
      </section>

      <section id="bron" style={{ padding: 'clamp(44px, 5.5vw, 78px) 0 clamp(34px, 4vw, 54px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 2vw, 22px)' }}>
          <span data-wipe="" style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
          <span data-div-mark="" aria-hidden="true" style={{ width: 8, height: 8, background: '#646650', transform: 'rotate(45deg)' }} />
          <span data-wipe="" style={{ flex: 1, height: 1, background: 'var(--color-divider)', transformOrigin: 'right center' }} />
        </div>
        <p data-reveal-2="" style={{ textAlign: 'center', fontSize: '12.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-accent-800, #4a4d36)', margin: 'clamp(20px, 2.4vw, 30px) 0 0' }}>
          НАГОРИЯ · ЖЕЛЕЗНОВОДСК
        </p>
      </section>
    </div>
  );
}
