import { useEffect, useState } from 'react';

// `window.innerHeight` is always a whole number (browsers round it for this
// API); CSS `100vh` is computed internally against a more precise value
// (can be fractional — e.g. innerHeight reports 667 while the engine's own
// viewport metric is 667.2px). That mismatch is invisible to JS box-model
// checks (everything measures "correct") but can show up as a hairline
// rendering seam where this section meets the next one. Computing the
// height in JS from `innerHeight` and setting it as a plain integer pixel
// value sidesteps the whole class of bug — no fractional CSS length
// involved at all.
function useViewportHeightPx() {
  const [vh, setVh] = useState(() => (typeof window !== 'undefined' ? window.innerHeight : 800));
  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);
  return vh;
}

// Tracks whether the page is still scrolled near the very top — used to
// show/hide the patch strip below (see its own comment for why it exists).
// It only needs to be visible while Cover's bottom edge could plausibly
// still be at/near the viewport's bottom edge, i.e. within the first
// screen's height of scrolling.
function useIsNearTop(thresholdPx) {
  const [nearTop, setNearTop] = useState(true);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      setNearTop(window.scrollY < thresholdPx);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [thresholdPx]);
  return nearTop;
}

// Full-screen entry cover — the very first thing visitors see, before the
// nav/hero content. Deliberately minimal: full-bleed photo, one centered
// line of type, one small "scroll down" cue in the corner.
export default function Cover() {
  const vh = useViewportHeightPx();
  const nearTop = useIsNearTop(vh);
  // +30px buffer so the section is always a hair taller than the viewport
  // (never a risk of falling short), on top of the JS-integer height fix
  // above.
  const sectionHeight = vh + 30;

  return (
    <section
      role="img"
      aria-label="Обложка: панорама квартала «ЖК Нагория» на фоне гор Кавказских Минеральных Вод"
      className="cover-screen"
      style={{ position: 'relative', height: sectionHeight, minHeight: 460 }}
    >

      {/* The photo lives on its own layer, deliberately sized taller than
          the section itself (extends 40px past every edge) as further
          insurance against the same class of rounding seam. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: -40, left: -40, right: -40, bottom: -40,
          backgroundColor: 'var(--color-accent-900, #2e3022)',
          backgroundImage: 'url(/assets/nagoriya-cover.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Base scrim across the whole photo — enough to keep it a photo, not
          a black box, while still guaranteeing the center band (where the
          title sits) is dark enough regardless of what's behind it (light
          sky, pale building facades near-matching the title color, etc). */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(8,9,6,.46) 0%, rgba(8,9,6,.22) 28%, rgba(8,9,6,.36) 55%, rgba(8,9,6,.56) 100%)',
        }}
      />
      {/* Soft vignette focused right behind the title, so it reads clearly
          no matter which part of the photo lands under it. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          width: 'min(94vw, 1500px)', height: '52%',
          background: 'radial-gradient(ellipse at center, rgba(6,7,4,.5) 0%, rgba(6,7,4,.22) 55%, rgba(6,7,4,0) 78%)',
        }}
      />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <span style={{ display: 'block', fontSize: 13, letterSpacing: '.32em', textTransform: 'uppercase', color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,.6)', marginBottom: 20 }}>
          Железноводск
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(46px, 9vw, 128px)', lineHeight: 1, letterSpacing: '.01em', color: '#ffffff', margin: 0, textShadow: '0 4px 16px rgba(0,0,0,.55), 0 1px 4px rgba(0,0,0,.7)' }}>
          ЖК Нагория
        </h1>
      </div>

      <a href="#nachalo" className="cover-scroll-hint">
        <span>Листайте ниже</span>
        <svg className="cover-scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 4v15M5 12l7 7 7-7" />
        </svg>
      </a>

      {/* Patch strip for a persistent hairline rendering seam right at the
          viewport's bottom edge, reproduced on several displays. This is
          NOT a layout bug — box model, computed style and
          getBoundingClientRect all measure a perfect 0-gap fit every time,
          and changing what sits *behind* the seam (background-color on the
          section, on the photo layer, on a dedicated element in front of
          or behind the page, absolutely or fixed positioned, with or
          without z-index) never affected it. The ONLY thing that has
          reliably masked it in testing is `position: fixed` + `inset` (not
          explicit top/height) + a very high z-index — so that's exactly
          what this replicates, deliberately, even though it looks like
          overkill for a 20px strip.

          `position: fixed` pins it to the *viewport* bottom (where the
          seam actually is) rather than the document position — correct
          for the exact spot, but it doesn't scroll away with the page like
          the rest of Cover would, so `nearTop` (true only within one
          screen height of scroll) hides it once the visitor has scrolled
          past Cover, so it can't float over Hero/District/etc. below. */}
      {nearTop && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed', left: 0, right: 0, bottom: 0, top: 'auto', height: 20,
            background: 'var(--color-accent-900, #2e3022)',
            pointerEvents: 'none',
            zIndex: 2147483647,
          }}
        />
      )}
    </section>
  );
}
