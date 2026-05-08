import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ImpressumPage() {
  return (
    <main className="legalPage">
      <div className="legalShell">
        <Link href="/" className="backLink"><ArrowLeft size={17} /> APTO.INK</Link>
        <span className="kicker">legal placeholder</span>
        <h1>Impressum</h1>
        <p>Replace this page with your real legal information before publishing.</p>
        <div className="legalCard">
          <h2>Responsible entity</h2>
          <p>APTO.INK / Your Name<br />Street and number<br />Postal code and city, Switzerland</p>
          <h2>Contact</h2>
          <p>Email: hello@apto.ink<br />Phone: +41 00 000 00 00</p>
          <h2>Disclaimer</h2>
          <p>The contents of this website are provided with care. Liability for completeness, accuracy, and currentness should be adapted to your final legal setup.</p>
        </div>
      </div>
    </main>
  );
}
