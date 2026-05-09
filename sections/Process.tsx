import { Reveal } from '@/components/Motion';

const steps = [
  ['01', 'Audit', 'Check the current site, Google listing, photos, pages, and competitors.'],
  ['02', 'Offer', 'Recommend the right package, pages, timeline, deposit, and scope.'],
  ['03', 'Build', 'Create the first version with real copy, media, proof, and one next step.'],
  ['04', 'Launch', 'Apply one focused feedback round, connect the domain, and publish.']
];

export function Process() {
  return (
    <section className="section-pad process-section" id="process">
      <div className="shell">
        <div className="section-head compact-head"><Reveal><div className="eyebrow">Process</div><h2>From first call to launch without the endless back-and-forth.</h2></Reveal><Reveal delay={0.1}><p>A focused build should feel controlled: audit the business, define the offer, design the first version, then launch with one clean revision round.</p></Reveal></div>
        <div className="process-lab"><div className="process-visual"><div className="visual-browser"><div className="preview-toolbar"><span className="preview-dots"><i></i><i></i><i></i></span><strong>Audit</strong></div><div className="visual-body"><div className="visual-shot one"></div><div className="visual-shot two"></div><div className="visual-notes"><span>Missing pages</span><span>Weak CTA</span><span>Photo gaps</span><span>Clear offer</span></div></div></div><div className="visual-floating-card"><small>Current step</small><strong>Find the obvious gap</strong></div></div><div className="process-steps">{steps.map(([n,t,p],i)=><article className={`process-step ${i===0?'is-active':''}`} key={t}><span>{n}</span><div><h3>{t}</h3><p>{p}</p></div></article>)}</div></div>
      </div>
    </section>
  );
}
