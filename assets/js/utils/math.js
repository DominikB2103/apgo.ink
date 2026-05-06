export const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export const lerp=(a,b,t)=>a+(b-a)*t;
export const map=(value,inMin,inMax,outMin,outMax)=>outMin+(outMax-outMin)*((value-inMin)/(inMax-inMin));
export const formatPct=(value)=>`${value>0?'+':''}${value.toFixed(1)}%`;
