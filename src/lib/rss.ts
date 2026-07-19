import { getArticles } from './articles';

export async function generateRSSFeed(): Promise<string> {
  const articles = getArticles().filter(a => a.published);
  const siteUrl = 'https://misbah-khan.me';

  const items = articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/articles/${article.slug}</link>
      <guid>${siteUrl}/articles/${article.slug}</guid>
      <description><![CDATA[${article.excerpt || ''}]]></description>
      <pubDate>${new Date(article.createdAt).toUTCString()}</pubDate>
      <category>${article.category || ''}</category>
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Misbah Khan — Articles</title>
    <link>${siteUrl}</link>
    <description>Technical articles on SQL, Python, automation, and data engineering.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}
