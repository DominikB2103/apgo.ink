import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The requested page is not part of this static research archive.</p>
      <Link href="/">Return home</Link>
    </main>
  );
}
