import { ReactNode } from 'react';

export function DemoFrame({ children, theme = 'light' }: { children: ReactNode; theme?: 'light' | 'dark' | 'warm' | 'civic' | 'clinical' }) {
  return <main className={`demo-page demo-${theme}`}>{children}</main>;
}

export function DemoNav({ title, links, cta }: { title: string; links: string[]; cta: string }) {
  return (
    <nav className="demo-nav">
      <a className="demo-logo" href="/">{title}</a>
      <div>{links.map((link) => <a href="#" key={link}>{link}</a>)}</div>
      <a className="demo-nav-cta" href="#contact">{cta}</a>
    </nav>
  );
}
