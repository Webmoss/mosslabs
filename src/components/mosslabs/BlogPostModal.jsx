import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';

export default function BlogPostModal({ post, onClose }) {
  useEffect(() => {
    if (!post) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [post, onClose]);

  if (!post) return null;

  const fallbackImg = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80&auto=format&fit=crop';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 md:p-8"
        style={{ background: 'rgba(3,15,10,0.95)', backdropFilter: 'blur(20px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-3xl glass-card gradient-border rounded-3xl overflow-hidden my-8 max-h-[min(90vh,900px)] flex flex-col"
          style={{ border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <div className="relative h-64 md:h-80">
            <img
              src={post.cover_image || fallbackImg}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(3,15,10,0.2) 0%, rgba(3,15,10,0.9) 100%)' }}
            />
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 glass-card rounded-full flex items-center justify-center text-moss-dew hover:text-moss-neon transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={16} />
            </motion.button>
            {post.category && (
              <div className="absolute bottom-4 left-6">
                <span className="font-mono text-xs text-moss-neon uppercase tracking-widest glass-card px-3 py-1.5 rounded-full">
                  {post.category}
                </span>
              </div>
            )}
          </div>

          <div className="p-8 overflow-y-auto flex-1">
            <h1 className="font-space font-bold text-moss-dew text-2xl md:text-3xl leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-[rgba(34,197,94,0.1)]">
              {post.read_time && (
                <div className="flex items-center gap-1.5 text-moss-mist text-xs font-mono">
                  <Clock size={12} />
                  {post.read_time} min read
                </div>
              )}
              {post.created_date && (
                <div className="flex items-center gap-1.5 text-moss-mist text-xs font-mono">
                  <Calendar size={12} />
                  {format(new Date(post.created_date), 'MMM d, yyyy')}
                </div>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded-full"
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
              )}
            </div>

            <div className="prose prose-invert prose-green max-w-none blog-post-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
