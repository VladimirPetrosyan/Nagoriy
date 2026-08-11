import { useEffect, useRef } from 'react';

/**
 * Thin fixed progress bar pinned to the very top of the viewport, filling
 * left-to-right with overall scroll depth. Cheap: one rAF-throttled scroll
 * listener, no re-renders (writes directly to the DOM via a ref).
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 30, background: 'transparent', pointerEvents: 'none' }}>
      <div
        ref={barRef}
        style={{
          height: '100%', width: '100%', transformOrigin: '0 50%', transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, var(--color-accent-800, #4a4d36), var(--color-accent-300, #d9de92))',
          transition: 'transform .08s linear',
        }}
      />
    </div>
  );
}
