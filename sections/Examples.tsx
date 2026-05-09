import Link from 'next/link';
import { examples } from '@/data/site';
import { ExampleCard } from '@/components/ExampleCard';
import { Reveal } from '@/components/Motion';

export function Examples() {
  return (
    <section className="section-pad examples-section" id="examples">
      <div className="shell">
        <div className="section-head compact-head"><Reveal><div className="eyebrow">Example websites</div><h2>Choose a direction your client can actually feel.</h2></Reveal><Reveal delay={0.1}><p>Each example is built around a different buying mood: warm, precise, calm, or official. No generic template feeling.</p></Reveal></div>
        <div className="example-grid">{examples.map((example) => <Reveal key={example.slug}><ExampleCard example={example} /></Reveal>)}</div>
        <p className="directory-link"><Link className="link-line" href="/demos/">View all examples as a directory</Link></p>
      </div>
    </section>
  );
}
