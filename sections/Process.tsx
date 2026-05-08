import { processSteps } from '@/data/site';
import { Reveal } from '@/components/Motion';

export function Process() {
  return (
    <section className="section-pad" id="process">
      <div className="shell">
        <div className="section-head"><Reveal><div className="eyebrow">Process</div><h2>A clean path from first call to launch.</h2></Reveal><Reveal delay={0.1}><p>You sell relief: a business looks professional, customers understand it, and the owner stops being embarrassed by their online presence.</p></Reveal></div>
        <div className="process">{processSteps.map(([title, text]) => <Reveal key={title}><article className="process-card surface"><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
      </div>
    </section>
  );
}
