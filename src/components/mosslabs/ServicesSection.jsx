import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Server, ShoppingCart, Search, Bot, Code2, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/mosslabs/SectionHeader';

const services = [
  {
    icon: Globe,
    title: 'Website Design',
    tag: '01',
    short: 'Bespoke digital experiences that command attention and convert visitors.',
    deliverables: ['Custom UI/UX Design', 'Responsive Development', 'CMS Integration', 'Performance Optimization', 'Analytics Setup'],
    color: '#22C55E',
  },
  {
    icon: Server,
    title: 'Hosting',
    tag: '02',
    short: 'Rock-solid infrastructure so your site is always fast, secure, and online.',
    deliverables: ['Managed Cloud Hosting', 'Domain Registration', 'SSL Certificates', 'Daily Backups', '99.9% Uptime SLA'],
    color: '#34D399',
  },
  {
    icon: ShoppingCart,
    title: 'Ecommerce',
    tag: '03',
    short: 'Full-stack stores that turn browsers into buyers — built to scale.',
    deliverables: ['Shopify / WooCommerce', 'Payment Integration', 'Product Management', 'Inventory Sync', 'Conversion Optimization'],
    color: '#6EE7B7',
  },
  {
    icon: Search,
    title: 'SEO',
    tag: '04',
    short: 'Data-driven search strategies that grow organic traffic sustainably.',
    deliverables: ['Technical SEO Audit', 'Keyword Research', 'On-Page Optimization', 'Google My Business', 'Monthly Reporting'],
    color: '#22C55E',
  },
  {
    icon: Bot,
    title: 'AI Implementation',
    tag: '05',
    short: 'Embed intelligence into your workflows — automate, personalize, accelerate.',
    deliverables: ['AI Chatbots', 'Process Automation', 'LLM Integration', 'Custom AI Tools', 'Data Pipeline Setup'],
    color: '#A7F3D0',
  },
  {
    icon: Code2,
    title: 'Custom Builds',
    tag: '06',
    short: 'Complex digital systems engineered precisely for your unique requirements.',
    deliverables: ['Web Applications', 'API Development', 'System Integration', 'Database Architecture', 'Ongoing Support'],
    color: '#34D399',
  },
];

function ServiceSlab({ service, isActive, onClick, index }) {
  const Icon = service.icon;

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`glass-card gradient-border cursor-pointer overflow-hidden transition-all duration-500 ${
        isActive ? 'col-span-2' : 'col-span-1'
      }`}
      style={{
        borderColor: isActive ? `rgba(34,197,94,0.35)` : undefined,
        boxShadow: isActive ? `0 0 40px rgba(34,197,94,0.1)` : undefined,
      }}
      whileHover={{ y: -4 }}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center`}
            style={{ background: `rgba(34,197,94,0.1)`, border: `1px solid rgba(34,197,94,0.2)` }}>
            <Icon size={22} style={{ color: service.color }} />
          </div>
          <span className="font-mono text-xs text-moss-mist">{service.tag}</span>
        </div>

        <h3 className="font-space font-bold text-moss-dew text-xl mb-2">{service.title}</h3>
        <p className="text-moss-mist text-sm leading-relaxed">{service.short}</p>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="mt-6"
            >
              <div className="text-xs font-mono text-moss-neon uppercase tracking-widest mb-3">Deliverables</div>
              <ul className="space-y-2">
                {service.deliverables.map((d, i) => (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-2 text-sm text-moss-dew"
                  >
                    <div className="w-1 h-1 rounded-full bg-moss-neon flex-shrink-0" />
                    {d}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={(e) => {
                  e.stopPropagation();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 flex items-center gap-2 text-moss-neon text-sm font-space font-medium hover:gap-3 transition-all"
              >
                Get a Quote <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="services" className="section-padding relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Our Services"
          title="The Full Ecosystem"
          subtitle="Every service designed to compound. Click any card to explore deliverables."
        />

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <ServiceSlab
                service={service}
                isActive={activeIndex === i}
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}