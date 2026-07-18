/**
 * Local article data loader.
 * Articles are generated daily by scripts/generate-article.mjs
 * and stored as JSON files in src/data/articles/
 */

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: number;
  content?: string;
  createdAt: string;
  published: boolean;
}

// Import all article JSON files at build time using Vite's glob import
const articleModules = import.meta.glob('../data/articles/*.json', { eager: true }) as Record<string, { default: Article }>;

function getAllArticleData(): Article[] {
  const articles: Article[] = [];

  for (const [path, module] of Object.entries(articleModules)) {
    // Skip the index file
    if (path.includes('index.json')) continue;

    const data = (module as any).default || module;
    if (data && data.slug && data.published) {
      articles.push(data);
    }
  }

  // Sort by date, newest first
  articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return articles;
}

/** Get all published articles (metadata only, content included) */
export function getArticles(): Article[] {
  return getAllArticleData();
}

/** Get a single article by slug */
export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticleData();
  return articles.find(a => a.slug === slug) || null;
}

/** Get unique categories */
export function getCategories(): string[] {
  const articles = getAllArticleData();
  return Array.from(new Set(articles.map(a => a.category).filter(Boolean)));
}

/** Get all unique tags */
export function getAllTags(): string[] {
  const articles = getAllArticleData();
  const tags = new Set<string>();
  articles.forEach(a => a.tags?.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
}
