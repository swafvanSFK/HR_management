/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Reusable AnimatedProgressBar Component
   Framer Motion animated progress bar with single or multi-segment support
   ══════════════════════════════════════════════════════════════ */

import { motion } from 'framer-motion';

/**
 * Animated Progress Bar Component using Framer Motion
 * @param {number} value - Single percentage (0 to 100)
 * @param {string} color - Background color (e.g. '#1C1B18' or '#F4C542')
 * @param {Array<{ value: number, color: string, title?: string }>} segments - Optional multi-segment array
 * @param {string} bgTrack - Track background color (default: '#F3F0E6')
 * @param {number|string} height - Height in px or tailwind class (default: 'h-2')
 * @param {number} duration - Animation duration in seconds (default: 1.1)
 * @param {number} delay - Animation delay in seconds (default: 0.15)
 * @param {string} className - Optional container styling classes
 */
export default function AnimatedProgressBar({
  value,
  color = '#1C1B18',
  segments,
  bgTrack = 'bg-cream',
  height = 'h-2',
  duration = 1.1,
  delay = 0.15,
  className = '',
}) {
  // Multi-segment progress bar mode
  if (segments && segments.length > 0) {
    return (
      <div
        className={`${height} rounded-full ${bgTrack} overflow-hidden flex ${className}`}
      >
        {segments.map((seg, idx) => (
          <motion.div
            key={idx}
            initial={{ width: 0 }}
            animate={{ width: `${seg.value}%` }}
            transition={{
              duration,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + idx * 0.08,
            }}
            className="h-full hover:opacity-85 transition-opacity"
            style={{ background: seg.color }}
            title={seg.title || `${seg.value}%`}
          />
        ))}
      </div>
    );
  }

  // Single progress bar mode
  return (
    <div
      className={`${height} rounded-full ${bgTrack} overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(Math.max(value || 0, 0), 100)}%` }}
        transition={{
          duration,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}
