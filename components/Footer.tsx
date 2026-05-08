import { brand } from '@/lib/site-data';

export function Footer() {
  return (
    <footer className="footer-shell">
      <div>
        <a className="brand-lockup" href="/">
          <span className="brand-mark">A</span>
          <span>{brand.name}</span>
        </a>
        <p>Premium static websites for Swiss small and medium-sized businesses. Built for speed, trust and conversion.</p>
      </div>
      <div className="footer-links">
        <a href="/demos/bakery/">Bakery demo</a>
        <a href="/demos/garage/">Garage demo</a>
        <a href="/demos/municipality/">Municipality demo</a>
        <a href="/demos/clinic/">Clinic demo</a>
      </div>
      <div className="footer-links">
        <a href="mailto:hello@apto.ink">hello@apto.ink</a>
        <a href="/legal/impressum/">Impressum</a>
        <a href="/legal/privacy/">Privacy</a>
      </div>
    </footer>
  );
}
