import React from 'https://esm.sh/react@18.2.0';
export function PriceCard({p}){return <div className={'price '+(p.featured?'featured':'')}><h3>{p.title}</h3><div className="amount">{p.price}</div><p>{p.desc}</p><ul>{p.items.map(x=><li key={x}>✓ {x}</li>)}</ul></div>}
