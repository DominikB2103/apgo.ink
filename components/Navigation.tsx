import { brand } from '@/lib/site-data';

export function Navigation({ mode = 'dark' }: { mode?: 'dark' | 'light' }) {
  return (
    <header className={`site-header ${mode}`}>
      <a className="brand-lockup" href="/" aria-label="APTO.INK home">
        <span className="brand-mark">A</span>
        <span>{brand.name}</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/#work">Examples</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#process">Process</a>
        <a href="/#contact">Contact</a>
      </nav>
      <a className="header-cta" href="mailto:hello@apto.ink?subject=Website%20project">Get a quote</a>
    </header>
  );
}
