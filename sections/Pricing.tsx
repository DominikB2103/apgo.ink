import { packages } from '@/data/site';
import { PricingCard } from '@/components/PricingCard';
import { Reveal } from '@/components/Motion';

export function Pricing() {
  return (
    <section className="section-pad" id="pricing">
      <div className="shell">
        <div className="section-head"><Reveal><div className="eyebrow">Pricing</div><h2>Simple enough to say on a phone call. Serious enough to be respected.</h2></Reveal><Reveal delay={0.1}><p>Fixed packages avoid hourly confusion and make the sales conversation easier for local businesses.</p></Reveal></div>
        <div className="pricing-grid">{packages.map((pack) => <Reveal key={pack.name}><PricingCard pack={pack} /></Reveal>)}</div>
      </div>
    </section>
  );
}
