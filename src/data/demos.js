const img = (id, q='80') => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=${q}`;

export const demos = {
  bakery: {
    slug:'bakery', theme:'bakery', accent:'#d99a5b', type:'Artisan bakery', name:'Maison Levain', href:'/demos/bakery/',
    image:img('photo-1509440159596-0249088772ff'), image2:img('photo-1555507036-ab1f4038808a'), image3:img('photo-1517433670267-08bbd4be890f'),
    title:'Warm editorial craft for a bakery people remember before they visit.',
    lead:'A sensory, product-led bakery website: soft photography, elegant serif typography, seasonal menus, breakfast boxes, pre-orders, and opening hours that never hide.',
    cta:'Reserve a breakfast box', secondary:'View seasonal menu', stat:'05:30', statLabel:'first batch from the oven',
    tags:['Editorial warmth','Menu-first','Pre-orders','Local ritual'],
    services:['Sourdough loaves','Morning pastries','Breakfast boxes','Catering trays','Coffee corner','Holiday pre-orders'],
    menu:[['Country sourdough','Dark crust, long fermentation, baked daily','CHF 8'],['Apricot brioche','Seasonal fruit, butter-rich dough','CHF 6'],['Office breakfast box','Pastries, bread, jam, coffee cards','CHF 42'],['Weekend focaccia','Rosemary, sea salt, olive oil','CHF 12']],
    sections:[['The daily ritual','The homepage opens like a morning window: image, smell, craft, and one clear next action.'],['Product rhythm','Instead of generic blocks, the bakery gets menu cards, limited-batch moments, and reservation prompts.'],['Local trust','Opening hours, map cues, story, and regular order paths are visible without turning the site into a spreadsheet.']],
    review:'It feels like the shop before you arrive: warm, precise, and impossible not to visit.'
  },
  garage: {
    slug:'garage', theme:'garage', accent:'#f2583e', type:'Mechanic garage', name:'Nordwerk Garage', href:'/demos/garage/',
    image:img('photo-1487754180451-c456f719a1fc'), image2:img('photo-1613214149922-f1809c99b414'), image3:img('photo-1553440569-bcc63803a83d'),
    title:'A technical booking machine for a garage that wants more serious customers.',
    lead:'Sharp dark interface, service lanes, diagnostic trust signals, fleet support, emergency repair CTAs, and the feeling of a workshop that actually has its process under control.',
    cta:'Book service slot', secondary:'See diagnostics', stat:'24h', statLabel:'diagnostic response target',
    tags:['Dark precision','Booking CTA','Diagnostics','Fleet trust'],
    services:['Diagnostics','Tyres & wheels','Service checks','Fleet maintenance','Pre-MFK preparation','Emergency repair'],
    lanes:[['01','Diagnose','Fault codes, test drive, visual inspection'],['02','Quote','Clear scope before work begins'],['03','Repair','Parts, labour, documentation'],['04','Return','Road-ready handover and follow-up']],
    sections:[['No confusion','Drivers see services, booking, phone, and trust signals without hunting.'],['Technical confidence','The visual language feels precise, strong, and modern — not like a garage catching up with the internet.'],['More calls','The page is structured around the next action: book, call, or request a quote.']],
    review:'This does not look like a garage catching up with the internet. It looks like a garage leading it.'
  },
  municipality: {
    slug:'municipality', theme:'municipality', accent:'#5da4a0', type:'Municipality', name:'Gemeinde Arven', href:'/demos/municipality/',
    image:img('photo-1449824913935-59a10b8d2000'), image2:img('photo-1486406146926-c627a92ad1ab'), image3:img('photo-1500530855697-b586d89ba3ee'),
    title:'A calm civic portal where residents find what they need without decoding bureaucracy.',
    lead:'Service-first navigation, official notices, waste calendar, permits, council updates, community events, emergency information, and a visual identity that feels public, clear, and human.',
    cta:'Find a service', secondary:'Read notices', stat:'12', statLabel:'top services on the front page',
    tags:['Civic clarity','Accessible','Service portal','Notices'],
    services:['Resident services','Permits','Waste calendar','Council notices','Events','Emergency information'],
    notices:[['Waste collection','Paper and cardboard moves to Thursday this week.'],['Public meeting','Council session, 19:30, community hall.'],['Road works','Bahnhofstrasse access limited from Monday.']],
    sections:[['Resident-first','Common tasks are lifted above bureaucracy.'],['Calm information design','Important notices and services are visible without visual chaos.'],['Accessible identity','A civic site should feel official, but still human.']],
    review:'It feels organized, modern, and respectful of residents’ time.'
  },
  clinic: {
    slug:'clinic', theme:'clinic', accent:'#78b9ff', type:'Health clinic', name:'Praxis Vela', href:'/demos/clinic/',
    image:img('photo-1579684385127-1ef15d508118'), image2:img('photo-1505751172876-fa1923c5c528'), image3:img('photo-1581056771107-24ca5f033842'),
    title:'A clinic website that lowers anxiety before the first appointment.',
    lead:'Soft clinical imagery, doctor profiles, appointment windows, treatment clarity, insurance cues, urgent-care guidance, and a calm interface patients can understand quickly.',
    cta:'Request appointment', secondary:'Meet the team', stat:'08:00', statLabel:'same-day request window',
    tags:['Calm healthcare','Appointments','Profiles','Mobile-first'],
    services:['General medicine','Physiotherapy','Checkups','Diagnostics','Follow-up care','Preventive health'],
    team:[['Dr. Elena Voss','General medicine'],['M. Keller','Physiotherapy'],['A. Meier','Diagnostics']],
    sections:[['Less anxiety','The design is calm, clean, and clear enough for patients in a hurry.'],['Appointments first','Every major section leads toward booking or contacting the practice.'],['Trust through clarity','Services, team, location, and opening hours are structured for confidence.']],
    review:'The site feels modern without feeling cold — exactly what a clinic needs.'
  }
};
export const demoList = Object.values(demos);
