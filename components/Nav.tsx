import Link from 'next/link';

export function Nav() {
  return (
    <header className="site-header">
      <nav className="nav shell" aria-label="Primary navigation">
        <Link className="brand" href="/">
          <span className="brand-mark"><img src="/assets/svg/monogram.svg" alt="" /></span>
          <span><strong>APTO.INK</strong><small>Swiss SME web studio</small></span>
        </Link>
        <div className="nav-menu"><Link href="/#examples">Examples</Link><Link href="/#pricing">Pricing</Link><Link href="/#process">Process</Link><Link href="/#faq">FAQ</Link></div>
        <Link className="btn btn-primary nav-cta" href="mailto:hello@apto.ink?subject=Website%20request">Request a website</Link>
      </nav>
    </header>
  );
}
