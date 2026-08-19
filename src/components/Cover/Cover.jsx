// Full-screen entry cover — the very first thing visitors see, before the
// nav/hero content. Deliberately minimal: full-bleed photo, one centered
// line of type, one small "scroll down" cue in the corner.
export default function Cover() {
  return (
    <section
      role="img"
      aria-label="Обложка: панорама квартала «ЖК Нагория» на фоне гор Кавказских Минеральных Вод"
      className="cover-screen"
      style={{ position: 'relative' }}
    >

      {/* The photo lives on its own layer, deliberately sized taller than
          the section itself (extends 40px past every edge). This section's
          own box has measured 100% correct in every check (computed style,
          getBoundingClientRect) yet still paints a hairline short at the
          bottom on some displays/zoom levels — a rasterization quirk tied
          to this specific element, not fixable by styling the section's
          own background. Giving the photo a separate, deliberately
          oversized box sidesteps it entirely: this div's *own* render has
          40px of slack in every direction, so even if browser painted
          it 40px is buffer against a plain few-pixel shortfall. */}
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
    </section>
  );
}
