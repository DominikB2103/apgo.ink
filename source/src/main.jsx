import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const fruits = [
  { cls: 'fruit f1' }, { cls: 'fruit f2' }, { cls: 'fruit f3' },
  { cls: 'fruit f4' }, { cls: 'fruit f5' }, { cls: 'fruit f6' },
];

function Nav() { return <nav className="nav"><a className="brand" href="#top">Pulseberry</a><div className="navLinks"><a href="#flavors">Flavors</a><a href="#drop">Drop</a><a href="#ritual">Ritual</a></div><a className="navCta" href="#shop">Order now</a></nav>; }
function Can() { return <div className="canWrap"><div className="halo"></div><div className="canShadow"></div><div className="can"><div className="rim"></div><div className="labelTop">nectar nº04</div><div className="labelMain">PULSE<br/>BERRY</div><div className="labelBottom">sparkling blackberry tonic</div></div>{fruits.map((fruit, i) => <span key={i} className={fruit.cls}></span>)}</div>; }
function Hero() { return <section className="hero" id="top"><div className="grain"></div><div className="heroText"><p className="eyebrow">small batch · cold fizz · real fruit</p><h1>Drink<br/><span>the loud</span><br/>stuff.</h1><p className="sub">A blackberry sparkling tonic with big color, sharp bubbles, and the kind of homepage that actually looks alive.</p><div className="actions"><a href="#shop" className="btn primary">Grab a case</a><a href="#flavors" className="btn secondary">See flavors</a></div></div><div className="stage"><div className="poster posterOne">BLACKBERRY</div><div className="poster posterTwo">NECTAR</div><Can /></div><div className="sideNote">03 / limited summer pour</div></section>; }
function FlavorRail() { const cards = [['01','Blood orange','citrus heat'],['02','Blackberry','deep purple fizz'],['03','Green apple','cold snap']]; return <section className="rail" id="flavors">{cards.map(([num,title,desc]) => <article className="flavor" key={title}><span>{num}</span><h2>{title}</h2><p>{desc}</p></article>)}</section>; }
function Split() { return <section className="split" id="drop"><div className="imagePanel"><div className="orb big"></div><div className="orb small"></div><div className="liquidText">COLD<br/>LOUD<br/>FRUIT</div></div><div className="copyPanel" id="ritual"><p className="eyebrow dark">new drop</p><h2>Looks like a poster. Drinks like summer.</h2><p>This page is built around big type, one clean product visual, floating bits, and smooth motion. It works on GitHub Pages right out of the zip.</p><div className="stats"><div><strong>24</strong><span>cans</span></div><div><strong>0g</strong><span>fake color</span></div><div><strong>8%</strong><span>real juice</span></div></div></div></section>; }
function Footer() { return <footer className="footer" id="shop"><h2>Make the page feel like the product.</h2><a className="btn primary" href="#top">Back to top</a></footer>; }
function App() { return <><Nav/><Hero/><FlavorRail/><Split/><Footer/></>; }

createRoot(document.getElementById('root')).render(<App />);
