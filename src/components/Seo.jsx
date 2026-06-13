import { Helmet } from 'react-helmet-async';
import { SITE_URL, OG_IMAGE } from '@/config/site';

/**
 * Per-route SEO head tags. Works client-side (SPA navigation) and during the
 * build-time prerender (react-helmet-async SSR extraction).
 */
export default function Seo({
  title,
  description,
  path = '/',
  image = OG_IMAGE,
  imageAlt = null,
  type = 'website',
  noindex = false,
  publishedTime = null,
  modifiedTime = null,
  jsonLd = null,
}) {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {!noindex && <link rel="canonical" href={url} />}
      <meta
        name="robots"
        content={noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'}
      />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_ZA" />
      <meta property="og:site_name" content="Moss Labs" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
