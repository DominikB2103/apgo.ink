export function DataGlyph() {
  return (
    <div className="data-glyph" aria-hidden="true">
      {Array.from({ length: 84 }, (_, index) => {
        const intensity = index % 11 === 0 || index % 17 === 0 ? ' data-cell--dark' : index % 5 === 0 ? ' data-cell--mid' : '';
        return <span className={`data-cell${intensity}`} key={index} />;
      })}
    </div>
  );
}
