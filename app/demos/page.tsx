import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PortfolioFilter } from '@/components/PortfolioFilter';

export default function DemosIndex() {
  return (
    <>
      <Navigation />
      <main className="section">
        <div className="section-head">
          <div>
            <p className="section-label">Demo index</p>
            <h1>Choose a business website example.</h1>
          </div>
          <p className="section-intro">Each demo is a full niche page that a potential client can open and understand immediately.</p>
        </div>
        <PortfolioFilter />
      </main>
      <Footer />
    </>
  );
}
