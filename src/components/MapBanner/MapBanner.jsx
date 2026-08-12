import Reveal from '../common/Reveal.jsx';

export default function MapBanner() {
  return (
    <section id="ofis"  aria-label="Нагория на карте окружения" style={{ position: 'relative', background: '#6b6f52', overflow: 'hidden' }}>
      <Reveal >
        <img
          className="ken-burns"
          src="/assets/map-nagoria.webp"
          alt="Карта окружения: Нагория в Железноводске, парки, школы, детские сады, гора Железная, Курортный парк"
          loading="lazy"
          decoding="async"
          style={{ width: '100%'}}
        />
      </Reveal>
    </section>
  );
}
