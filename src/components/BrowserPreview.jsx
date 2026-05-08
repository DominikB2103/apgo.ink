import React from 'https://esm.sh/react@18.2.0';
export function BrowserPreview({className,img,title,tag}){return <div className={'browser '+className}><div className="shot" style={{backgroundImage:`url(${img})`}}><div className="shot-label"><b>{title}</b><span>{tag}</span></div></div></div>}
