import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import FlavorRail from './components/FlavorRail.jsx';
import SplitFeature from './components/SplitFeature.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <main className="site-shell">
      <Nav />
      <Hero />
      <FlavorRail />
      <SplitFeature />
      <Footer />
    </main>
  );
}
