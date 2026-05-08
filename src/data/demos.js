export const demos = {
  bakery: {
    slug:'bakery', theme:'bakery', type:'Artisan bakery', name:'Maison Levain', href:'/demos/bakery/', image:'/assets/svg/bakery-scene.svg',
    title:'A bakery website that smells warm before the door opens.',
    lead:'Editorial typography, soft product storytelling, menu cards, morning ritual imagery, and a direct path to orders and opening hours.',
    cta:'Reserve breakfast box', secondary:'View seasonal menu', stat:'05:30', statLabel:'fresh batch every morning',
    tags:['Editorial','Warm','Menu system','Local SEO'],
    services:['Sourdough loaves','Breakfast boxes','Catering trays','Seasonal pastries','Coffee corner','Holiday pre-orders'],
    sections:[
      ['The daily ritual','A hero that sells smell, craft, and routine — not just bread.'],
      ['Menu without friction','Clear product cards with enough detail to create appetite and confidence.'],
      ['Local trust','Opening hours, location, bakery story, and repeat-order CTAs are always easy to reach.']
    ],
    review:'It feels like the shop before you arrive: warm, precise, and impossible not to visit.'
  },
  garage: {
    slug:'garage', theme:'garage', type:'Mechanic garage', name:'Nordwerk Garage', href:'/demos/garage/', image:'/assets/svg/garage-scene.svg',
    title:'A garage site that feels engineered, fast, and trustworthy.',
    lead:'Dark technical interface, appointment-first structure, service clarity, transparent trust signals, and visual confidence for drivers.',
    cta:'Book a service slot', secondary:'See diagnostics', stat:'24h', statLabel:'diagnostic response target',
    tags:['Technical','Dark UI','Booking CTA','Trust proof'],
    services:['Diagnostics','Tyres & wheels','Service checks','Fleet maintenance','Pre-MFK preparation','Emergency repair'],
    sections:[
      ['No confusion','Drivers see services, booking, phone, and trust signals without hunting.'],
      ['Technical confidence','The visual language feels precise, not cheap.'],
      ['More calls','The page is structured around the next action: book, call, or request a quote.']
    ],
    review:'This does not look like a garage catching up with the internet. It looks like a garage leading it.'
  },
  municipality: {
    slug:'municipality', theme:'municipality', type:'Municipality', name:'Gemeinde Arven', href:'/demos/municipality/', image:'/assets/svg/municipality-scene.svg',
    title:'A civic website that makes public services feel calm and findable.',
    lead:'Clear service navigation, community news, meeting access, emergency notices, and a warm civic identity for residents.',
    cta:'Find a service', secondary:'Read notices', stat:'12', statLabel:'most-used services surfaced',
    tags:['Civic','Accessible','Service cards','News'],
    services:['Resident services','Permits','Waste calendar','Council notices','Events','Emergency information'],
    sections:[
      ['Resident-first','Common tasks are lifted above bureaucracy.'],
      ['Calm information design','Important notices and services are visible without visual chaos.'],
      ['Accessible identity','A civic site should feel official, but still human.']
    ],
    review:'It feels organized, modern, and respectful of residents’ time.'
  },
  clinic: {
    slug:'clinic', theme:'clinic', type:'Health clinic', name:'Praxis Vela', href:'/demos/clinic/', image:'/assets/svg/clinic-scene.svg',
    title:'A clinic website built for calm decisions and easy appointments.',
    lead:'Soft clinical visuals, doctor profiles, appointment slots, treatment clarity, and a reassuring tone for patients.',
    cta:'Request appointment', secondary:'Meet the team', stat:'08:00', statLabel:'same-day request window',
    tags:['Calm','Healthcare','Appointments','Profiles'],
    services:['General medicine','Physiotherapy','Checkups','Diagnostics','Follow-up care','Preventive health'],
    sections:[
      ['Less anxiety','The design is calm, clean, and clear enough for patients in a hurry.'],
      ['Appointments first','Every major section leads toward booking or contacting the practice.'],
      ['Trust through clarity','Services, team, location, and opening hours are structured for confidence.']
    ],
    review:'The site feels modern without feeling cold — exactly what a clinic needs.'
  }
};
export const demoList = Object.values(demos);
