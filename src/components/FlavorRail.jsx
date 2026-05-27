const flavors = [
  { name: 'Blackberry', note: 'dark berry · lime snap', number: '01' },
  { name: 'Blood Orange', note: 'citrus oil · soft burn', number: '02' },
  { name: 'Yuzu Mint', note: 'cold green · sharp light', number: '03' },
];

export default function FlavorRail() {
  return (
    <section className="flavor-section" id="flavors">
      <div className="section-heading">
        <p className="eyebrow">flavors</p>
        <h2>Big color. Clean finish.</h2>
      </div>

      <div className="flavor-grid">
        {flavors.map((flavor) => (
          <article className="flavor-card" key={flavor.name}>
            <span className="flavor-number">{flavor.number}</span>
            <div className="orb" />
            <h3>{flavor.name}</h3>
            <p>{flavor.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
