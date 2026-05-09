import { Reveal } from '@/components/Motion';

const steps = [
  ['Audit the current impression.', 'Look at the existing web presence, photos, services, competitors and the missing trust signals.'],
  ['Choose the strongest direction.', 'Define the pages, message, visual atmosphere and fixed scope before design starts.'],
  ['Build one polished version.', 'Design with real copy, real industry imagery, clear navigation and a direct contact path.'],
  ['Refine, publish, maintain.', 'One focused feedback round, clean launch, then optional care for updates and small improvements.']
];

export function Process() {
  return (
    <section className="section-pad process-section" id="process">
      <div className="shell">
        <div className="section-head process-head"><Reveal><div className="eyebrow">Process</div><h2>From first call to a website that feels ready to sell.</h2></Reveal><Reveal delay={0.1}><p>A focused build avoids endless drafts. The goal is simple: understand the business, shape the offer, design the pages, refine once, launch cleanly.</p></Reveal></div>
        <Reveal className="process-cinema">
          <div className="process-media" aria-label="Website build preview">
            <div className="process-window process-window-main"><div className="preview-toolbar"><span className="preview-dots"><i></i><i></i><i></i></span><strong>First draft</strong></div><div className="process-screenshot bakery-screenshot"></div></div>
            <div className="process-window process-window-float"><div className="preview-toolbar"><span className="preview-dots"><i></i><i></i><i></i></span><strong>Offer</strong></div><div className="process-offer-lines"><i></i><i></i><i></i><b>CHF 1’850</b></div></div>
          </div>
          <ol className="process-steps-clean">{steps.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </Reveal>
      </div>
    </section>
  );
}
