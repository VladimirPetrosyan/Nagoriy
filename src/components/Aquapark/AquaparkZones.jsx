import { useRef, useState } from 'react';
import { ZONES } from './zoneData.js';
import Reveal from '../common/Reveal.jsx';

/**
 * Hover deck of five zone cards: hovering one pushes its neighbours aside
 * and reveals its extended description. Ported from wireCards().
 */
export default function AquaparkZones() {
  const trackRef = useRef(null);
  const [hover, setHover] = useState(null);

  const scrollZones = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.72, behavior: 'smooth' });
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20, margin: 'clamp(40px, 5vw, 64px) 0 20px' }}>
        <span style={{ fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 84%, transparent)' }}>
          Пять зон · листайте вбок, наведите для подробностей
        </span>
        <span style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button type="button" className="btn btn-ghost btn-icon" aria-label="Предыдущая зона" onClick={() => scrollZones(-1)}>←</button>
          <button type="button" className="btn btn-ghost btn-icon" aria-label="Следующая зона" onClick={() => scrollZones(1)}>→</button>
        </span>
      </div>

      <div
        ref={trackRef}
        id="zone-track"
        onPointerLeave={() => setHover(null)}
        style={{
          display: 'grid', gridAutoFlow: 'column', gridAutoColumns: 'minmax(300px, 34%)',
          gap: 'clamp(20px, 2.4vw, 32px)', overflowX: 'auto', scrollSnapType: 'x mandatory',
          // `overflow-x: auto` forces `overflow-y` to compute as `auto` too
          // (a CSS quirk — you can't mix auto+visible on the two axes), so
          // this track clips vertically as well. The hover lift below
          // (translateY(-16px) + scale(1.055)) needs room to breathe or its
          // top/bottom edges get guillotined by that clip — padding covers
          // it. (Horizontal bleed on the first/last card is handled via
          // transform-origin below instead of padding: padding on the
          // scroll axis gets silently absorbed by scroll-snap settling
          // scrollLeft to match it, so it never actually creates visible
          // slack — a real CSS quirk, not a typo.)
          scrollbarWidth: 'none', padding: '48px 0 36px',
        }}
      >
        {ZONES.map((z, i) => {
          const isHover = hover === i;
          const neighbourStyle = hover !== null && !isHover
            ? { transform: `translateX(${i < hover ? -30 : 30}px) scale(.955)`, zIndex: 1, opacity: 0.7 }
            : {};
          const activeStyle = isHover
            ? { transform: 'translateY(-16px) scale(1.055)', zIndex: 3, opacity: 1 }
            : {};
          // The first/last card grows from its outer edge instead of its
          // centre, so the hover scale only bleeds inward — toward the rest
          // of the deck — instead of outward past the track's clip. (The
          // original design's slight -1deg tilt is dropped here: rotating
          // around an off-centre origin swings the far corner out a few
          // more px, which is exactly the bleed this is trying to avoid.)
          const originX = i === 0 ? 'left' : i === ZONES.length - 1 ? 'right' : 'center';
          return (
            <Reveal key={z.id} as="div" variant="scale" index={i} step={90} style={{ scrollSnapAlign: 'start' }}>
              <article
                data-card=""
                onPointerEnter={() => setHover(i)}
                style={{
                  position: 'relative',
                  transformOrigin: `${originX} center`,
                  transition: 'transform .6s cubic-bezier(.2,.75,.2,1), opacity .4s ease',
                  willChange: 'transform',
                  ...neighbourStyle,
                  ...activeStyle,
                }}
              >
                <figure className="plate" style={{ margin: 0, overflow: 'hidden' }}>
                  <img src={z.img} alt={z.title} loading="lazy" style={{ width: '100%', aspectRatio: '3 / 4.6', objectFit: 'cover' }} />
                </figure>
                <div style={{ position: 'absolute', inset: 6, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(51, 53, 40, .92) 0%, rgba(64, 66, 51, .72) 40%, rgba(100, 102, 80, .38) 72%, rgba(100, 102, 80, .1) 100%)' }} />
                <div data-hslide="" style={{ position: 'absolute', left: 6, right: 6, top: 6, bottom: 6, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', padding: 24, pointerEvents: 'none', color: '#e1e3ce' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: 15, letterSpacing: '.14em', color: 'var(--color-accent-300)', fontFeatureSettings: "'tnum' 1", margin: 0 }}>{z.num}</p>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 29, lineHeight: 1.16, margin: '8px 0 0', color: '#f8f7e6' }}>{z.title}</h3>
                  <div
                    data-card-more=""
                    style={{
                      opacity: isHover ? 1 : 0, maxHeight: isHover ? 280 : 0, overflow: 'hidden',
                      transform: isHover ? 'none' : 'translateY(18px)',
                      transition: 'opacity .45s ease, transform .6s cubic-bezier(.2,.75,.2,1), max-height .6s cubic-bezier(.2,.75,.2,1)',
                    }}
                  >
                    <p style={{ fontSize: '14.5px', lineHeight: 1.62, margin: '14px 0 0', color: 'rgba(225,227,206,.9)' }}>{z.text}</p>
                    <p style={{ fontSize: '12.5px', letterSpacing: '.06em', textTransform: 'uppercase', fontFeatureSettings: "'tnum' 1", color: 'var(--color-accent-300)', margin: '14px 0 0', paddingTop: 12, borderTop: '1px solid rgba(225, 227, 206, .32)' }}>{z.meta}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
