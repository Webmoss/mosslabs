import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #22C55E, #6EE7B7, #22C55E)',
        boxShadow: '0 0 8px rgba(34,197,94,0.6)',
      }}
    />
  );
}