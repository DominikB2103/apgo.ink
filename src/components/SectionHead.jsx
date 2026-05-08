import React from 'https://esm.sh/react@18.2.0';
export function SectionHead({kicker,title,children}){return <div className="split-title"><div><span className="eyebrow"><i className="dot"/>{kicker}</span><h2 style={{marginTop:18}}>{title}</h2></div><p className="big">{children}</p></div>}
