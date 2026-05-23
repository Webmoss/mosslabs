import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[2px] overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="h-full w-full max-w-full origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #22C55E, #6EE7B7, #22C55E)',
          boxShadow: '0 0 8px rgba(34,197,94,0.6)',
        }}
      />
    </div>
  );
}
