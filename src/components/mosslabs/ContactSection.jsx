import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Clock, ArrowRight, CheckCircle, ListChecks, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/mosslabs/SectionHeader';
import { submitContactForm } from '@/api/contact';
import { CONTACT_EMAIL } from '@/config/site';

const serviceOptions = [
  'Website Design', 'Hosting', 'Ecommerce', 'SEO',
  'AI Implementation', 'Custom Build', 'Base Package', 'General Inquiry',
];

const processSteps = [
  {
    step: '01',
    title: 'We read your brief',
    description: 'Your goals, service choice, and message go straight to our team — no ticket queue.',
  },
  {
    step: '02',
    title: 'We respond personally',
    description: 'A real reply within one business day, with questions or a call invite if it helps.',
  },
  {
    step: '03',
    title: 'We map next steps',
    description: 'Clear scope, timeline, and investment — so you can decide without pressure.',
  },
];

const briefTips = [
  'What you are building and who it is for',
  'Ideal launch date or deadline',
  'Budget range (even a ballpark)',
  'Links to sites or brands you admire',
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', service_interest: '', message: '', budget: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await submitContactForm({ ...form, _honeypot: honeypot });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(34,197,94,0.05), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Let's Build Together"
          title="Start Your Project"
          subtitle="Share your project in the form — we reply within one business day."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
            aria-label="How we work with new enquiries"
          >
            <div className="glass-card gradient-border rounded-2xl overflow-hidden h-full flex flex-col">
              <div className="p-6 md:p-7 border-b border-[rgba(34,197,94,0.12)]">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-moss-neon" aria-hidden />
                  <span className="font-mono text-xs text-moss-neon uppercase tracking-widest">
                    After you submit
                  </span>
                </div>
                <p className="text-moss-dew text-sm leading-relaxed">
                  No automated ticket number — your note lands with our team and gets a thoughtful reply.
                </p>
              </div>

              <ol className="p-6 md:p-7 space-y-5 border-b border-[rgba(34,197,94,0.12)] flex-1 list-none m-0">
                {processSteps.map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="font-mono text-xs text-moss-neon shrink-0 pt-0.5">{item.step}</span>
                    <div>
                      <h3 className="font-space font-semibold text-moss-dew text-sm mb-1">{item.title}</h3>
                      <p className="text-moss-mist text-xs leading-relaxed">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="p-6 md:p-7 border-b border-[rgba(34,197,94,0.12)] bg-[rgba(34,197,94,0.03)]">
                <div className="flex items-center gap-2 mb-3">
                  <ListChecks size={16} className="text-moss-neon" aria-hidden />
                  <span className="font-mono text-xs text-moss-mist uppercase tracking-widest">
                    Help us quote faster
                  </span>
                </div>
                <ul className="space-y-2 list-none m-0 p-0">
                  {briefTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-xs text-moss-mist leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-moss-neon shrink-0" aria-hidden />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 md:p-7 space-y-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3 group rounded-xl p-3 -m-3 transition-colors hover:bg-[rgba(34,197,94,0.06)]"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
                  >
                    <Mail size={18} className="text-moss-neon" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-moss-mist uppercase tracking-widest mb-0.5">
                      Prefer email?
                    </div>
                    <span className="text-moss-dew text-sm group-hover:text-moss-neon transition-colors truncate block">
                      {CONTACT_EMAIL}
                    </span>
                  </div>
                </a>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-moss-mist">
                  <span className="inline-flex items-center gap-1.5">
                    <Globe size={12} className="text-moss-neon shrink-0" aria-hidden />
                    South Africa · remote worldwide
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} className="text-moss-neon shrink-0" aria-hidden />
                    Mon–Fri · 1 business day
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card gradient-border rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                >
                  <CheckCircle size={48} className="text-moss-neon" />
                </motion.div>
                <h3 className="font-space font-bold text-moss-dew text-2xl">Message Received!</h3>
                <p className="text-moss-mist">We will reply within one business day. Check your inbox for our confirmation.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', company: '', service_interest: '', message: '', budget: '' });
                    setHoneypot('');
                  }}
                  className="btn-ghost-moss text-sm mt-2"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative glass-card gradient-border rounded-2xl p-8 space-y-5">
                <label className="sr-only" htmlFor="contact-website">Leave blank</label>
                <input
                  id="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
                  aria-hidden
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-moss-mist uppercase tracking-wider block mb-2">Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => handleChange('name', e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-[rgba(10,32,24,0.6)] border border-[rgba(34,197,94,0.15)] rounded-xl px-4 py-3 text-moss-dew text-sm placeholder:text-moss-mist focus:outline-none focus:border-[rgba(34,197,94,0.5)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-moss-mist uppercase tracking-wider block mb-2">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-[rgba(10,32,24,0.6)] border border-[rgba(34,197,94,0.15)] rounded-xl px-4 py-3 text-moss-dew text-sm placeholder:text-moss-mist focus:outline-none focus:border-[rgba(34,197,94,0.5)] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-moss-mist uppercase tracking-wider block mb-2">Company</label>
                    <input
                      value={form.company}
                      onChange={e => handleChange('company', e.target.value)}
                      placeholder="Your company"
                      className="w-full bg-[rgba(10,32,24,0.6)] border border-[rgba(34,197,94,0.15)] rounded-xl px-4 py-3 text-moss-dew text-sm placeholder:text-moss-mist focus:outline-none focus:border-[rgba(34,197,94,0.5)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-moss-mist uppercase tracking-wider block mb-2">Service</label>
                    <select
                      value={form.service_interest}
                      onChange={e => handleChange('service_interest', e.target.value)}
                      className="w-full bg-[rgba(10,32,24,0.6)] border border-[rgba(34,197,94,0.15)] rounded-xl px-4 py-3 text-moss-dew text-sm focus:outline-none focus:border-[rgba(34,197,94,0.5)] transition-colors"
                    >
                      <option value="" style={{ background: '#030F0A' }}>Select a service</option>
                      {serviceOptions.map(s => (
                        <option key={s} value={s} style={{ background: '#030F0A' }}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-moss-mist uppercase tracking-wider block mb-2">Message *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="w-full bg-[rgba(10,32,24,0.6)] border border-[rgba(34,197,94,0.15)] rounded-xl px-4 py-3 text-moss-dew text-sm placeholder:text-moss-mist focus:outline-none focus:border-[rgba(34,197,94,0.5)] transition-colors resize-none"
                  />
                </div>

                {error && <p className="text-red-400 text-sm font-mono">{error}</p>}

                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="btn-moss w-full py-4 flex items-center justify-center gap-2 text-sm"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-moss-void border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Send Message <ArrowRight size={14} /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
