import { motion } from 'framer-motion';
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

function ServiceSlab({ service, index }) {
  const Icon = service.icon;

  return (
    <motion.div
      className="glass-card gradient-border overflow-hidden h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
    >
      <div className="p-6 md:p-8 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
          >
            <Icon size={22} style={{ color: service.color }} />
          </div>
          <span className="font-mono text-xs text-moss-mist">{service.tag}</span>
        </div>

        <h3 className="font-space font-bold text-moss-dew text-xl mb-2">{service.title}</h3>
        <p className="text-moss-mist text-sm leading-relaxed">{service.short}</p>

        <div className="mt-6 flex-1">
          <div className="text-xs font-mono text-moss-neon uppercase tracking-widest mb-3">Deliverables</div>
          <ul className="space-y-2">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-2 text-sm text-moss-dew">
                <div className="w-1 h-1 rounded-full bg-moss-neon flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-6 flex items-center gap-2 text-moss-neon text-sm font-space font-medium hover:gap-3 transition-all"
          >
            Get a Quote <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding relative overflow-x-clip">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(37.5rem,100vw)] w-[min(37.5rem,100vw)] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Our Services"
          title="Our Services"
          subtitle="Every service designed to compound — full deliverables at a glance."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <ServiceSlab key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
