import Link from 'next/link';
import type { examples } from '@/data/site';

export function ExampleCard({ example }: { example: (typeof examples)[number] }) {
  return (
    <Link className="example-card" href={example.href} style={{ ['--image' as string]: `url('${example.image}')` }}>
      <div className="example-card-content">
        <div className="example-meta"><span>{example.category}</span><span>{example.price}</span></div>
        <h3>{example.title}</h3>
        <p>{example.promise}</p>
        <span className="link-line">Open example</span>
      </div>
    </Link>
  );
}
