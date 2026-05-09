const faqs = [
  ['How long does a website take?', 'A starter page can be ready in about one week if content is available. A normal local business website usually needs two to four weeks depending on pages, feedback and photos.'],
  ['Do you write the text?', 'Yes. The business gives the facts; APTO.INK turns them into clear, professional page copy that customers can understand immediately.'],
  ['Can the business update it later?', 'Yes. Small updates can be handled through a care plan, or the site can be handed over with simple edit instructions depending on the scope.'],
  ['Is the price fixed?', 'The package price is fixed when the scope is fixed. Extra pages, extra languages, new photography and advanced features are quoted separately.']
];

export function Faq() {
  return (
    <section className="section-pad" id="faq">
      <div className="shell">
        <div className="section-head faq-head"><div><div className="eyebrow">FAQ</div><h2>Answers before the first call.</h2></div><p>Clear answers about timing, content, updates and pricing — without a long discovery meeting first.</p></div>
        <div className="faq-list">{faqs.map(([q, a], index) => <div className={`faq-item ${index === 0 ? 'is-open' : ''}`} key={q}><button type="button">{q}</button><p>{a}</p></div>)}</div>
      </div>
    </section>
  );
}
