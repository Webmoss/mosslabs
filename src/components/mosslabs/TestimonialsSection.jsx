import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeader from '@/components/mosslabs/SectionHeader';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(34,197,94,0.03), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Client Voices"
          title="What Our Clients Say"
          subtitle="Feedback from clients we have built for across the Globe, no project is too big or too small."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.project}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="glass-card gradient-border rounded-2xl p-6 flex flex-col h-full"
            >
              <Quote size={20} className="text-moss-neon mb-4 opacity-60" aria-hidden />
              <p className="text-moss-dew text-sm leading-relaxed mb-6 flex-1">"{t.text}"</p>
              <footer className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-space font-bold text-moss-void shrink-0"
                  style={{ background: 'linear-gradient(135deg, #22C55E, #6EE7B7)' }}
                  aria-hidden
                >
                  {t.avatar}
                </div>
                <div>
                  <cite className="font-space font-semibold text-moss-dew text-sm not-italic block">
                    {t.name}
                  </cite>
                  <span className="text-moss-mist text-xs font-mono">{t.role}</span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
