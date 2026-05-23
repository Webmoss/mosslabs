import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  useEffect(() => {
    const robotsMeta = document.querySelector('meta[name="robots"]');
    const previousRobots = robotsMeta?.getAttribute('content') ?? 'index,follow';
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    }
    const previousTitle = document.title;
    document.title = 'Page not found | Moss Labs';
    return () => {
      if (robotsMeta) {
        robotsMeta.setAttribute('content', previousRobots);
      }
      document.title = previousTitle;
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: '#030F0A' }}
    >
      {/* Animated background */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)' }} />

      {/* Floating glass panels */}
      {[
        { top: '15%', left: '10%', w: 120, h: 80 },
        { top: '20%', right: '10%', w: 160, h: 100 },
        { bottom: '20%', left: '8%', w: 140, h: 90 },
        { bottom: '25%', right: '8%', w: 100, h: 70 },
      ].map((style, i) => (
        <motion.div
          key={i}
          className="absolute glass-card rounded-2xl hidden md:block"
          style={{ ...style, width: style.w, height: style.h }}
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 glass-card rounded-3xl p-10 md:p-16 text-center max-w-md w-full"
        style={{
          border: '1px solid rgba(34,197,94,0.3)',
          boxShadow: '0 0 60px rgba(34,197,94,0.08)',
        }}
      >
        <motion.div
          className="font-space font-black text-[8rem] leading-none neon-text mb-4"
          animate={{ textShadow: [
            '0 0 20px rgba(34,197,94,0.4)',
            '0 0 60px rgba(34,197,94,0.7)',
            '0 0 20px rgba(34,197,94,0.4)',
          ]}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.div>
        <h1 className="font-space font-bold text-moss-dew text-2xl mb-3">Page Not Found</h1>
        <p className="text-moss-mist text-sm mb-8">
          This path doesn't exist in our ecosystem. Let's get you back to solid ground.
        </p>
        <Link to="/">
          <motion.button
            className="btn-moss px-8 py-3 flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Home size={16} />
            Go Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}