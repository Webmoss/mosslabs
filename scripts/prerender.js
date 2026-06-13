// Build-time prerender: turns the SPA build into static HTML per route so
// crawlers and social scrapers get fully-rendered markup. Runs after the
// client build (dist/) and the SSR build (dist-ssr/).
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js');

async function main() {
  const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');
  const { render } = await import(pathToFileURL(ssrEntry).href);
  const { blogPosts } = await import(
    pathToFileURL(resolve(root, 'src/data/blogPosts.js')).href
  );

  const routes = [
    '/',
    ...blogPosts.filter((p) => p.published).map((p) => `/blog/${p.slug}`),
  ];

  for (const route of routes) {
    const { html, helmet } = render(route);

    const head = helmet
      ? [
          helmet.title.toString(),
          // `prioritizeSeoTags` moves description/canonical/og/twitter here.
          helmet.priority.toString(),
          helmet.meta.toString(),
          helmet.link.toString(),
          helmet.script.toString(),
        ]
          .filter(Boolean)
          .join('\n    ')
      : '';

    let page = template
      // Drop the fallback <title> so helmet's title is the only one.
      .replace(/<title>[\s\S]*?<\/title>/, '')
      .replace('</head>', `    ${head}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    // Flat files (e.g. dist/blog/<slug>.html) so Apache can serve them at the
    // clean extensionless URL with no trailing-slash redirect (see .htaccess).
    const outPath =
      route === '/'
        ? resolve(distDir, 'index.html')
        : resolve(distDir, `${route.replace(/^\//, '')}.html`);

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, page, 'utf-8');
    console.log(`prerendered ${route} -> ${outPath.replace(distDir, 'dist')}`);
  }

  writeSitemap(blogPosts);

  // The SSR bundle is only needed during prerender.
  if (existsSync(resolve(root, 'dist-ssr'))) {
    rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
  }
}

function writeSitemap(blogPosts) {
  const origin = 'https://mosslabs.co.za';
  const today = new Date().toISOString().slice(0, 10);
  const toDate = (v) => (v ? new Date(v).toISOString().slice(0, 10) : today);

  const entries = [
    { loc: `${origin}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
    ...blogPosts
      .filter((p) => p.published)
      .map((p) => ({
        loc: `${origin}/blog/${p.slug}`,
        lastmod: toDate(p.updated_date || p.created_date),
        changefreq: 'monthly',
        priority: '0.7',
      })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

  writeFileSync(resolve(distDir, 'sitemap.xml'), xml, 'utf-8');
  console.log('wrote dist/sitemap.xml');
}

main().catch((err) => {
  console.error('[prerender] failed:', err);
  process.exit(1);
});
