import { getArticles } from './articles';

const CASE_STUDY_SLUGS = [
  'claims-denial-engine',
  'document-processor',
  'retool-ops-dashboard',
  'scraping-pipeline',
  'automated-reporting',
];

export function generateSitemap(siteUrl: string): string {
  const articles = getArticles().filter(a => a.published);

  const staticPages = ['', '/projects', '/articles'].map(path => `
  <url>
    <loc>${siteUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

  const articlePages = articles.map(a => `
  <url>
    <loc>${siteUrl}/articles/${a.slug}</loc>
    <lastmod>${new Date(a.createdAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');

  const projectPages = CASE_STUDY_SLUGS.map(slug => `
  <url>
    <loc>${siteUrl}/work/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages}
  ${articlePages}
  ${projectPages}
</urlset>`;
}
