/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Animated Page Wrapper
   Smooth fade-in-up transition for route changes
   ══════════════════════════════════════════════════════════════ */

import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

const PageTransition = ({ children, className = '' }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default PageTransition;
