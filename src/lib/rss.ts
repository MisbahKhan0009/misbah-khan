import { supabase } from './supabase';
import { Database } from './database.types';

type Article = Database['public']['Tables']['articles']['Row'];

export async function generateRSSFeed(): Promise<string> {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error || !articles) {
    console.error('Error fetching articles for RSS:', error);
    return '';
  }

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com';
  const buildDate = new Date().toUTCString();

  const rssItems = (articles as Article[])
    .map((article) => {
      const pubDate = new Date(article.created_at).toUTCString();
      const link = `${siteUrl}/articles/${article.slug}`;

      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${article.excerpt || ''}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Automation Studio - Articles</title>
    <link>${siteUrl}</link>
    <description>Insights on AI automation, n8n workflows, and production-ready systems</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return rssFeed;
}
