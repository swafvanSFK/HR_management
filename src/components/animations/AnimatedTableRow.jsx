/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Reusable AnimatedTableRow Component
   Framer Motion animated table row with staggered entrance,
   smooth hover state, and removal animation
   ══════════════════════════════════════════════════════════════ */

import { motion } from 'framer-motion';

/**
 * Reusable animated table row component for all HRMS tables
 * @param {number} index - Row index in list for staggered entry delay
 * @param {React.ReactNode} children - Table row cells (<td>s)
 * @param {string} className - Optional styling classes
 * @param {Function} onClick - Optional row click handler
 * @param {boolean} isSelected - Whether the row is selected
 * @param {number} staggerDelay - Stagger delay per row in seconds (default: 0.035)
 */
export default function AnimatedTableRow({
  index = 0,
  children,
  className = '',
  onClick,
  isSelected = false,
  staggerDelay = 0.035,
  ...props
}) {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.18 } }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index * staggerDelay, 0.4), // Cap max delay to 400ms for fast rendering
      }}
      whileHover={{
        backgroundColor: isSelected ? '#FEF6DF' : '#FAF9F5',
        transition: { duration: 0.15 },
      }}
      onClick={onClick}
      className={`transition-colors cursor-pointer select-none ${className}`}
      {...props}
    >
      {children}
    </motion.tr>
  );
}
