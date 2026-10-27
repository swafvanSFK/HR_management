/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Reusable MotionCount Component
   Framer Motion 60/120fps numeric count-up animation
   ══════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

/**
 * Animated number counter component using Framer Motion
 * @param {number} to - Target number to count up to
 * @param {number} from - Starting number (default: 0)
 * @param {number} duration - Animation duration in seconds (default: 1.2)
 * @param {number} decimals - Number of decimal places (default: 0)
 * @param {string} prefix - Prefix string like '$'
 * @param {string} suffix - Suffix string like '%' or 'K'
 * @param {string} className - Optional styling classes
 */
export default function MotionCount({
  to,
  from = 0,
  duration = 1.2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate(value) {
        const formatted =
          decimals > 0
            ? value.toFixed(decimals)
            : Math.round(value).toLocaleString();
        node.textContent = `${prefix}${formatted}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [to, from, duration, decimals, prefix, suffix]);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}
      {decimals > 0 ? from.toFixed(decimals) : from}
      {suffix}
    </span>
  );
}
