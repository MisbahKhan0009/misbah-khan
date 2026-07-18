import { supabase } from './supabase';
import { Database } from './database.types';

type Article = Database['public']['Tables']['articles']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];

export async function generateSitemap(): Promise<string> {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com';

    // Fetch all published articles
    const { data: articles } = await supabase
        .from('articles')
        .select('slug, created_at')
        .eq('published', true);

    // Fetch all projects
    const { data: projects } = await supabase
        .from('projects')
        .select('slug, created_at');

    const staticPages = [
        { url: '', priority: '1.0', changefreq: 'weekly' },
        { url: '#automations', priority: '0.8', changefreq: 'monthly' },
        { url: '#work', priority: '0.8', changefreq: 'weekly' },
        { url: '#articles', priority: '0.8', changefreq: 'weekly' },
        { url: '#about', priority: '0.7', changefreq: 'monthly' },
        { url: '#contact', priority: '0.7', changefreq: 'monthly' },
    ];

    const articleUrls = (articles || [] as Article[]).map((article) => ({
        url: `/articles/${article.slug}`,
        lastmod: new Date(article.created_at).toISOString().split('T')[0],
        priority: '0.6',
        changefreq: 'monthly',
    }));

    const projectUrls = (projects || [] as Project[]).map((project) => ({
        url: `/work/${project.slug}`,
        lastmod: new Date(project.created_at).toISOString().split('T')[0],
        priority: '0.6',
        changefreq: 'monthly',
    }));

    const allUrls = [...staticPages, ...articleUrls, ...projectUrls];

    const urlEntries = allUrls
        .map((page) => {
            const lastmod = 'lastmod' in page ? `\n    <lastmod>${page.lastmod}</lastmod>` : '';
            return `  <url>
    <loc>${siteUrl}${page.url}</loc>${lastmod}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
        })
        .join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

    return sitemap;
}
