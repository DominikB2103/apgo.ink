const links = ['Flavors', 'Ritual', 'Stockists'];

export default function Nav() {
  return (
    <header className="nav-wrap" aria-label="Primary navigation">
      <a className="brand" href="#top" aria-label="Nectar home">
        <span className="brand-mark" />
        NECTAR
      </a>

      <nav className="nav-links">
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>
        ))}
      </nav>

      <a className="nav-cta" href="#stockists">Taste drop</a>
    </header>
  );
}
