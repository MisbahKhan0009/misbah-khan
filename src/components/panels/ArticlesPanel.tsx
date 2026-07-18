import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '@/lib/articles';
import { FileText, ArrowUpRight } from 'lucide-react';

export const ArticlesPanel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });

  const articles = getArticles().slice(0, 3);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-background py-20">
      <div className="container relative z-10" ref={ref}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
            initial={{ opacity: 0.2, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="flex items-center gap-2 text-primary mb-4">
                <FileText size={18} />
                <span className="font-mono text-sm tracking-widest uppercase">Articles</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Technical <span className="text-primary">deep-dives</span>
              </h2>
              <p className="text-muted-foreground mt-3 text-lg max-w-lg">
                Practical breakdowns on SQL, Python, automation, and data engineering patterns I use daily.
              </p>
            </div>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-mono text-primary hover:bg-primary hover:text-background transition-all duration-300"
            >
              See All <ArrowUpRight size={14} />
            </Link>
          </motion.div>

          <div className="space-y-1">
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <Link to={`/articles/${article.slug}`} key={article.id}>
                  <motion.article
                    className="group cursor-pointer py-6 border-b border-border last:border-0"
                    initial={{ opacity: 0.2, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + index * 0.1,
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        {article.category && (
                          <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-mono uppercase tracking-widest mb-3">
                            {article.category}
                          </span>
                        )}
                        <h3 className="font-display text-lg md:text-xl tracking-tight mb-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                        <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <span className="text-border">|</span>
                        <span>{article.readTime} min</span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                className="py-12 border border-dashed border-border rounded-lg text-center"
              >
                <p className="text-muted-foreground font-mono text-sm">
                  Articles are generated daily. Run: node scripts/generate-article.mjs
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
