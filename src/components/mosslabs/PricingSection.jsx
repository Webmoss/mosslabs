import { motion } from 'framer-motion';
import { Check, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/mosslabs/SectionHeader';

const packages = [
  {
    name: 'Base Package',
    price: 'R350',
    period: '/month',
    tagline: 'Your digital foundation, fully managed.',
    badge: 'Baseline',
    icon: Zap,
    features: [
      'Domain & Web Hosting',
      'Mobile-Optimised Website',
      'Google My Business Verification',
      '1 Hour Maintenance/Month',
      'SSL Certificate',
      'SEO Starter Setup',
      'Basic Analytics Setup',      
      'Email Support',      
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Ecommerce',
    price: 'R495',
    period: '/month',
    tagline: 'A complete online store built to sell.',
    badge: 'High Growth',
    icon: TrendingUp,
    features: [
      'Everything in Base Package',
      'Full Ecommerce Store Setup',
      'Payment Gateway Integration',
      'Product & Inventory Management',
      'Mobile-Optimised Storefront',
      '2 Hours Maintenance/Month',
      'SEO Starter Setup',
      'Priority Support',
    ],
    cta: 'Launch Your Store',
    highlighted: true,
  },
];

function PricingCard({ pkg, index }) {
  const Icon = pkg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true }}
      className={`relative rounded-3xl overflow-hidden ${pkg.highlighted ? 'pulse-glow' : ''}`}
    >
      {/* Highlighted glow frame */}
      {pkg.highlighted && (
        <div className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.02))',
            border: '1px solid rgba(34,197,94,0.4)',
          }}
        />
      )}

      <div
        className={`glass-card rounded-3xl p-8 md:p-10 h-full flex flex-col relative z-10 ${
          !pkg.highlighted ? 'border border-[rgba(34,197,94,0.1)]' : 'border border-[rgba(34,197,94,0.4)]'
        }`}
      >
        {/* Badge */}
        {pkg.badge && (
          <motion.div
            className="inline-flex items-center gap-1.5 bg-moss-neon text-moss-void text-xs font-bold font-mono uppercase tracking-wider px-3 py-1.5 rounded-full mb-6 w-fit"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-moss-void" />
            {pkg.badge}
          </motion.div>
        )}
        {!pkg.badge && <div className="mb-6 h-8" />}

        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <Icon size={18} className="text-moss-neon" />
          </div>
          <span className="font-space font-bold text-moss-dew text-xl">{pkg.name}</span>
        </div>

        {/* Tagline */}
        <p className="text-moss-mist text-sm mb-6">{pkg.tagline}</p>

        {/* Price */}
        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <span className="font-space font-bold text-[clamp(3rem,5vw,4.5rem)] text-moss-neon leading-none">
              {pkg.price}
            </span>
            <span className="text-moss-mist font-mono text-sm">{pkg.period}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-6" style={{ background: 'linear-gradient(90deg, rgba(34,197,94,0.3), transparent)' }} />

        {/* Features */}
        <ul className="space-y-3 mb-10 flex-1">
          {pkg.features.map((feat) => (
            <li key={feat} className="flex items-start gap-3 text-sm text-moss-dew">
              <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}>
                <Check size={10} className="text-moss-neon" />
              </div>
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          className={`w-full py-4 rounded-full font-space font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            pkg.highlighted
              ? 'btn-moss'
              : 'btn-ghost-moss'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {pkg.cta}
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(34,197,94,0.04), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Growth Packs"
          title="Simple, Transparent Pricing"
          subtitle="No lock-ins. No surprises. Monthly packages that scale with your business."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {packages.map((pkg, i) => (
            <PricingCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Custom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-moss-mist text-sm">
            Need something custom?{' '}
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-moss-neon hover:underline transition-all"
            >
              Let's talk about a tailored solution →
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}