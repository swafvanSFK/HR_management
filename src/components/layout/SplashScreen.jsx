/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Splash Screen
   Animated brand reveal on warm ivory gradient
   ══════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const SplashScreen = ({ onComplete }) => {
  const logoRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 200);
      },
    });

    tl.fromTo(
      dotRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    )
      .fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      )
      .to({}, { duration: 0.8 })
      .to([logoRef.current, dotRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
        stagger: 0.05,
      });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <motion.div
      className="splash-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Logo mark – half-circle + circle */}
        <div ref={dotRef} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <div
            style={{
              width: 20,
              height: 40,
              borderRadius: '20px 0 0 20px',
              background: '#20201E',
            }}
          />
          <div
            style={{
              width: 20,
              height: 40,
              borderRadius: '0 20px 20px 0',
              background: '#F4C542',
            }}
          />
        </div>
        <span ref={logoRef} className="splash-logo">
          NovaPulse
        </span>
      </div>
      <motion.p
        className="splash-tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        People ops, in motion.
      </motion.p>
      <motion.p
        className="splash-tech"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        HR Dashboard · React · Tailwind · GSAP
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
