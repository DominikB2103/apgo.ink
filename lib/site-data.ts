import { ArrowRight, BadgeCheck, Building2, CalendarDays, CarFront, Clock3, Coffee, Cross, Gauge, Globe2, Landmark, Layers3, MapPin, MessageCircle, ShieldCheck, Sparkles, Store, WandSparkles, Workflow, Zap } from 'lucide-react';

export const brand = {
  name: 'APTO.INK',
  email: 'hello@apto.ink',
  phone: '+41 00 000 00 00',
  domain: 'apto.ink'
};

export const demoCards = [
  {
    slug: 'bakery',
    href: '/demos/bakery/',
    title: 'Bakery / Café',
    eyebrow: 'Warm, premium, local',
    description: 'A high-conversion food business site with menu cards, opening hours, reviews and catering CTA.',
    metric: '+34% more calls',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=82',
    tags: ['Menu', 'Local SEO', 'Reservations']
  },
  {
    slug: 'garage',
    href: '/demos/garage/',
    title: 'Garage / Mechanic',
    eyebrow: 'Trust-first service',
    description: 'A clean automotive site with service booking, tire season offers, proof points and emergency CTA.',
    metric: '24h booking flow',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=82',
    tags: ['Booking', 'Services', 'Trust']
  },
  {
    slug: 'municipality',
    href: '/demos/municipality/',
    title: 'Municipality',
    eyebrow: 'Civic clarity',
    description: 'A modern public-sector information hub with alerts, departments, forms and community updates.',
    metric: 'A11y-first UX',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82',
    tags: ['Accessibility', 'Forms', 'News']
  },
  {
    slug: 'clinic',
    href: '/demos/clinic/',
    title: 'Clinic / Practice',
    eyebrow: 'Calm and credible',
    description: 'A refined healthcare site with appointment CTA, doctor profiles, insurance info and service pages.',
    metric: 'Patient-ready',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=82',
    tags: ['Appointments', 'Profiles', 'FAQ']
  }
];

export const pricing = [
  {
    name: 'Starter',
    price: 'CHF 890',
    period: 'one-time',
    tagline: 'For businesses that need to stop looking invisible.',
    features: ['One-page premium website', 'Mobile-first design', 'Copy cleanup', 'Contact buttons', 'GitHub Pages deployment guide'],
    bestFor: 'New local businesses',
    cta: 'Start lean'
  },
  {
    name: 'Local Signature',
    price: 'CHF 1’850',
    period: 'one-time',
    tagline: 'The serious package for most Swiss SMEs.',
    features: ['4–6 custom sections/pages', 'Offer/pricing/service layout', 'Swiss-style trust blocks', 'Basic SEO structure', 'Analytics-ready setup', 'One revision sprint'],
    bestFor: 'Restaurants, garages, salons, trades',
    cta: 'Most popular',
    featured: true
  },
  {
    name: 'Premium System',
    price: 'CHF 3’900+',
    period: 'project',
    tagline: 'A website that looks like a real brand, not a template.',
    features: ['Advanced visual direction', 'Multilingual-ready architecture', 'Multiple page templates', 'Motion design', 'Launch checklist', 'Conversion review'],
    bestFor: 'Established businesses',
    cta: 'Build premium'
  }
];

export const retainers = [
  { name: 'Care Lite', price: 'CHF 95/mo', detail: 'Small edits, uptime checks, analytics glance.' },
  { name: 'Care Growth', price: 'CHF 190/mo', detail: 'Monthly improvements, SEO tweaks, performance review.' },
  { name: 'Care Partner', price: 'CHF 290/mo', detail: 'Priority support, content sections, seasonal campaigns.' }
];

export const process = [
  { icon: MessageCircle, title: '1. Business call', text: 'We learn the offer, customers, area and what currently blocks calls or bookings.' },
  { icon: WandSparkles, title: '2. Direction board', text: 'We create the visual angle: premium, practical, local, trustworthy, fast.' },
  { icon: Layers3, title: '3. Static build', text: 'Next.js export, no server bill, fast load times and clean pages for GitHub Pages.' },
  { icon: BadgeCheck, title: '4. Launch handover', text: 'You get the live site, update notes, SEO basics and care-plan options.' }
];

export const proof = [
  { icon: Gauge, label: 'Static-speed architecture', value: 'Next export' },
  { icon: ShieldCheck, label: 'No monthly server needed', value: 'GitHub Pages' },
  { icon: Globe2, label: 'Built for Swiss SMEs', value: 'DE/FR/IT-ready' },
  { icon: Sparkles, label: 'Premium visual system', value: 'Not a template' }
];

export const faqs = [
  ['Can this run on GitHub Pages?', 'Yes. The project is configured as a Next.js static export, so the final deployment is static HTML, CSS and JavaScript.'],
  ['Can clients edit it themselves?', 'For the cheapest packages, updates are handled as a care plan. For bigger clients, a CMS can be added later, but GitHub Pages alone is static.'],
  ['Can we make it multilingual?', 'Yes. The structure is ready for language versions. For Swiss SMEs, German plus English or French is a strong upsell.'],
  ['Do you use copyrighted images?', 'The build references free commercial-use stock-photo providers and includes an asset license note. You can replace any image before selling to a real client.'],
  ['Can every demo become a real client site?', 'Yes. Each demo is intentionally built like a real niche template, but with custom copy, images and branding per client.']
];

export const iconSet = { ArrowRight, Building2, CalendarDays, CarFront, Clock3, Coffee, Cross, Landmark, MapPin, Store, Workflow, Zap };
