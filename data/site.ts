export const examples = [
  {
    slug: 'bakery',
    title: 'Golden Crust Atelier',
    category: 'Bakery / café',
    price: 'CHF 1’850+',
    href: '/demos/bakery/',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85',
    promise: 'Warm artisan storefront with product desire, weekly specials and preorder intent.',
    tags: ['Food', 'Retail', 'Local love']
  },
  {
    slug: 'garage',
    title: 'Nordwerk Garage',
    category: 'Automotive service',
    price: 'CHF 2’400+',
    href: '/demos/garage/',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1400&q=85',
    promise: 'Precision auto service website with diagnostics, proof and appointment flow.',
    tags: ['Repair', 'Diagnostics', 'Booking']
  },
  {
    slug: 'municipality',
    title: 'Gemeinde Valnera',
    category: 'Municipality',
    price: 'CHF 4’900+',
    href: '/demos/municipality/',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85',
    promise: 'Clear civic portal for services, public notices and resident information.',
    tags: ['Civic', 'Services', 'Notices']
  },
  {
    slug: 'clinic',
    title: 'Praxis Lindenhof',
    category: 'Clinic / health',
    price: 'CHF 2’900+',
    href: '/demos/clinic/',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=85',
    promise: 'Calm healthcare website with doctor credibility and appointment request.',
    tags: ['Health', 'Trust', 'Appointments']
  }
] as const;

export const packages = [
  {
    name: 'Starter Presence',
    badge: 'Starter',
    price: 'CHF 890',
    description: 'One-page professional web presence for businesses that need credibility fast.',
    features: ['One premium page', 'Desktop and phone layouts', 'Contact and location section', 'Copy polish', 'Launch handoff']
  },
  {
    name: 'Local Business',
    badge: 'Best seller',
    price: 'CHF 1’850',
    featured: true,
    description: 'Complete 4–6 page website for a real local SME with services, trust, and conversion.',
    features: ['4–6 custom pages', 'Industry-specific design', 'Services / gallery / FAQ', 'Local search structure', 'One revision round']
  },
  {
    name: 'Signature Build',
    badge: 'Premium',
    price: 'CHF 3’900+',
    description: 'Brand-defining build for companies that want to look like the best choice in the region.',
    features: ['Advanced visual identity', 'Rich motion system', 'Multilingual structure', 'Custom sections', 'Priority delivery']
  }
] as const;

export const processSteps = [
  ['Audit', 'Check online presence, competitors, mobile experience, photos and obvious conversion gaps.'],
  ['Offer', 'Set a fixed scope, package, timeline, deposit and simple approval path.'],
  ['Build', 'Design with real copy, trust sections, local positioning and one clear next step.'],
  ['Launch', 'Apply one focused feedback round, publish and offer ongoing care without pressure.']
] as const;
