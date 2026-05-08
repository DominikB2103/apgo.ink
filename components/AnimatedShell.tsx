'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { ReactNode } from 'react';

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.72, delay, ease: [0.21, 1, 0.21, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticButton({ children, href, variant = 'primary' }: { children: ReactNode; href: string; variant?: 'primary' | 'secondary' | 'ghost' }) {
  return (
    <motion.a
      className={`btn btn-${variant}`}
      href={href}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 24 }}
    >
      {children}
    </motion.a>
  );
}
