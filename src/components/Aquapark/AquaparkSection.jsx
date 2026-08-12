import ImageBand from '../ImageBand/ImageBand.jsx';
import AquaparkZones from './AquaparkZones.jsx';
import Reveal from '../common/Reveal.jsx';

export default function AquaparkSection() {
  return (
    <>
      <div style={{ margin: 'clamp(40px, 6vw, 72px) 0 0', background: '#41432f', color: '#f0efdd', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(34px, 4.4vw, 62px) clamp(20px, 5vw, 72px) clamp(30px, 3.8vw, 52px)' }}>
          <Reveal
            as="span"
            variant="tracking"
            style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(30px, 4.6vw, 60px)', lineHeight: 1, textTransform: 'uppercase', color: '#989C73', margin: '0 0 clamp(20px, 2.4vw, 32px) -.02em', '--tracking-end': '.04em' }}
          >
            Аквапарк
          </Reveal>
          <div data-2col="" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px clamp(28px, 5vw, 96px)' }}>
            <p data-reveal="" style={{ fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.72, margin: 0, color: 'rgba(240, 239, 221, .92)' }}>
              Когда хочется большего — на территории ждёт большой аквапарк со спа-зоной. Место, которое полюбят все члены семьи. Дети — за скорость на горках, взрослые — за бассейны с джакузи и сауны.
            </p>
            <p data-reveal-2="" style={{ fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.72, margin: 0, color: 'rgba(240, 239, 221, .92)' }}>
              Концепция аквапарка вдохновлена лучшими мировыми комплексами и открывает жителям «Нагории» представление о семейных выходных с новой стороны.
            </p>
          </div>
        </div>
      </div>

      <ImageBand src="/assets/29.webp" alt="Аквапарк Нагории — вид с бульвара" ratio="1280/855" marginTop="0" />

      <div data-flow="" style={{ height: 2, backgroundImage: 'repeating-linear-gradient(90deg, var(--color-accent) 0 26px, transparent 26px 120px)', backgroundSize: '240px 2px', animation: 'k-flow 6s linear infinite', opacity: 0.55 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px)' }}>
        <section id="akvapark" style={{ padding: 'clamp(56px, 7vw, 104px) 0 0' }}>
          <span data-mask="" style={{ display: 'block', fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-accent-800, #4a4d36)', marginBottom: 22 }}>
            Отдельная глава · аквапарк Нагории
          </span>
          <div data-2col="" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px clamp(28px, 5vw, 80px)' }}>
            <h2 data-mask="" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(32px, 3.9vw, 52px)', lineHeight: 1.12, letterSpacing: '-.008em', margin: '0 0 0 -.03em' }}>
              <b>Обычно инфраструктура в ЖК — это соседний торговый центр. В ЖК Нагория — свой круглогодичный аквапарк</b>
            </h2>
            <p data-reveal-2="" style={{ fontSize: '15.5px', lineHeight: 1.68, margin: 0, color: 'var(--color-text)', textAlign: 'justify', hyphens: 'auto' }}>
              Термальные бассейны, детские зоны, горки, спа, сауны и хамамы на территории комплекса в шаговой доступности круглый год, независимо от погоды за окном.
            </p>
          </div>

          <AquaparkZones />
        </section>
      </div>
    </>
  );
}
