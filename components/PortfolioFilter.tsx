'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { demoCards } from '@/lib/site-data';

const filters = ['All', 'Food', 'Automotive', 'Public', 'Healthcare'];
const map: Record<string, string> = {
  bakery: 'Food',
  garage: 'Automotive',
  municipality: 'Public',
  clinic: 'Healthcare'
};

export function PortfolioFilter() {
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');

  const demos = useMemo(() => {
    return demoCards.filter((demo) => {
      const matchesFilter = active === 'All' || map[demo.slug] === active;
      const text = `${demo.title} ${demo.eyebrow} ${demo.description} ${demo.tags.join(' ')}`.toLowerCase();
      const matchesQuery = !query || text.includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [active, query]);

  return (
    <div className="portfolio-console">
      <div className="portfolio-tools">
        <div className="search-box">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search examples, e.g. bakery, garage, clinic..." />
        </div>
        <div className="filter-pills" aria-label="Demo filters">
          {filters.map((filter) => (
            <button key={filter} className={active === filter ? 'active' : ''} onClick={() => setActive(filter)}>{filter}</button>
          ))}
        </div>
      </div>
      <div className="demo-grid deep">
        {demos.map((demo) => (
          <a className="demo-card premium" href={demo.href} key={demo.slug}>
            <span className="demo-image" style={{ backgroundImage: `url(${demo.image})` }} />
            <span className="demo-shine" />
            <span className="demo-content">
              <span className="eyebrow">{demo.eyebrow}</span>
              <span className="demo-title-row"><strong>{demo.title}</strong><ArrowRight size={18} /></span>
              <span>{demo.description}</span>
              <span className="tag-row">{demo.tags.map((tag) => <em key={tag}>{tag}</em>)}</span>
            </span>
            <span className="demo-metric">{demo.metric}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
