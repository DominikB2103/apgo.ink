import type { Article } from '@/data/content';

type ArticleCardProps = {
  article: Article;
  prominent?: boolean;
};

export function ArticleCard({ article, prominent = false }: ArticleCardProps) {
  return (
    <article className={prominent ? 'article-card article-card--prominent' : 'article-card'}>
      <div className="article-meta-row">
        <span>{article.section}</span>
        <span>{article.meta}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.deck}</p>
      <div className="byline">
        <span>{article.author}</span>
        <span>{article.readTime}</span>
      </div>
    </article>
  );
}
