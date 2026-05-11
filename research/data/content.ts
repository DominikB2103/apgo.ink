export type Article = {
  section: string;
  title: string;
  deck: string;
  author: string;
  meta: string;
  readTime: string;
};

export type Briefing = {
  label: string;
  value: string;
  description: string;
};

export const issue = {
  label: 'Vol. 14 · Issue 03',
  date: 'May 2026',
  title: 'The Meridian Review',
  dek:
    'A sober editorial platform for research briefs, long-form analysis, and institutional reporting across science, medicine, climate, and method.',
  strapline: 'Independent research intelligence for serious readers.',
};

export const leadArticle: Article = {
  section: 'Systems Biology',
  title: 'Mapping narrow windows of resilience in heat-stressed protein networks',
  deck:
    'A structured review of how cellular systems absorb thermal stress, where stability fails, and why small changes in measurement design alter the apparent boundary between adaptation and collapse.',
  author: 'Editorial desk',
  meta: 'Review Article',
  readTime: '18 min read',
};

export const articles: Article[] = [
  {
    section: 'Climate Risk',
    title: 'A stricter accounting of compound flood exposure in coastal infrastructure',
    deck:
      'New modelling language is converging around interdependent hazards rather than isolated design events, changing how public agencies quantify risk.',
    author: 'Lena Voss',
    meta: 'Analysis',
    readTime: '12 min read',
  },
  {
    section: 'Methods',
    title: 'Why uncertainty intervals need editorial standards, not decorative placement',
    deck:
      'Intervals often appear as visual reassurance while the governing assumptions remain invisible. A design standard can make them auditable.',
    author: 'Marcus Dain',
    meta: 'Method Note',
    readTime: '9 min read',
  },
  {
    section: 'Medical Systems',
    title: 'The slow mechanics of trial translation in rare-disease registries',
    deck:
      'Registry evidence is becoming central to clinical decision-making, but its institutional incentives remain uneven and fragile.',
    author: 'Anika Rao',
    meta: 'Briefing',
    readTime: '11 min read',
  },
  {
    section: 'Computation',
    title: 'Benchmark discipline after the first wave of automated discovery systems',
    deck:
      'As model-assisted research expands, the limiting factor is less speed than comparability: shared protocols, traceable baselines, and durable negative results.',
    author: 'Jonas Feld',
    meta: 'Perspective',
    readTime: '15 min read',
  },
];

export const briefings: Briefing[] = [
  {
    label: 'Protocol audits',
    value: '42',
    description: 'checkpoints used in the current issue to evaluate transparency, uncertainty, and reproducibility.',
  },
  {
    label: 'Open figures',
    value: '16',
    description: 'original diagrams and tables created for static publication without third-party image dependencies.',
  },
  {
    label: 'Signal notes',
    value: '08',
    description: 'concise editorial observations intended to separate robust findings from temporary noise.',
  },
];

export const departments = [
  'Research Articles',
  'Reviews',
  'Methods & Protocols',
  'Policy Briefs',
  'Data Notes',
  'Editorial Correspondence',
];

export const methods = [
  {
    heading: 'Source hierarchy',
    body:
      'Claims are ranked by protocol visibility, data availability, independent replication, and conflict disclosure before design treatment is assigned.',
  },
  {
    heading: 'Figure language',
    body:
      'Every figure is built from editorially controlled SVG, CSS, and structured copy so the static site remains portable and legally clean.',
  },
  {
    heading: 'Reading modes',
    body:
      'Dense material is divided into lead essays, field notes, and compact data panels without hiding the methodological qualifiers.',
  },
];
