import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SITE } from '../../config/site.js';

// Keeps only the 10 significant digits of a Russian mobile number (strips a
// leading 7/8 country-code digit the user may type) and renders them as
// "+7 (999) 123-45-67" as they're entered.
function formatPhone(raw) {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('7') || digits.startsWith('8')) digits = digits.slice(1);
  digits = digits.slice(0, 10);

  let out = '+7';
  if (digits.length) out += ` (${digits.slice(0, 3)}`;
  if (digits.length >= 3) out += ')';
  if (digits.length > 3) out += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) out += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) out += `-${digits.slice(8, 10)}`;
  return out;
}

function phoneDigitCount(formatted) {
  const digits = formatted.replace(/\D/g, '').replace(/^7/, '');
  return digits.length;
}

const EMPTY_ERRORS = { name: '', phone: '', agree: '' };

const BENEFITS = [
  'Перезвоним в течение 15 минут',
  'Расскажем о планировках, сроках сдачи и условиях покупки',
  'Без спама — звонок только по вашему запросу',
];

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="4 13 10 19 20 6" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c1.1-3.6 4-5.4 7-5.4s5.9 1.8 7 5.4" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// — shared modal state ——————————————————————————————————————————————
// Every "book via Telegram" button on the site was replaced by this same
// callback form, so the open/close state lives once at the app root
// (CallbackModalProvider) and any component can trigger it via
// useCallbackModal()/<CallbackTrigger>, instead of each button owning a
// private copy of the modal.
const CallbackModalContext = createContext(null);

export function useCallbackModal() {
  const ctx = useContext(CallbackModalContext);
  if (!ctx) throw new Error('useCallbackModal must be used within a CallbackModalProvider');
  return ctx.open;
}

// Drop-in replacement for the old `<a href={SITE.tgLink}>` CTAs: same
// props/children, but opens the callback form instead of navigating out to
// Telegram. Defaults to rendering a <button>; pass `as="a"` if a call site
// truly needs anchor semantics.
export function CallbackTrigger({ as: Tag = 'button', className, children, ...rest }) {
  const open = useCallbackModal();
  return (
    <Tag className={className} type={Tag === 'button' ? 'button' : undefined} onClick={open} {...rest}>
      {children}
    </Tag>
  );
}

export default function CallbackModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(true);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [submitError, setSubmitError] = useState('');

  const titleId = useId();
  const nameId = useId();
  const phoneId = useId();
  const lastTriggerRef = useRef(null);
  const nameInputRef = useRef(null);
  const closeTimer = useRef(null);

  const mounted = open || leaving;

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 30);
    const onKeyDown = (e) => {
      if (e.key === 'Escape') requestClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function resetForm() {
    setName('');
    setPhone('');
    setAgree(true);
    setErrors(EMPTY_ERRORS);
    setStatus('idle');
    setSubmitError('');
  }

  function openModal(e) {
    lastTriggerRef.current = e?.currentTarget ?? null;
    window.clearTimeout(closeTimer.current);
    setLeaving(false);
    setOpen(true);
  }

  function requestClose() {
    if (status === 'submitting') return;
    setOpen(false);
    setLeaving(true);
    closeTimer.current = window.setTimeout(() => {
      setLeaving(false);
      resetForm();
      lastTriggerRef.current?.focus?.();
    }, 220);
  }

  function onBackdropMouseDown(e) {
    if (e.target === e.currentTarget) requestClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = { ...EMPTY_ERRORS };
    if (name.trim().length < 2) nextErrors.name = 'Введите имя';
    if (phoneDigitCount(phone) < 10) nextErrors.phone = 'Введите номер целиком';
    if (!agree) nextErrors.agree = 'Нужно согласие на обработку данных';

    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone || nextErrors.agree) return;

    setSubmitError('');
    setStatus('submitting');
    try {
      // Forwarded server-side (server/server.js) to realty.experta@yandex.ru
      // by email — the SMTP password lives there, never in this bundle.
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone }),
      });
      if (!res.ok) throw new Error(`request failed: ${res.status}`);
      setStatus('success');
    } catch (err) {
      console.error('[CallbackForm] submit failed:', err);
      setStatus('idle');
      setSubmitError(`Не получилось отправить заявку. Позвоните нам: ${SITE.phone}`);
    }
  }

  return (
    <CallbackModalContext.Provider value={{ open: openModal }}>
      {children}

      {mounted && createPortal(
        <div
          className={`callback-overlay${leaving ? ' is-leaving' : ''}`}
          onMouseDown={onBackdropMouseDown}
        >
          <div
            className="callback-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <button type="button" className="callback-close" aria-label="Закрыть" onClick={requestClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>

            <div className="callback-visual">
              <img className="ken-burns" src="/assets/kommercia.webp" alt="Терраса с кафе и магазинами на первых этажах квартала «Нагория»" loading="lazy" />
              <div className="callback-visual-content">
                <span className="callback-visual-eyebrow">ЖК «Нагория»</span>
                <p className="callback-visual-quote">Курорт становится стилем жизни</p>
                <ul className="callback-benefits">
                  {BENEFITS.map((b) => (
                    <li key={b}><CheckIcon />{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="callback-form-col">
              {status === 'success' ? (
                <div className="callback-success">
                  <div className="callback-success-header">
                    <div className="callback-success-icon">
                      <CheckIcon />
                    </div>
                    <h3 className="callback-title">Заявка отправлена</h3>
                  </div>
                  <p className="callback-subtitle">
                    Спасибо, {name.trim().split(/\s+/)[0]}! Перезвоним по номеру {phone} в ближайшее время —
                    по будням с 09:00 до 21:00.
                  </p>
                  <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 22 }} onClick={requestClose}>
                    Готово
                  </button>
                </div>
              ) : (
                <>
                  <div className="callback-header">
                    <div className="callback-icon" aria-hidden="true">
                      <PhoneIcon />
                    </div>
                    <div>
                      <span className="callback-eyebrow">Обратная связь</span>
                      <h3 id={titleId} className="callback-title">Заказать обратный звонок</h3>
                    </div>
                  </div>
                  <p className="callback-subtitle">
                    Оставьте имя и телефон — менеджер «Нагории» перезвонит и ответит на вопросы о квартале.
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className={`callback-field${errors.name ? ' has-error' : ''}`}>
                      <input
                        ref={nameInputRef}
                        id={nameId}
                        type="text"
                        autoComplete="name"
                        placeholder="Имя"
                        aria-label="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? `${nameId}-error` : undefined}
                      />
                      <span className="callback-field-icon"><UserIcon /></span>
                      {errors.name && <span id={`${nameId}-error`} className="callback-error">{errors.name}</span>}
                    </div>

                    <div className={`callback-field${errors.phone ? ' has-error' : ''}`}>
                      <input
                        id={phoneId}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="Телефон"
                        aria-label="Телефон"
                        value={phone}
                        onFocus={() => { if (!phone) setPhone('+7 '); }}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
                      />
                      <span className="callback-field-icon"><PhoneIcon /></span>
                      {errors.phone && <span id={`${phoneId}-error`} className="callback-error">{errors.phone}</span>}
                    </div>

                    <label className={`callback-check${errors.agree ? ' has-error' : ''}`}>
                      <input
                        type="checkbox"
                        className="callback-check-input"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        aria-describedby={errors.agree ? 'callback-agree-error' : undefined}
                      />
                      <span className="callback-check-box" aria-hidden="true">
                        <CheckIcon strokeWidth="3" />
                      </span>
                      <span className="callback-check-text">
                        Согласен на обработку персональных данных и принимаю{' '}
                        <a href={SITE.privacyUrl} target="_blank" rel="noopener noreferrer">
                          политику конфиденциальности
                        </a>
                      </span>
                    </label>
                    {errors.agree && <span className="callback-error" style={{ marginTop: 4, marginLeft: 30 }}>{errors.agree}</span>}

                    <button type="submit" className="btn btn-block callback-submit" disabled={status === 'submitting'}>
                      {status === 'submitting' ? (
                        <>
                          <span className="callback-spinner" aria-hidden="true" />
                          Отправляем…
                        </>
                      ) : 'Заказать звонок'}
                    </button>
                    {submitError && <p className="callback-error" style={{ marginTop: 12 }}>{submitError}</p>}
                    <p className="callback-note">Нажимая «Заказать звонок», вы соглашаетесь на связь по указанному номеру.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </CallbackModalContext.Provider>
  );
}
