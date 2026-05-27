const fruit = [
  { className: 'fruit fruit-a', label: 'blackberry' },
  { className: 'fruit fruit-b', label: 'citrus' },
  { className: 'fruit fruit-c', label: 'leaf' },
  { className: 'fruit fruit-d', label: 'blueberry' },
  { className: 'fruit fruit-e', label: 'mint leaf' },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">cold pressed · small batch · vivid fruit</p>
        <h1>
          Drink the
          <span> loud stuff.</span>
        </h1>
        <p className="hero-subtitle">
          Bright juice, soft fizz, real blackberry. Built like a homepage you remember.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#flavors">See flavors</a>
          <a className="button ghost" href="#ritual">How it feels</a>
        </div>
      </div>

      <div className="hero-stage" aria-label="Blackberry nectar product visual">
        <p className="poster-word">BLACKBERRY</p>
        <div className="glow glow-one" />
        <div className="glow glow-two" />
        <div className="can-shadow" />
        <div className="can">
          <div className="can-rim" />
          <div className="can-label">
            <span className="label-small">NECTAR Nº03</span>
            <strong>BLACK<br />BERRY</strong>
            <span className="label-note">sparkling fruit drink</span>
          </div>
        </div>
        {fruit.map((item) => (
          <span key={item.className} className={item.className} aria-label={item.label} />
        ))}
      </div>
    </section>
  );
}
