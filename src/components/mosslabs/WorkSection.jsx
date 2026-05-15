import { motion } from 'framer-motion';
import SectionHeader from '@/components/mosslabs/SectionHeader';

const projects = [
  {
    title: 'GreenGrove Organics',
    category: 'Ecommerce',
    description: 'Full Shopify store with custom design and SEO strategy. 3x revenue in 6 months.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format&fit=crop',
    tags: ['Ecommerce', 'SEO', 'Shopify'],
    metric: '+312% Revenue',
  },
  {
    title: 'Nexus Legal',
    category: 'Website',
    description: 'Authority-building firm website with lead capture and Google My Business.',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format&fit=crop',
    tags: ['Web Design', 'Hosting', 'GMB'],
    metric: '4x More Leads',
  },
  {
    title: 'AutoPilot Studio',
    category: 'AI Implementation',
    description: 'Custom AI assistant and workflow automation cutting admin time by 70%.',
    img: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80&auto=format&fit=crop',
    tags: ['AI', 'Automation', 'Custom Build'],
    metric: '70% Less Admin',
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Recent Work"
          title="Results, Not Promises"
          subtitle="A glimpse at what grows when strategy meets execution."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              className="glass-card glass-card-hover gradient-border rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(3,15,10,0.95))' }} />

                {/* Metric badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-moss-neon text-moss-void text-xs font-bold font-mono px-3 py-1.5 rounded-full">
                    {project.metric}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="font-mono text-xs text-moss-neon uppercase tracking-wider mb-2">{project.category}</div>
                <h3 className="font-space font-bold text-moss-dew text-xl mb-2 group-hover:text-moss-neon transition-colors">
                  {project.title}
                </h3>
                <p className="text-moss-mist text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2 py-1 rounded-full"
                      style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', color: '#94A3B8' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}