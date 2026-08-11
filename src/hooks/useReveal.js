import { useEffect, useRef, useState } from 'react';

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Arms `visible=true` once the ref'd element scrolls into view. Powers the
 * <Reveal> component below, but usable standalone for one-off cases.
 */
export default function useReveal({ threshold = 0.16, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion()) { setVisible(true); return; }

    // Anything already on screen at mount reveals immediately rather than
    // waiting on the observer's first callback — IO's initial callback can
    // lag a frame or more behind mount (most noticeable when content is
    // revealed by a synchronous scroll jump rather than a natural scroll).
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      });
    }, { threshold, rootMargin });

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, visible];
}
