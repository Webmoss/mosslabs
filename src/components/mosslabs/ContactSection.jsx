import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/mosslabs/SectionHeader';
import { submitContactForm } from '@/api/contact';

const serviceOptions = [
  'Website Design', 'Hosting', 'Ecommerce', 'SEO',
  'AI Implementation', 'Custom Build', 'Base Package', 'General Inquiry'
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
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(34,197,94,0.05), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Let's Build Together"
          title="Start Your Project"
          subtitle="Tell us what you're building. We'll get back within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card gradient-border rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <Mail size={18} className="text-moss-neon" />
              </div>
              <div className="font-mono text-xs text-moss-mist uppercase tracking-widest mb-1">Email</div>
              <a href="mailto:hello@mosslabs.co.za" className="text-moss-dew hover:text-moss-neon transition-colors">
                hello@mosslabs.co.za
              </a>
            </div>

            <div className="glass-card gradient-border rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <MapPin size={18} className="text-moss-neon" />
              </div>
              <div className="font-mono text-xs text-moss-mist uppercase tracking-widest mb-1">Based In</div>
              <div className="text-moss-dew">South Africa</div>
            </div>

            <div className="glass-card gradient-border rounded-2xl p-6">
              <div className="font-mono text-xs text-moss-mist uppercase tracking-widest mb-3">Response Time</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-moss-neon pulse-glow" />
                <span className="text-moss-dew text-sm">Within 24 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
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
                <p className="text-moss-mist">We'll be in touch within 24 hours. Watch your inbox. 🌿</p>
                <button
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