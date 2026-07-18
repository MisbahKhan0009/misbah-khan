import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { SEO } from '@/components/SEO';
import { getArticleBySlug } from '@/lib/articles';
import { ArrowLeft, Calendar, Clock, Database, Terminal, Brain, Workflow, Code2, BarChart3 } from 'lucide-react';

const categoryIcons: Record<string, typeof Database> = {
  'SQL': Database,
  'Python': Terminal,
  'AI': Brain,
  'Automation': Workflow,
  'Problem Solving': Code2,
  'Data Engineering': BarChart3,
};

const ArticlesDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const article = slug ? getArticleBySlug(slug) : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-8">
        <Navigation />
        <p className="font-mono text-primary">Article not found</p>
        <button
          onClick={() => navigate('/articles')}
          className="text-muted-foreground hover:text-foreground underline underline-offset-4 text-sm font-mono"
        >
          Back to articles
        </button>
      </div>
    );
  }

  const Icon = categoryIcons[article.category] || Code2;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <SEO
        title={`${article.title} | Misbah`}
        description={article.excerpt}
        type="article"
        url={`/articles/${article.slug}`}
        publishedTime={article.createdAt}
      />
      <Navigation />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[120] pointer-events-none">
        <motion.div
          className="h-full bg-primary origin-left"
          style={{ scaleX: scrollProgress / 100 }}
        />
      </div>

      <main className="pt-32 pb-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Back */}
                <button
                  onClick={() => navigate('/articles')}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-primary font-mono text-xs uppercase tracking-widest mb-12 transition-colors"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Articles
                </button>

                {/* Header */}
                <header className="mb-16">
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-6">
                    <span className="flex items-center gap-2 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary">
                      <Icon size={12} />
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-primary/50" />
                      {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-primary/50" />
                      {article.readTime} min read
                    </span>
                  </div>

                  <h1 className="font-display text-3xl md:text-5xl lg:text-6xl tracking-tighter mb-8 leading-[1.1]">
                    {article.title}
                  </h1>

                  {article.excerpt && (
                    <div className="relative pl-6 border-l-2 border-primary/30">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  )}
                </header>

                {/* Markdown Content */}
                <article className="prose prose-invert prose-lg max-w-none 
                  prose-headings:font-display prose-headings:tracking-tight prose-headings:font-semibold
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-[16px]
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-bold
                  prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                  prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-li:text-muted-foreground prose-li:marker:text-primary/50
                  prose-hr:border-border/50
                  prose-ul:space-y-1
                ">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      code({ className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const isInline = !className;

                        if (!isInline && match) {
                          return (
                            <div className="relative group/code my-8">
                              <div className="absolute -top-3 right-4 px-2 py-1 bg-card border border-border rounded text-[10px] font-mono text-primary opacity-0 group-hover/code:opacity-100 transition-opacity uppercase">
                                {match[1]}
                              </div>
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                className="!rounded-xl !bg-[#0a0a0a] !p-6 !border !border-border/50 !m-0 !text-sm shadow-xl"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            </div>
                          );
                        }

                        return (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {article.content || ""}
                  </ReactMarkdown>
                </article>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-16 pt-8 border-t border-border/50 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-mono text-primary/70 uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <footer className="mt-16 pt-12 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <span className="font-display font-bold text-lg">M</span>
                    </div>
                    <div>
                      <p className="font-display text-base">Misbah</p>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Data Analyst</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/articles')}
                    className="px-6 py-3 bg-card hover:bg-primary/10 text-foreground border border-border hover:border-primary/50 rounded-full text-sm font-mono transition-all duration-300"
                  >
                    More Articles
                  </button>
                </footer>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlesDetail;
