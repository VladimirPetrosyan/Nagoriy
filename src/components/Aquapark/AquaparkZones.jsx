import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ZONES } from './zoneData.js';
import Reveal from '../common/Reveal.jsx';

/**
 * Plain slider of five zone cards — drag/swipe or use the arrows to move
 * between them, the card currently in focus shows its full text. No hover
 * push/scale effects and no separate mobile/desktop code paths: embla
 * measures real card widths and handles drag + snap itself, so the same
 * markup just works on mouse and touch alike. Card width is set in CSS
 * (clamp/vw), so it naturally shows one big card on phones and a few on
 * desktop without any device detection.
 *
 * `containScroll: 'keepSnaps'` (not the default 'trimSnaps') matters here:
 * `isActive` below matches a card to the carousel by array index === snap
 * index, which only holds if every slide gets its own snap point.
 * 'trimSnaps' merges nearby slides into shared snap points on wide
 * viewports (whenever more than one card fits at once) — on desktop that
 * collapsed 5 slides down to 4 stops, so the last card's index never
 * matched `selected` and its text could never activate. 'keepSnaps' still
 * stops the carousel from scrolling past the first/last card, just without
 * merging any of them.
 *
 * The focus/dim/text effects below are pure CSS (opacity, scale, transition)
 * layered on top of the already-working scroll mechanics — they never touch
 * the flex-basis/track sizing embla measures, so they can't reintroduce the
 * old bugs.
 */
export default function AquaparkZones() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'keepSnaps' });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback((api) => setSelected(api.selectedScrollSnap()), []);

  useEffect(() => {
    if (!emblaApi) return undefined;
    onSelect(emblaApi);
    emblaApi.on('select', onSelect).on('reInit', onSelect);
    return () => emblaApi.off('select', onSelect).off('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20, margin: 'clamp(40px, 5vw, 64px) 0 20px' }}>
        <span style={{ fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--color-text) 84%, transparent)' }}>
          Пять зон · листайте вбок
        </span>
        <span style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button type="button" className="btn btn-ghost btn-icon" aria-label="Предыдущая зона" onClick={() => emblaApi?.scrollPrev()}>←</button>
          <button type="button" className="btn btn-ghost btn-icon" aria-label="Следующая зона" onClick={() => emblaApi?.scrollNext()}>→</button>
        </span>
      </div>

      <div ref={emblaRef} data-embla-viewport="" style={{ overflow: 'hidden', padding: '48px 0 36px' }}>
        <div style={{ display: 'flex', gap: 'clamp(20px, 2.4vw, 32px)' }}>
          {ZONES.map((z, i) => {
            const isActive = i === selected;
            return (
              <Reveal
                key={z.id}
                as="div"
                variant="up"
                index={i}
                step={90}
                style={{ flex: '0 0 clamp(260px, 78vw, 400px)', minWidth: 0 }}
              >
                <article
                  data-card=""
                  style={{
                    position: 'relative',
                    opacity: isActive ? 1 : 0.55,
                    transform: isActive ? 'scale(1)' : 'scale(0.94)',
                    transition: 'opacity .5s ease, transform .5s cubic-bezier(.2,.75,.2,1)',
                  }}
                >
                  <figure className="plate" style={{ margin: 0, overflow: 'hidden' }}>
                    <img src={z.img} alt={z.title} loading="lazy" style={{ width: '100%', aspectRatio: '3 / 4.6', objectFit: 'cover' }} />
                  </figure>
                  <div style={{ position: 'absolute', inset: 6, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(51, 53, 40, .92) 0%, rgba(64, 66, 51, .72) 40%, rgba(100, 102, 80, .38) 72%, rgba(100, 102, 80, .1) 100%)' }} />
                  <div style={{ position: 'absolute', left: 6, right: 6, top: 6, bottom: 6, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', padding: 24, pointerEvents: 'none', color: '#e1e3ce' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: 15, letterSpacing: '.14em', color: 'var(--color-accent-300)', fontFeatureSettings: "'tnum' 1", margin: 0 }}>{z.num}</p>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 29, lineHeight: 1.16, margin: '8px 0 0', color: '#f8f7e6' }}>{z.title}</h3>
                    <div
                      style={{
                        opacity: isActive ? 1 : 0,
                        maxHeight: isActive ? 280 : 0,
                        overflow: 'hidden',
                        transform: isActive ? 'none' : 'translateY(14px)',
                        transition: 'opacity .45s ease, transform .5s cubic-bezier(.2,.75,.2,1), max-height .5s cubic-bezier(.2,.75,.2,1)',
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
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 9 }}>
        {ZONES.map((z, i) => (
          <button
            key={z.id}
            type="button"
            aria-label={`Перейти к зоне «${z.title}»`}
            aria-current={i === selected}
            onClick={() => emblaApi?.scrollTo(i)}
            style={{
              width: i === selected ? 24 : 7, height: 7, borderRadius: 4, padding: 0, border: 'none',
              background: i === selected ? 'var(--color-accent)' : 'var(--color-divider)',
              cursor: 'pointer', transition: 'width .35s cubic-bezier(.2,.75,.2,1), background .35s ease',
            }}
          />
        ))}
      </div>
    </>
  );
}
