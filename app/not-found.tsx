import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="notFound">
      <div className="brandPill">APTO.INK</div>
      <h1>This page stepped out for espresso.</h1>
      <p>The page is not here, but the studio is.</p>
      <Link href="/" className="button dark">Back to the studio</Link>
    </main>
  );
}
