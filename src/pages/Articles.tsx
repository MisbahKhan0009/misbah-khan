import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { getArticles, getCategories, getAllTags } from '@/lib/articles';
import {
  Search,
  ArrowLeft,
  Calendar,
  Clock,
  X,
  Tag,
  Database,
  Terminal,
  Brain,
  Workflow,
  Code2,
  BarChart3,
} from 'lucide-react';

// Map categories to icons
const categoryIcons: Record<string, typeof Database> = {
  'SQL': Database,
  'Python': Terminal,
  'AI': Brain,
  'Automation': Workflow,
  'Problem Solving': Code2,
  'Data Engineering': BarChart3,
};

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const articles = getArticles();
  const categories = getCategories();
  const allTags = getAllTags();

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => article.tags?.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [articles, searchQuery, selectedCategory, selectedTags]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTags([]);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <SEO
        title="Articles | Data Analysis & Automation Insights"
        description="Technical deep-dives into PostgreSQL, Python automation, LLMs, and data engineering patterns."
      />
      <Navigation />

      {/* Header Section */}
      <section className="relative pt-32 pb-16">
        <div className="container max-w-5xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-mono text-xs uppercase tracking-widest group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-6">
              The <span className="text-primary">Archive</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
              Technical articles on SQL patterns, Python automation, AI agents, and data engineering.
              New content generated daily.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="mb-12 border-y border-border/50 bg-card/30 backdrop-blur-sm sticky top-16 md:top-24 z-40 py-4">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-background/50 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <button
                onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all whitespace-nowrap ${selectedCategory === 'all' ? 'bg-primary/20 border-primary text-primary' : 'bg-transparent border-white/10 text-muted-foreground hover:border-primary/50'}`}
              >
                ALL
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-primary/20 border-primary text-primary' : 'bg-transparent border-white/10 text-muted-foreground hover:border-primary/50'}`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tags */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-border/30">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mr-2">Tags:</span>
              {selectedTags.map(tag => (
                <div key={tag} className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-mono text-primary">
                  #{tag}
                  <button onClick={() => toggleTag(tag)} className="hover:text-foreground">
                    <X size={10} />
                  </button>
                </div>
              ))}
              <button onClick={clearAllFilters} className="text-[10px] font-mono text-muted-foreground hover:text-primary underline underline-offset-4 ml-2">
                Clear
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Articles List */}
      <section className="container max-w-5xl mx-auto px-6">
        {paginatedArticles.length > 0 ? (
          <div className="space-y-0">
            <AnimatePresence mode="popLayout">
              {paginatedArticles.map((article, index) => {
                const Icon = categoryIcons[article.category] || Code2;
                return (
                  <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link to={`/articles/${article.slug}`}>
                      <article className="group py-8 border-b border-border/50 hover:bg-card/20 transition-colors -mx-6 px-6 rounded-xl">
                        <div className="flex items-start gap-5">
                          <div className="hidden md:flex w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 items-center justify-center text-primary flex-shrink-0 mt-1 group-hover:bg-primary group-hover:text-background transition-all">
                            <Icon size={18} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-mono uppercase tracking-widest">
                                {article.category}
                              </span>
                              <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                                <Calendar size={10} />
                                {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                              <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                                <Clock size={10} />
                                {article.readTime} min
                              </span>
                            </div>

                            <h3 className="font-display text-xl md:text-2xl tracking-tight mb-2 group-hover:text-primary transition-colors">
                              {article.title}
                            </h3>

                            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                              {article.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-1.5">
                              {article.tags?.map(tag => (
                                <button
                                  key={tag}
                                  onClick={(e) => { e.preventDefault(); toggleTag(tag); }}
                                  className="text-[9px] font-mono text-muted-foreground bg-white/5 px-2 py-0.5 rounded border border-white/5 hover:border-primary/30 hover:text-primary transition-colors"
                                >
                                  #{tag}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-border rounded-3xl">
            <p className="font-mono text-sm text-muted-foreground">
              No articles match your search.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-4 text-primary hover:underline text-sm font-mono"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16 pt-8 border-t border-border/50">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full text-xs font-mono border border-white/10 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex gap-1.5 mx-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono transition-all ${
                    currentPage === i + 1
                      ? 'bg-primary text-background'
                      : 'bg-card/30 border border-white/10 text-muted-foreground hover:border-primary/50 hover:text-primary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full text-xs font-mono border border-white/10 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Article count */}
        <div className="text-center mt-6">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            Showing {paginatedArticles.length} of {filteredArticles.length} articles
            {totalPages > 1 && ` — Page ${currentPage} of ${totalPages}`}
          </p>
        </div>
      </section>
    </main>
  );
}
