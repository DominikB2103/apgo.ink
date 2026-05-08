import { examples } from '@/data/site';
import { ExampleCard } from '@/components/ExampleCard';
import { Reveal } from '@/components/Motion';

export function Examples() {
  return (
    <section className="section-pad" id="examples">
      <div className="shell">
        <div className="section-head"><Reveal><div className="eyebrow">Example websites</div><h2>Show clients exactly what their business could feel like online.</h2></Reveal><Reveal delay={0.1}><p>Every example is designed as a real sellable direction: visual identity, structure, conversion flow and industry-specific trust signals.</p></Reveal></div>
        <div className="example-grid">{examples.map((example) => <Reveal key={example.slug}><ExampleCard example={example} /></Reveal>)}</div>
      </div>
    </section>
  );
}
