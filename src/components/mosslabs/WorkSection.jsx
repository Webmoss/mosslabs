import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/mosslabs/SectionHeader';
import { projects } from '@/data/projects';

export default function WorkSection() {
  return (
    <section id="work" className="section-padding relative">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,197,94,0.05), transparent 65%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow="Recent Work"
          title="Results, Not Promises"
          subtitle="Real builds across hospitality, insurance, healthcare, ecommerce and more. Talk to us about your business or project needs."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              className="glass-card glass-card-hover gradient-border rounded-2xl overflow-hidden group block focus-ring"
              aria-label={`${project.title} — visit live site (opens in new tab)`}
            >
              <div className="relative h-52 overflow-hidden bg-moss-deep">
                <img
                  src={project.img}
                  alt={`${project.title} website preview`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 25%, rgba(3,15,10,0.92))',
                  }}
                />

                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="bg-moss-neon text-moss-void text-xs font-bold font-mono px-3 py-1.5 rounded-full">
                    {project.metric}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="font-mono text-xs text-moss-neon uppercase tracking-wider mb-2">
                  {project.category}
                </div>
                <h3 className="font-space font-bold text-moss-dew text-xl mb-2 group-hover:text-moss-neon transition-colors flex items-center gap-2">
                  {project.title}
                  <ArrowUpRight
                    size={18}
                    className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-moss-neon shrink-0"
                    aria-hidden
                  />
                </h3>
                <p className="text-moss-mist text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-1 rounded-full"
                      style={{
                        background: 'rgba(34,197,94,0.08)',
                        border: '1px solid rgba(34,197,94,0.15)',
                        color: '#94A3B8',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-moss-neon text-sm font-space font-medium">
                  Visit site
                  <ArrowUpRight size={14} aria-hidden />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
