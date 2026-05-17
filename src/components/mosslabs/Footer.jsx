// import { motion } from 'framer-motion';
// import { Github, Twitter, Linkedin, Instagram, Code2 } from 'lucide-react';
import { Code2 } from 'lucide-react';

const serviceLinks = [
  ['Website Design', 'Hosting', 'Ecommerce'],
  ['SEO', 'AI Implementation', 'Custom Builds'],
];

const companyLinks = ['About', 'Work', 'Blog'];

const sectionMap = {
  'Website Design': '#services',
  Hosting: '#services',
  Ecommerce: '#pricing',
  SEO: '#services',
  'AI Implementation': '#services',
  'Custom Builds': '#services',
  Work: '#work',
  Blog: '#blog',
  About: '#home',
};

// const socials = [
//   { Icon: Twitter, href: '#', label: 'Twitter' },
//   { Icon: Linkedin, href: '#', label: 'LinkedIn' },
//   { Icon: Instagram, href: '#', label: 'Instagram' },
//   { Icon: Github, href: '#', label: 'GitHub' },
// ];

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative pt-24 pb-10 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #030F0A, #081A12)' }}
    >
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
        <div
          className="font-space font-black text-[20vw] leading-none select-none"
          style={{ color: 'rgba(34,197,94,0.03)', letterSpacing: '-0.05em' }}
        >
          MOSSLABS
        </div>
      </div>

      {/* Top divider */}
      <div className="w-full h-px mb-16" style={{
        background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)'
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
              >
                <Code2 size={16} className="text-moss-neon" strokeWidth={2} />
              </div>
              <span className="font-space font-bold text-moss-dew text-xl tracking-tight">
                MOSS<span className="text-moss-neon">LABS</span>
              </span>
            </div>
            <div className="space-y-3 max-w-sm mb-6">
              <p className="text-moss-dew text-sm leading-relaxed">
                Moss Labs is a digital agency cultivating powerful online presences — from managed hosting and polished websites to ecommerce, SEO, and AI implementations built to last.
              </p>
              <p className="text-moss-mist text-sm leading-relaxed">
                We grow your stack from the ground up: strategy, design, development, and ongoing care so your brand stays fast, findable, and ready to scale.
              </p>
              <p className="text-moss-mist text-xs leading-relaxed font-mono tracking-wide">
                Partnering with clients worldwide.
              </p>
            </div>
            {/* <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 glass-card rounded-lg flex items-center justify-center text-moss-mist hover:text-moss-neon transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div> */}
          </div>

          {/* Services — two columns */}
          <div className="lg:col-span-2">
            <div className="font-mono text-xs text-moss-neon uppercase tracking-widest mb-4">Services</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {serviceLinks.map((column, colIndex) => (
                <ul key={colIndex} className="space-y-2 list-none m-0 p-0">
                  {column.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        onClick={() => {
                          const target = sectionMap[link];
                          if (target) scrollTo(target);
                        }}
                        className="text-moss-mist hover:text-moss-dew text-sm transition-colors duration-300 text-left"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="font-mono text-xs text-moss-neon uppercase tracking-widest mb-4">Company</div>
            <ul className="space-y-2 list-none m-0 p-0">
              {companyLinks.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => {
                      const target = sectionMap[link];
                      if (target) scrollTo(target);
                    }}
                    className="text-moss-mist hover:text-moss-dew text-sm transition-colors duration-300"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[rgba(34,197,94,0.08)] gap-4">
          <p className="text-moss-mist font-mono text-xs">
            © 2026 MossLabs. All rights reserved.
          </p>
          {/* <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-moss-neon pulse-glow" />
            <span className="text-moss-mist font-mono text-xs">All Systems Operational</span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}