import { useEffect, useRef, useState } from 'react';

const fmt = (n) => Math.round(n).toLocaleString('ru-RU').replace(/ /g, ' ');

/**
 * Count-up number that animates from 0 to `target` once it scrolls into view.
 * Ported from the original `counters()` behaviour (data-count).
 */
export default function Counter({ target, suffix }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      const t0 = performance.now();
      const dur = 1100;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        setValue(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          io.disconnect();
          run();
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {fmt(value)}
      {suffix ? <span style={{ fontSize: '.5em', color: 'color-mix(in srgb, var(--color-text) 84%, transparent)' }}> {suffix}</span> : null}
    </span>
  );
}
