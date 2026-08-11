import { useEffect, useRef, useState } from 'react';

/**
 * Arms a "draw" flag once the given element scrolls into view — used to
 * trigger the stroke-dashoffset animation on the circled-parking SVG.
 * Ported from the original `wireCircle()` behaviour (data-circle).
 */
export default function useDrawOnView(threshold = 0.6) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          io.disconnect();
          setTimeout(() => setDrawn(true), 260);
        }
      });
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, drawn];
}
