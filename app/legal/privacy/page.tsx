import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function Privacy() {
  return (
    <>
      <Navigation />
      <main className="legal-page">
        <h1>Privacy policy</h1>
        <p><strong>Important:</strong> This is a starter placeholder, not legal advice. Replace it with a policy matching the tools you actually use.</p>
        <h2>Contact</h2>
        <p>When visitors contact APTO.INK by email or phone, the information they provide is used only to answer the request and prepare a possible offer.</p>
        <h2>Analytics</h2>
        <p>No analytics are configured in this template by default. If you add analytics, disclose the provider and data usage here.</p>
        <h2>External media</h2>
        <p>This template references external stock-image URLs. Replace them with locally hosted assets or disclose the providers before production if required.</p>
      </main>
      <Footer />
    </>
  );
}
