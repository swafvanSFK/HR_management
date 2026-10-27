/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Reusable ApprovalCheckButton Component
   Celebratory spreading yellow & white particle burst animation
   as seen in reference video frame 13
   ══════════════════════════════════════════════════════════════ */

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// 12-dot yellow & white celebratory burst particles matching reference video frame 13
export const burstParticles = [
  { x: 26, y: -8, color: '#F4C542', size: 6, delay: 0 },
  { x: 20, y: 18, color: '#FFFFFF', size: 5, delay: 0.02 },
  { x: -18, y: -20, color: '#F4C542', size: 6, delay: 0.01 },
  { x: -24, y: 12, color: '#FFFFFF', size: 5, delay: 0.03 },
  { x: 8, y: -26, color: '#FEF08A', size: 4.5, delay: 0.02 },
  { x: 10, y: 26, color: '#F4C542', size: 5.5, delay: 0.01 },
  { x: -12, y: 24, color: '#FFFFFF', size: 4, delay: 0.04 },
  { x: -28, y: -8, color: '#F4C542', size: 5, delay: 0.02 },
  { x: 28, y: 10, color: '#FEF08A', size: 5, delay: 0.03 },
  { x: 0, y: -28, color: '#FFFFFF', size: 5.5, delay: 0.01 },
  { x: 16, y: -22, color: '#F4C542', size: 4, delay: 0.02 },
  { x: -20, y: 20, color: '#FEF08A', size: 4.5, delay: 0.03 },
];

/**
 * Reusable Approval Checkmark Button with Spreading Yellow & White Particles
 * @param {Function} onClick - Click handler (usually triggers approval flow)
 * @param {boolean} isActive - Whether the button is actively playing the burst animation
 * @param {number} size - Button diameter in px (default: 32)
 * @param {number} iconSize - Check icon size in px (default: 14)
 * @param {string} title - Button tooltip text (default: "Approve")
 * @param {boolean} disabled - Whether the button is disabled
 * @param {string} className - Optional container styling classes
 */
export default function ApprovalCheckButton({
  onClick,
  isActive = false,
  size = 32,
  iconSize = 14,
  title = 'Approve',
  disabled = false,
  className = '',
}) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {isActive && (
        <>
          {/* Spreading Golden Ripple Ring */}
          <motion.span
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.48, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border-2 border-gold pointer-events-none"
          />

          {/* Spreading White Ripple Ring */}
          <motion.span
            initial={{ scale: 0.6, opacity: 0.8 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 0.52, ease: 'easeOut', delay: 0.05 }}
            className="absolute inset-0 rounded-full border border-white pointer-events-none"
          />

          {/* Spreading Yellow & White Circular Burst Particles */}
          {burstParticles.map((p, i) => (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: p.x * 1.35,
                y: p.y * 1.35,
                scale: [0, 1.4, 0],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 0.48,
                ease: [0.16, 1, 0.3, 1],
                delay: p.delay,
              }}
              className="absolute rounded-full pointer-events-none z-30"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow:
                  p.color === '#FFFFFF'
                    ? '0 0 6px rgba(255,255,255,0.9)'
                    : '0 0 8px rgba(244, 197, 66, 0.85)',
              }}
            />
          ))}
        </>
      )}

      <motion.button
        onClick={onClick}
        animate={
          isActive
            ? {
                scale: [1, 1.25, 0.95, 1],
                backgroundColor: '#F4C542',
                color: '#1C1B18',
                boxShadow: '0 0 18px rgba(244, 197, 66, 0.7)',
              }
            : {}
        }
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: size, height: size }}
        className={`rounded-full flex items-center justify-center transition-colors shadow-xs cursor-pointer relative z-20 ${
          isActive
            ? 'bg-gold text-charcoal'
            : 'bg-[#1C1B18] text-white hover:bg-gold hover:text-charcoal'
        }`}
        title={title}
        disabled={disabled || isActive}
      >
        <Check size={iconSize} strokeWidth={isActive ? 3 : 2.5} />
      </motion.button>
    </div>
  );
}
