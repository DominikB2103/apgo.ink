import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><Link className="brand" href="/"><span className="brand-mark"><img src="/assets/svg/monogram.svg" alt="" /></span><span><strong>APTO.INK</strong><small>Swiss SME web studio</small></span></Link><p>Premium websites for local businesses that want to look credible before the customer calls.</p></div>
        <div><h4>Explore</h4><Link href="/#examples">Examples</Link><Link href="/#pricing">Pricing</Link><Link href="/#process">Process</Link></div>
        <div><h4>Demos</h4><Link href="/demos/bakery/">Bakery</Link><Link href="/demos/garage/">Garage</Link><Link href="/demos/municipality/">Municipality</Link><Link href="/demos/clinic/">Clinic</Link></div>
        <div><h4>Contact</h4><a href="mailto:hello@apto.ink">hello@apto.ink</a><Link href="/legal/impressum/">Impressum</Link><Link href="/legal/privacy/">Privacy</Link></div>
      </div>
    </footer>
  );
}
