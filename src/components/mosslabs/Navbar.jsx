import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 backdrop-blur-2xl bg-[rgba(3,15,10,0.85)] border-b border-[rgba(34,197,94,0.1)]'
            : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full min-w-0 px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex min-w-0 items-center gap-2 sm:gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-8 h-8 rounded-xl flex items-center justify-center pulse-glow shrink-0"
              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <Code2 size={18} className="text-moss-neon" strokeWidth={2} />
            </motion.div>
            <span className="font-space font-bold text-moss-dew text-lg sm:text-xl tracking-tight truncate">
              MOSS<span className="text-moss-neon">LABS</span>
            </span>
          </motion.a>

          {/* Desktop Links — lg+ avoids crowding / horizontal scroll on tablets (md) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-moss-mist hover:text-moss-dew text-sm font-medium font-space transition-colors duration-300 relative group"
                whileHover={{ y: -1 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-moss-neon group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block shrink-0">
            <motion.button
              onClick={() => scrollTo('#contact')}
              className="btn-moss text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden shrink-0 text-moss-dew p-1 -mr-1"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-4 right-4 z-40 glass-card rounded-2xl p-6 flex flex-col gap-4"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                className="text-moss-dew font-space font-medium text-left py-2 border-b border-[rgba(34,197,94,0.1)] last:border-0"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollTo('#contact')}
              className="btn-moss text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}