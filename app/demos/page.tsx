import { examples } from '@/data/site';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function DemosPage() {
  return (
    <><Nav /><main><section className="directory-hero"><div className="shell"><div className="eyebrow">Choose a direction</div><h1>Industry-specific examples that clients can actually understand.</h1><p className="lead">Each demo is built to feel like a real client website.</p></div></section><section className="section-pad-sm"><div className="shell directory-grid">{examples.map((example) => <Link key={example.slug} className="directory-card" href={example.href} style={{ ['--image' as string]: `url('${example.image}')` }}><div className="content"><span className="pill">{example.category}</span><h2>{example.title}</h2><p>{example.promise}</p><span className="link-line">Open example</span></div></Link>)}</div></section></main><Footer /></>
  );
}
