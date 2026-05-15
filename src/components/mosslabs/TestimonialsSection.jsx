import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeader from '@/components/mosslabs/SectionHeader';

const testimonials = [
  {
    name: 'Thabo Mokoena',
    role: 'Founder, GreenGrove Organics',
    text: 'MossLabs transformed our online presence completely. In 6 months, our revenue tripled. The team genuinely understands what South African businesses need.',
    avatar: 'T',
  },
  {
    name: 'Sarah van der Merwe',
    role: 'Director, Nexus Legal',
    text: 'Professional, efficient, and creative. Our new website generates 4x more inquiries than before. The AI chatbot they built has been a game-changer.',
    avatar: 'S',
  },
  {
    name: 'Marcus Pietersen',
    role: 'CEO, AutoPilot Studio',
    text: 'The AI automation they implemented cut our admin time by 70%. MossLabs thinks beyond just websites — they think about your whole business.',
    avatar: 'M',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(34,197,94,0.03), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Client Voices"
          title="What Our Clients Say"
          subtitle="Teams across South Africa trust us to ship, measure, and iterate."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card gradient-border rounded-2xl p-6"
            >
              <Quote size={20} className="text-moss-neon mb-4 opacity-60" />
              <p className="text-moss-dew text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-space font-bold text-moss-void"
                  style={{ background: 'linear-gradient(135deg, #22C55E, #6EE7B7)' }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-space font-semibold text-moss-dew text-sm">{t.name}</div>
                  <div className="text-moss-mist text-xs font-mono">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}