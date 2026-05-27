export default function SplitFeature() {
  return (
    <section className="split-feature" id="ritual">
      <div className="feature-panel image-panel">
        <div className="sun" />
        <div className="glass">
          <span className="ice ice-one" />
          <span className="ice ice-two" />
          <span className="straw" />
        </div>
        <p className="vertical-type">NECTAR</p>
      </div>

      <div className="feature-panel copy-panel">
        <p className="eyebrow">ritual</p>
        <h2>Pull it cold. Pour it over ice. Let the color do the talking.</h2>
        <p>
          A homepage with one job: look good immediately. Sharp type, big object, smooth motion,
          no boring stock-photo energy.
        </p>
        <div className="ticker" aria-hidden="true">
          <span>BLACKBERRY</span>
          <span>YUZU</span>
          <span>BLOOD ORANGE</span>
          <span>MINT</span>
        </div>
      </div>
    </section>
  );
}
