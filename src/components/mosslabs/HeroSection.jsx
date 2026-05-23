import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80&auto=format&fit=crop';

const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 4,
  delay: Math.random() * 4,
}));

export default function HeroSection() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const onMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex min-h-screen w-full min-w-0 max-w-full items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 70% at ${mousePos.x}% ${mousePos.y}%, rgba(34,197,94,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 60% 60% at 80% 20%, rgba(34,197,94,0.04) 0%, transparent 50%),
          radial-gradient(ellipse 50% 50% at 20% 80%, rgba(34,197,94,0.03) 0%, transparent 50%),
          #030F0A
        `,
        transition: 'background 0.3s ease',
      }}
    >
      {/* Floating Particles */}
      {floatingParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-moss-neon pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.3,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Background Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Hero image blurred ambient */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(80px) saturate(1.5)',
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-moss-neon pulse-glow" />
            <span className="font-mono text-xs text-moss-neon tracking-widest uppercase">
              Digital Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="font-space text-[clamp(3rem,8vw,7rem)] font-bold leading-[1.05] tracking-tight mb-6"
          >
            <span className="text-gradient block">Cultivating</span>
            <span className="text-moss-dew block">Digital</span>
            <span className="text-gradient block">Growth</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-moss-mist text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
          >
            We grow your digital presence from the ground up. <br/>Websites, hosting, ecommerce, SEO, Google services and AI automation engineered for sustainable growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-moss text-base px-8 py-4 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Get in touch
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-ghost-moss text-base px-8 py-4"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View Packages
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-20 grid grid-cols-3 gap-4 md:gap-0 max-w-xl mx-auto glass-card rounded-2xl px-4 py-6 md:px-8"
          >
            {[
              { value: '10x', label: 'Avg. Organic Growth' },
              { value: '50%+', label: 'Conversion Uplift' },
              { value: '3x', label: 'Qualified Leads' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${i > 0 ? 'md:border-l md:border-[rgba(34,197,94,0.12)] md:pl-8' : ''}`}
              >
                <div className="font-space text-2xl md:text-3xl font-bold text-moss-neon">{stat.value}</div>
                <div className="text-moss-mist text-[10px] md:text-xs mt-1 font-mono tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-moss-mist hover:text-moss-neon transition-colors flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-mono text-xs tracking-widest uppercase">Explore</span>
        <ChevronDown size={16} />
      </motion.button>
    </section>
  );
}
