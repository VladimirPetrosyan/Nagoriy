import Reveal from '../common/Reveal.jsx';

/**
 * Full-bleed photo band with an optional caption card, floated bottom-left.
 * Used for the "Первый квартал" / "Генплан" / "Аквапарк" bands.
 *
 * The scale-in reveal lives on a wrapper div (not the <img> itself) because
 * the <img> already animates `transform` continuously for the scroll
 * parallax (data-para) — stacking a CSS transition for the same property
 * on the same element would fight the running animation.
 *
 * Pass either:
 *  - `height` (default): a fixed band height, image cropped via object-fit
 *    cover + a slow scroll parallax (data-para) that pans/zooms slightly —
 *    right for wide backdrop shots where losing some edge is fine.
 *  - `ratio` (+ optional `maxHeight`): an aspect-ratio string ("1024/810")
 *    matching the source photo's own proportions. The band's height then
 *    follows the image at full width, so cover crops nothing — until
 *    `maxHeight` kicks in on short viewports, at which point it crops just
 *    like the fixed-height mode (an explicit, deliberate trade-off, not the
 *    accidental one below).
 *
 *    This is deliberately built as `height: min(maxHeight, calc(100vw *
 *    ratio))` rather than the `aspect-ratio` CSS property + `max-height`.
 *    That combination makes the browser shrink the box's *width* too (CSS's
 *    "transferred size" rule for aspect-ratio boxes), which quietly breaks
 *    full-bleed layout on short viewports. calc() against 100vw sidesteps
 *    it entirely — width stays a plain block-level 100%, untouched.
 */
export default function ImageBand({ src, alt, eyebrow, text, height = 'min(78vh, 700px)', ratio, maxHeight = '90vh', marginTop = 'clamp(48px, 6vw, 88px)' }) {
  let bandHeight = height;
  if (ratio) {
    const [w, h] = ratio.split('/').map(Number);
    bandHeight = `min(${maxHeight}, calc(100vw * ${h} / ${w}))`;
  }

  return (
    <figure style={{ margin: `${marginTop} 0 0`, position: 'relative', overflow: 'hidden', height: bandHeight }}>
      <Reveal variant="scale" style={{ position: 'absolute', inset: 0 }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          {...(ratio ? {} : { 'data-para': '' })}
          style={{ height: '100%', objectFit: 'cover' }}
        />
      </Reveal>
      {text ? (
        <figcaption
          data-reveal-2=""
          style={{
            position: 'absolute', left: 'max(20px, calc(50% - 600px + clamp(20px, 5vw, 72px)))',
            bottom: 'clamp(20px, 4vw, 48px)', width: 'min(460px, 66vw)',
            background: 'color-mix(in srgb, var(--color-bg) 92%, transparent)',
            border: '1px solid var(--color-divider)', padding: '22px 26px',
          }}
        >
          <span style={{ display: 'block', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-accent-800, #4a4d36)' }}>
            {eyebrow}
          </span>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.24, margin: '10px 0 0', color: 'var(--color-text)' }}>
            {text}
          </p>
        </figcaption>
      ) : null}
    </figure>
  );
}
