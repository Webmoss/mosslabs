import { motion } from 'framer-motion';

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignClass =
    align === 'center'
      ? 'text-center mx-auto'
      : 'text-left';

  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      className={`mb-14 md:mb-16 max-w-3xl ${alignClass} ${className}`}
    >
      {eyebrow && (
        <motion.div className="section-eyebrow mb-5" layout={false}>
          <span className="section-eyebrow-dot" aria-hidden />
          <span>{eyebrow}</span>
        </motion.div>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className={`section-lead mt-4 ${align === 'center' ? 'section-lead-center' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
