import { useParams } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import Navbar from '@/components/mosslabs/Navbar';
import Footer from '@/components/mosslabs/Footer';
import ScrollProgress from '@/components/mosslabs/ScrollProgress';
import Seo from '@/components/Seo';
import PageNotFound from '@/lib/PageNotFound';
import { blogPosts } from '@/data/blogPosts';
import { SITE_URL, OG_IMAGE } from '@/config/site';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug && p.published);

  if (!post) return <PageNotFound />;

  const path = `/blog/${post.slug}`;
  const cover = post.cover_image || OG_IMAGE;
  const published = post.created_date;
  const modified = post.updated_date || post.created_date;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: cover,
    datePublished: published,
    dateModified: modified,
    author: { '@type': 'Organization', name: 'Moss Labs', url: `${SITE_URL}/` },
    publisher: {
      '@type': 'Organization',
      name: 'Moss Labs',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
    keywords: (post.tags || []).join(', '),
    articleSection: post.category,
  };

  return (
    <div className="mesh-bg min-h-screen w-full min-w-0 overflow-x-clip">
      <Seo
        title={`${post.title} — Moss Labs`}
        description={post.excerpt}
        path={path}
        image={cover}
        imageAlt={post.title}
        type="article"
        publishedTime={published}
        modifiedTime={modified}
        jsonLd={jsonLd}
      />
      <ScrollProgress />
      <Navbar />

      <main className="outline-none">
        <article className="max-w-3xl mx-auto px-6 pt-32 pb-20">
          <a
            href="/#blog"
            className="inline-flex items-center gap-2 text-moss-mist hover:text-moss-neon text-sm font-mono mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> All articles
          </a>

          {post.category && (
            <div className="mb-4">
              <span className="font-mono text-xs text-moss-neon uppercase tracking-widest">
                {post.category}
              </span>
            </div>
          )}

          <h1 className="font-space font-bold text-moss-dew text-3xl md:text-5xl leading-tight mb-5">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-moss-mist text-lg leading-relaxed mb-6">{post.excerpt}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-[rgba(34,197,94,0.1)]">
            {post.read_time && (
              <span className="flex items-center gap-1.5 text-moss-mist text-xs font-mono">
                <Clock size={12} /> {post.read_time} min read
              </span>
            )}
            {published && (
              <span className="flex items-center gap-1.5 text-moss-mist text-xs font-mono">
                <Calendar size={12} /> {format(new Date(published), 'MMM d, yyyy')}
              </span>
            )}
            {post.tags && post.tags.length > 0 && (
              <span className="flex items-center gap-1.5 flex-wrap">
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
              </span>
            )}
          </div>

          {post.cover_image && (
            <div className="relative mb-10 rounded-2xl overflow-hidden glass-card">
              <img
                src={post.cover_image}
                alt={post.title}
                width="1200"
                height="630"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '1200 / 630' }}
              />
            </div>
          )}

          <div className="prose prose-invert prose-green max-w-none blog-post-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-[rgba(34,197,94,0.1)]">
            <a href="/#contact" className="btn-moss text-sm inline-flex">
              Work with us
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
