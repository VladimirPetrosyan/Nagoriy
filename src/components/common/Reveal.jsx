import useReveal from '../../hooks/useReveal.js';

/**
 * Generic scroll-reveal wrapper. Renders as `as` (default "div"), toggles
 * `.is-visible` once it scrolls into view, and supports index-based stagger
 * so siblings in a grid/list cascade in one after another.
 *
 * variant: 'up' | 'fade' | 'scale' | 'left' | 'right' | 'blur' | 'tracking'
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  index,
  step = 70,
  maxDelay = 460,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, visible] = useReveal();
  const computedDelay = delay || (index != null ? Math.min(index * step, maxDelay) : 0);

  return (
    <Tag
      ref={ref}
      className={['reveal', `reveal-${variant}`, visible ? 'is-visible' : '', className].filter(Boolean).join(' ')}
      style={{ ...style, transitionDelay: visible && computedDelay ? `${computedDelay}ms` : undefined }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
