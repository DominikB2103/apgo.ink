import { ArticleCard } from '@/components/ArticleCard';
import { DataGlyph } from '@/components/DataGlyph';
import { Footer } from '@/components/Footer';
import { HeroFigure } from '@/components/HeroFigure';
import { SectionHeader } from '@/components/SectionHeader';
import { SiteHeader } from '@/components/SiteHeader';
import { articles, briefings, departments, issue, leadArticle, methods } from '@/data/content';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="hero section-pad">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="issue-line">
                <span>{issue.label}</span>
                <span>{issue.date}</span>
              </div>
              <p className="eyebrow">{issue.strapline}</p>
              <h1>{issue.title}</h1>
              <p className="hero-dek">{issue.dek}</p>
              <div className="hero-actions" aria-label="Primary calls to action">
                <a href="#articles">Read the issue</a>
                <a href="#methods">Review methods</a>
              </div>
            </div>
            <HeroFigure />
          </div>
        </section>

        <section className="container lead-section" id="articles">
          <div className="lead-kicker">
            <span>Lead review</span>
            <span>Peer-style editorial framing</span>
          </div>
          <ArticleCard article={leadArticle} prominent />
        </section>

        <section className="section-pad border-section">
          <div className="container departments-grid">
            <div>
              <p className="eyebrow">Scope</p>
              <h2>Built like a journal front page, written like an editorial desk.</h2>
            </div>
            <div className="department-list" aria-label="Editorial departments">
              {departments.map((department) => (
                <span key={department}>{department}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad article-section">
          <div className="container">
            <SectionHeader eyebrow="Current issue" title="Research, methods, and policy analysis">
              <p>
                Compact article cards use strict hierarchy, restrained contrast, and enough white space for credibility without feeling sparse.
              </p>
            </SectionHeader>
            <div className="article-grid">
              {articles.map((article) => (
                <ArticleCard key={article.title} article={article} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad methods-section" id="methods">
          <div className="container methods-grid">
            <div className="methods-copy">
              <p className="eyebrow">Method standard</p>
              <h2>Transparent enough for research, polished enough for publication.</h2>
              <p>
                The visual system avoids novelty for novelty's sake: no excessive motion, no decorative image sourcing, and no casual interface language.
              </p>
            </div>
            <div className="methods-list">
              {methods.map((item, index) => (
                <article key={item.heading}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.heading}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad briefing-section" id="briefings">
          <div className="container briefing-grid">
            <div className="briefing-panel">
              <div>
                <p className="eyebrow">Issue metrics</p>
                <h2>Editorial checks that read as design, not decoration.</h2>
              </div>
              <DataGlyph />
            </div>
            <div className="briefing-cards">
              {briefings.map((briefing) => (
                <article key={briefing.label}>
                  <span>{briefing.label}</span>
                  <strong>{briefing.value}</strong>
                  <p>{briefing.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container closing-statement">
          <p>
            “The site should make a reader feel that every claim has been weighed before it was placed on the page.”
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
