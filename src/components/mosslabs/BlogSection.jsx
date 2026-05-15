import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';

const categoryColors = {
  'AI & Automation': 'text-emerald-400',
  'Web Development': 'text-green-400',
  'SEO': 'text-teal-400',
  'Ecommerce': 'text-cyan-400',
  'Design': 'text-lime-400',
  'Business': 'text-green-300',
};

function BlogCard({ post, index, onClick }) {
  const fallbackImg = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={() => onClick(post)}
      className="glass-card glass-card-hover gradient-border rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.cover_image || fallbackImg}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(3,15,10,0.9) 0%, rgba(3,15,10,0.2) 60%, transparent 100%)'
        }} />
        {post.category && (
          <div className="absolute bottom-3 left-4">
            <span className={`font-mono text-xs ${categoryColors[post.category] || 'text-moss-neon'} uppercase tracking-wider`}>
              {post.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-space font-bold text-moss-dew text-lg leading-snug mb-3 group-hover:text-moss-neon transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-moss-mist text-sm leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-moss-mist text-xs font-mono">
            <Clock size={11} />
            {post.read_time || 4} min read
          </div>
          <div className="flex items-center gap-1 text-moss-neon text-xs font-medium group-hover:gap-2 transition-all duration-300">
            Read more <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogSection({ onPostClick }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sorted = blogPosts
      .filter((p) => p.published)
      .sort(
        (a, b) =>
          Date.parse(b.created_date ?? '') - Date.parse(a.created_date ?? '')
      )
      .slice(0, 6);
    setPosts(sorted);
    setLoading(false);
  }, []);

  return (
    <section id="blog" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-moss-neon" />
              <span className="font-mono text-xs text-moss-neon tracking-widest uppercase">Knowledge Mycelium</span>
            </div>
            <h2 className="font-space text-[clamp(2rem,5vw,4rem)] font-bold text-moss-dew leading-tight">
              Fresh from the Lab
            </h2>
          </div>
          <a href="#contact" className="btn-ghost-moss text-sm self-start md:self-auto">
            Work with us
          </a>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 glass-card rounded-2xl"
          >
            <div className="text-4xl mb-4">🌿</div>
            <p className="text-moss-mist font-space">Articles are growing... Check back soon.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} onClick={onPostClick} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}