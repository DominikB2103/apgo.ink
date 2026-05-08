import { Navigation } from '@/components/Navigation';
import { MagneticButton } from '@/components/AnimatedShell';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="legal-page">
        <h1>Page not found.</h1>
        <p>The page moved or does not exist. Go back to APTO.INK and choose one of the demo websites.</p>
        <MagneticButton href="/">Back home</MagneticButton>
      </main>
    </>
  );
}
