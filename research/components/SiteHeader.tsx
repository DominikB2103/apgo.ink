import Link from 'next/link';

const navItems = [
  { label: 'Articles', href: '#articles' },
  { label: 'Methods', href: '#methods' },
  { label: 'Briefings', href: '#briefings' },
  { label: 'Archive', href: '#archive' },
];

export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Meridian Review home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="brand-text">Meridian Review</span>
        </Link>
        <nav className="nav" aria-label="Site sections">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
