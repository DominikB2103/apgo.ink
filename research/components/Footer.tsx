import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer" id="archive">
      <div className="container footer-grid">
        <div>
          <p className="eyebrow">Editorial system</p>
          <h2>Designed for static publication, long reading, and institutional trust.</h2>
        </div>
        <div className="footer-copy">
          <p>
            This is original demo content and custom visual language. It uses no third-party photographs, no tracking scripts, and no server-only functionality.
          </p>
          <p>
            <Link href="#top">Return to top</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
