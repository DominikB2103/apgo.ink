import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function Impressum() {
  return (
    <>
      <Navigation />
      <main className="legal-page">
        <h1>Impressum</h1>
        <p><strong>Important:</strong> Replace this placeholder before publishing commercially. Swiss business websites should clearly identify the operator.</p>
        <p>APTO.INK<br />Your Name<br />Your Street<br />Your ZIP and City<br />Switzerland</p>
        <p>Email: hello@apto.ink<br />Phone: +41 00 000 00 00</p>
        <p>Commercial register / UID / VAT number: add when applicable.</p>
      </main>
      <Footer />
    </>
  );
}
