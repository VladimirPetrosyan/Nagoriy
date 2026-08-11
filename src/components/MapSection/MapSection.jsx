import { useEffect, useRef, useState } from 'react';
import { STEPS, DOTS } from './mapData.js';

// Region of the 2752×1536 genplan image that must stay visible & centered,
// expressed as fractions of the image. Ported 1:1 from fitMap()'s constants.
const AR = 2752 / 1536;
const X0 = 0.442, X1 = 0.87, Y0 = 0.34, Y1 = 0.865;
const BAND = Y1 - Y0;

export default function MapSection() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const stageRef = useRef(null);
  const topBarRef = useRef(null);
  const copyRef = useRef(null);

  const [step, setStep] = useState(0);
  const [copyVisible, setCopyVisible] = useState(true);
  const [displayStep, setDisplayStep] = useState(0);

  // Delay the copy swap slightly so the outgoing text can fade before the
  // incoming one appears — mirrors the original's 180ms crossfade.
  useEffect(() => {
    setCopyVisible(false);
    const t = setTimeout(() => {
      setDisplayStep(step);
      setCopyVisible(true);
    }, 180);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    const fitMap = () => {
      const sticky = stickyRef.current;
      const stage = stageRef.current;
      const topBar = topBarRef.current;
      const copy = copyRef.current;
      const nav = document.querySelector('.nav');
      if (!sticky || !stage) return;
      if (nav && topBar) topBar.style.paddingTop = nav.offsetHeight + 14 + 'px';
      const bw = sticky.clientWidth, bh = sticky.clientHeight;
      if (!bw || !bh) return;
      const safeTop = topBar ? topBar.offsetHeight : 0;
      const safeBottom = copy ? copy.offsetHeight + 24 : 0;
      const room = Math.max(120, bh - safeTop - safeBottom - 34);
      let h = Math.max(bh, bw / AR);
      if (BAND * h > room) h = room / BAND;
      let w = h * AR;
      if (w < bw) { w = bw; h = w / AR; }
      const padX = Math.min(90, bw * 0.06);
      const maxW = (bw - 2 * padX) / (X1 - X0);
      if (w > maxW && maxW > bw) { w = maxW; h = w / AR; }
      const yFree = safeTop + 17 + (room - BAND * h) / 2;
      let y = yFree - Y0 * h;
      y = h >= bh ? Math.min(0, Math.max(bh - h, y)) : Math.min(bh - h, Math.max(0, y));
      let x = (bw - w) / 2;
      if (w > bw) x = Math.min(0, Math.max(bw - w, bw / 2 - ((X0 + X1) / 2) * w));
      stage.style.width = w + 'px';
      stage.style.height = h + 'px';
      stage.style.left = x + 'px';
      stage.style.top = y + 'px';
    };

    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec || !sec.isConnected) return;
      const denom = sec.offsetHeight - window.innerHeight;
      let p = denom > 0 ? -sec.getBoundingClientRect().top / denom : 0;
      p = Math.max(0, Math.min(0.9999, p));
      setStep(Math.floor(p * STEPS.length));
    };

    fitMap();
    onScroll();
    const t = setTimeout(fitMap, 150);

    let ticking = false;
    const scrollHandler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { onScroll(); ticking = false; });
    };
    const resizeHandler = () => { fitMap(); onScroll(); };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', resizeHandler, { passive: true });

    let ro;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(fitMap);
      [stickyRef.current, topBarRef.current, copyRef.current].forEach((el) => el && ro.observe(el));
    }

    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
      if (ro) ro.disconnect();
    };
  }, []);

  const jump = (i) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const denom = sec.offsetHeight - window.innerHeight;
    const top = window.scrollY + sec.getBoundingClientRect().top;
    window.scrollTo({ top: top + denom * ((i + 0.4) / STEPS.length), behavior: 'smooth' });
  };

  const active = STEPS[displayStep];

  return (
    <section id="karta" data-mapscroll="" ref={sectionRef} style={{ position: 'relative', height: '480vh', background: 'var(--color-accent-900)' }}>
      <div ref={stickyRef} style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--color-accent-900)' }}>
        <div
          ref={stageRef}
          data-map-stage=""
          style={{
            position: 'absolute', left: 0, top: 0, width: '100%', aspectRatio: '2752 / 1536',
            background: 'url(/assets/genplan-top.jpg) center center / cover no-repeat',
          }}
        >
          <div data-dots="" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
            {DOTS.map((d, i) => (
              <button
                key={i}
                type="button"
                data-dot={d.step}
                data-side={d.side}
                aria-label={STEPS[d.step].label}
                {...(step === d.step ? { 'data-active': '' } : {})}
                style={{ '--c': STEPS[d.step].color, left: d.left, top: d.top }}
                onClick={() => jump(d.step)}
                onPointerOver={() => setStep(d.step)}
              >
                <span className="dot-label">{STEPS[d.step].label}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          ref={topBarRef}
          data-map-top=""
          style={{
            position: 'absolute', left: 0, right: 0, top: 0, padding: '92px clamp(20px, 4vw, 56px) clamp(14px, 2.2vh, 22px)',
            display: 'flex', alignItems: 'baseline', gap: '12px 18px', flexWrap: 'wrap',
            background: 'linear-gradient(rgba(38, 40, 26, 0.9) 0%, rgba(38, 40, 26, 0.7) 64%, rgba(38, 40, 26, 0) 100%)',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: '#eef3a0', textShadow: '0 1px 12px rgba(18,20,10,.7)' }}>
            Генплан · 150 га
          </span>
          <span data-map-sub="" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(16px, 1.5vw, 22px)', color: '#f8f7e6', textShadow: '0 1px 14px rgba(18,20,10,.75)' }}>
            Пять точек притяжения внутри района
          </span>
          <div data-steps="" style={{ display: 'flex', flexWrap: 'wrap', gap: 7, width: '100%', pointerEvents: 'auto' }}>
            {STEPS.map((s, i) => (
              <button
                key={s.key}
                type="button"
                data-step-tab={i}
                {...(step === i ? { 'data-active': '' } : {})}
                onClick={() => jump(i)}
                onPointerOver={() => setStep(i)}
                style={{
                  font: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'none', padding: '7px 15px 7px 12px', border: '1px solid rgba(248,247,230,.55)',
                  borderRadius: 999, color: '#f8f7e6', fontSize: '12.5px', letterSpacing: '.04em',
                  whiteSpace: 'nowrap', textShadow: '0 1px 8px rgba(18,20,10,.6)',
                }}
              >
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: s.color, flex: '0 0 auto' }} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={copyRef}
          data-map-bottom=""
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            padding: 'clamp(14px, 2.2vh, 22px) clamp(20px, 4vw, 56px) clamp(14px, 2.2vh, 24px)',
            background: 'linear-gradient(to top, rgba(38,40,26,.97) 0%, rgba(38,40,26,.92) 60%, rgba(38,40,26,.55) 88%, rgba(38,40,26,0) 100%)',
          }}
        >
          <div data-map-copy="" style={{ maxWidth: 660 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px clamp(14px, 2vw, 26px)' }}>
              <span
                data-map-index=""
                style={{
                  fontFamily: 'var(--font-heading)', fontSize: 'clamp(14px, 1.3vw, 17px)', letterSpacing: '.12em',
                  color: '#eef3a0', fontFeatureSettings: "'tnum' 1",
                  transition: 'opacity .25s ease, transform .25s ease',
                  opacity: copyVisible ? 1 : 0, transform: copyVisible ? 'none' : 'translateY(8px)',
                }}
              >
                {('0' + (displayStep + 1)).slice(-2)} / 0{STEPS.length}
              </span>
              <h3
                data-map-title=""
                style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(22px, 2.2vw, 32px)', lineHeight: 1.15,
                  height: '1.15em', margin: 0, color: '#f8f7e6', overflow: 'hidden',
                  transition: 'opacity .25s ease, transform .25s ease',
                  opacity: copyVisible ? 1 : 0, transform: copyVisible ? 'none' : 'translateY(8px)',
                }}
              >
                {active.label}
              </h3>
              <p
                data-map-text=""
                style={{
                  flex: '1 1 100%', fontSize: 'clamp(13.5px, 1.15vw, 15.5px)', lineHeight: 1.45,
                  margin: '2px 0 0', color: 'rgba(248,247,230,.92)',
                  transition: 'opacity .25s ease, transform .25s ease',
                  opacity: copyVisible ? 1 : 0, transform: copyVisible ? 'none' : 'translateY(8px)',
                }}
              >
                {active.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
