import { cn } from '@/lib/cn';
import type { packages } from '@/data/site';

export function PricingCard({ pack }: { pack: (typeof packages)[number] }) {
  return (
    <article className={cn('price-card surface', pack.featured && 'featured')}>
      <span className="pill">{pack.badge}</span>
      <h3>{pack.name}</h3>
      <p>{pack.description}</p>
      <div className="price">{pack.price}<span> from</span></div>
      <ul className="price-features">{pack.features.map(feature => <li key={feature}>✓ {feature}</li>)}</ul>
      <a className={cn('btn', pack.featured ? 'btn-dark' : 'btn-ghost')} href={`mailto:hello@apto.ink?subject=${encodeURIComponent(pack.name)}`}>Start this package</a>
    </article>
  );
}
