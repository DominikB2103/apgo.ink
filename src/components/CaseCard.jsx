import React from 'https://esm.sh/react@18.2.0';
export function CaseCard({d}){return <a className="case" href={`/demos/${d.slug}/`}><img src={d.hero} alt=""/><div className="case-body"><small>{d.kicker}</small><h3>{d.name}</h3><p>{d.intro}</p></div></a>}
