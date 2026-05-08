import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="legalPage">
      <div className="legalShell">
        <Link href="/" className="backLink"><ArrowLeft size={17} /> APTO.INK</Link>
        <span className="kicker">legal placeholder</span>
        <h1>Privacy Policy</h1>
        <p>Replace this template with a real privacy policy that matches your analytics, contact tools, fonts, and hosting setup.</p>
        <div className="legalCard">
          <h2>Data collection</h2>
          <p>This website may process technical access data such as browser type, pages visited, and timestamps. Add your real provider details here.</p>
          <h2>Contact</h2>
          <p>If visitors contact APTO.INK by email, the submitted information is used to respond to the request.</p>
          <h2>Third-party assets</h2>
          <p>If you use external fonts, images, analytics, maps, booking tools, or forms, list them here before launch.</p>
        </div>
      </div>
    </main>
  );
}
