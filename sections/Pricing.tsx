import { packages } from '@/data/site';
import { PricingCard } from '@/components/PricingCard';
import { Reveal } from '@/components/Motion';

export function Pricing() {
  return (
    <section className="section-pad pricing-section" id="pricing">
      <div className="shell">
        <div className="section-head compact-head"><Reveal><div className="eyebrow">Pricing</div><h2>Simple packages. Clear scope. No vague agency pricing.</h2></Reveal><Reveal delay={0.1}><p>Fixed offers make the first call easier: one price range, one outcome, one clear next step.</p></Reveal></div>
        <div className="pricing-grid pricing-grid-v12">{packages.map((pack) => <Reveal key={pack.name}><PricingCard pack={pack} /></Reveal>)}</div>
      </div>
    </section>
  );
}
