export const studio = {
  name: 'APTO.INK',
  email: 'hello@apto.ink',
  phone: '+41 00 000 00 00',
  cityLine: 'Websites for Swiss local businesses',
  domain: 'apto.ink'
};

export const packages = [
  {
    name: 'Presence',
    price: "CHF 890",
    anchor: 'A premium one-page site for businesses that need to look real fast.',
    features: ['One cinematic landing page', 'Mobile-first layout', 'Copy polish', 'Contact CTA + map block', 'Launch checklist'],
    note: 'Best for cafés, trades, pop-up services, consultants'
  },
  {
    name: 'Local Signature',
    price: "CHF 1’850",
    anchor: 'The serious small-business website: elegant, trustworthy, and conversion-focused.',
    features: ['3–5 crafted pages', 'Service or menu structure', 'Image direction', 'Basic local SEO', 'One revision round'],
    note: 'Best first offer for cold calls'
  },
  {
    name: 'Authority',
    price: "CHF 3’900+",
    anchor: 'For businesses that need to feel like the best option in their canton.',
    features: ['Custom visual system', 'Multilingual structure', 'Deep content sections', 'Advanced motion', 'Analytics-ready handoff'],
    note: 'For clinics, municipalities, garages, premium hospitality'
  }
];

export const proof = [
  { value: '7 days', label: 'for a focused first version' },
  { value: 'CHF 0', label: 'hosting lock-in from us' },
  { value: '4x', label: 'example industries already designed' },
  { value: 'DE/FR/IT/EN', label: 'ready for multilingual Swiss growth' }
];

export const demos = [
  {
    slug: 'bakery',
    name: 'Atelier Brot',
    sector: 'Bakery & café',
    mood: 'warm, handcrafted, appetizing',
    headline: 'A neighborhood bakery that feels worth crossing town for.',
    href: '/demos/bakery/',
    accent: '#e76635',
    accent2: '#f4c15d',
    paper: '#fff7ec',
    ink: '#2b1711',
    dark: '#180d09',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1800&q=86',
    thumb: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    tag: 'food / retail',
    cta: 'Reserve weekend bread',
    nav: ['Bread', 'Café', 'Events', 'Visit'],
    sections: [
      { title: 'Slow dough. Fast recognition.', body: 'Every image, menu block, and opening-hour detail is shaped so a passer-by instantly understands craft, price level, and mood.' },
      { title: 'Seasonal menu system', body: 'Featured breads, coffee, brunch plates, and catering trays can be swapped without redesigning the page.' },
      { title: 'Local trust cues', body: 'Supplier notes, opening hours, neighborhood delivery, and Google Maps-ready contact prompts.' }
    ],
    stats: [
      ['05:30', 'oven starts'],
      ['28h', 'sourdough rise'],
      ['12+', 'daily pastries']
    ],
    features: ['Signature sourdough page', 'Weekend reservation CTA', 'Catering inquiry section', 'Press-ready story block'],
    gallery: [
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=82',
      'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1200&q=82',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=82'
    ]
  },
  {
    slug: 'garage',
    name: 'Nordwerk Garage',
    sector: 'Mechanic & auto service',
    mood: 'precise, tough, technical',
    headline: 'A garage website that makes competence visible before the first phone call.',
    href: '/demos/garage/',
    accent: '#6ee7f9',
    accent2: '#f59e0b',
    paper: '#eaf8ff',
    ink: '#071017',
    dark: '#05090d',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1800&q=86',
    thumb: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=80',
    tag: 'trade / service',
    cta: 'Book diagnostics',
    nav: ['Service', 'Diagnostics', 'Fleet', 'Contact'],
    sections: [
      { title: 'Service menus without confusion', body: 'Diagnostics, tires, MFK preparation, fleet service, and emergency repair are separated into clear conversion paths.' },
      { title: 'Workshop credibility', body: 'Equipment, certification, years of experience, and process cards give non-technical customers confidence.' },
      { title: 'Call-first design', body: 'Large tap targets, phone-first CTAs, and opening hours keep the path short on mobile.' }
    ],
    stats: [
      ['24h', 'quote window'],
      ['4.8', 'rating module'],
      ['MFK', 'prep focus']
    ],
    features: ['Service estimator layout', 'Fleet customer section', 'Emergency repair CTA', 'Review highlight system'],
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=82',
      'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1200&q=82',
      'https://images.unsplash.com/photo-1632823471565-1ecdf5c7b8c8?auto=format&fit=crop&w=1200&q=82'
    ]
  },
  {
    slug: 'municipality',
    name: 'Gemeinde Valdora',
    sector: 'Municipality & public office',
    mood: 'calm, official, accessible',
    headline: 'A municipal website that makes services simple instead of bureaucratic.',
    href: '/demos/municipality/',
    accent: '#2f6bff',
    accent2: '#62d2a2',
    paper: '#eef4ff',
    ink: '#07122f',
    dark: '#071124',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=86',
    thumb: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    tag: 'public / civic',
    cta: 'Open citizen desk',
    nav: ['Services', 'News', 'Council', 'Forms'],
    sections: [
      { title: 'Citizen tasks first', body: 'The homepage starts with what residents actually need: forms, opening hours, appointments, taxes, schools, waste collection.' },
      { title: 'Official without feeling old', body: 'A serious typographic system, strong accessibility contrast, and calm interaction patterns.' },
      { title: 'Scalable information architecture', body: 'Departments, announcements, documents, and events can grow without turning the site into a maze.' }
    ],
    stats: [
      ['18', 'quick services'],
      ['3', 'languages ready'],
      ['AA', 'contrast target']
    ],
    features: ['Resident service grid', 'Council announcement feed', 'Document area', 'Accessible contact blocks'],
    gallery: [
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=82',
      'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=1200&q=82',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=82'
    ]
  },
  {
    slug: 'clinic',
    name: 'Praxis Am Markt',
    sector: 'Clinic & healthcare practice',
    mood: 'clean, human, reassuring',
    headline: 'A practice website that reduces anxiety and makes booking feel easy.',
    href: '/demos/clinic/',
    accent: '#21b6a8',
    accent2: '#9bd7ff',
    paper: '#effdf9',
    ink: '#08231f',
    dark: '#061310',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1800&q=86',
    thumb: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
    tag: 'health / trust',
    cta: 'Request appointment',
    nav: ['Treatments', 'Team', 'Patients', 'Contact'],
    sections: [
      { title: 'Trust starts in the first fold', body: 'The design puts human warmth, medical clarity, and practical appointment information above decorative noise.' },
      { title: 'Patient-ready content', body: 'Treatment cards, new-patient guidance, insurance notes, and emergency instructions are structured clearly.' },
      { title: 'Calm visual language', body: 'Soft depth, spacious layouts, and careful contrast make the practice feel competent and approachable.' }
    ],
    stats: [
      ['08:00', 'first appointments'],
      ['6', 'treatment areas'],
      ['48h', 'reply target']
    ],
    features: ['Appointment CTA', 'Team profile system', 'Treatment pages', 'Patient information block'],
    gallery: [
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=82',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=82',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=82'
    ]
  }
] as const;

export type Demo = (typeof demos)[number];
